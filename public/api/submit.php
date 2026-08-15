<?php
/**
 * Cart Corner mailer — PHP 7.4 compatible (no Composer required).
 * GET  = health check JSON
 * POST = send contact / newsletter / quote email
 *
 * On cPanel: keep this file at public_html/api/submit.php
 * Copy public/.env.example to public_html/.env and set MAIL_TO / SMTP if needed.
 */
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');

function json_exit($code, $payload)
{
    http_response_code((int) $code);
    echo json_encode($payload);
    exit;
}

register_shutdown_function(function () {
    $error = error_get_last();
    if (!$error) {
        return;
    }
    $fatal = array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR);
    if (!in_array($error['type'], $fatal, true)) {
        return;
    }
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
    }
    echo json_encode(array(
        'success' => false,
        'error' => 'Server error.',
        'message' => $error['message'],
        'line' => $error['line'],
    ));
});

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed = array(
    'https://cart-corner.com',
    'https://www.cart-corner.com',
    'http://cart-corner.com',
    'http://www.cart-corner.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
);
if ($origin && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_exit(200, array(
        'ok' => true,
        'service' => 'cart-corner-mailer',
        'php' => PHP_VERSION,
        'mail' => function_exists('mail'),
    ));
}

date_default_timezone_set('Asia/Kolkata');
cc_load_env();

$inputData = $_POST;
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode(file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $inputData = $decoded;
    }
}

function cc_load_env()
{
    $candidates = array(
        dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env',
        __DIR__ . DIRECTORY_SEPARATOR . '.env',
        dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . '.env',
    );
    foreach ($candidates as $path) {
        if (!is_file($path) || !is_readable($path)) {
            continue;
        }
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!is_array($lines)) {
            return;
        }
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
                continue;
            }
            $parts = explode('=', $line, 2);
            $key = trim($parts[0]);
            $value = trim($parts[1]);
            $value = trim($value, "\"'");
            if ($key === '') {
                continue;
            }
            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $value;
            }
            if (getenv($key) === false) {
                putenv($key . '=' . $value);
            }
        }
        return;
    }
}

function envVal($key, $default)
{
    if (!isset($default)) {
        $default = '';
    }
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return (string) $_ENV[$key];
    }
    $fromEnv = getenv($key);
    if ($fromEnv !== false && $fromEnv !== '') {
        return (string) $fromEnv;
    }
    return $default;
}

function v($key, $default)
{
    global $inputData;
    if (!isset($default)) {
        $default = '';
    }
    if (!isset($inputData[$key]) || is_array($inputData[$key])) {
        return $default;
    }
    $val = trim((string) $inputData[$key]);
    return $val !== '' ? $val : $default;
}

function firstFilled($keys)
{
    foreach ($keys as $key) {
        $val = v($key, '');
        if ($val !== '') {
            return $val;
        }
    }
    return '';
}

function clean($s)
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

function requiredFields($arr)
{
    global $inputData;
    foreach ($arr as $k => $label) {
        if (!isset($inputData[$k])) {
            return $label . ' is required';
        }
        $val = $inputData[$k];
        if (is_array($val)) {
            if (count($val) === 0) {
                return $label . ' is required';
            }
            continue;
        }
        if (trim((string) $val) === '') {
            return $label . ' is required';
        }
    }
    return null;
}

function kvRow($label, $value, $multiline = false)
{
    if ($value === '') {
        $value = '-';
    }
    $body = $multiline ? nl2br(clean($value)) : clean($value);
    return '<p style="margin:0 0 8px;"><strong>' . clean($label) . ':</strong> ' . ($multiline ? '<br>' : '') . $body . '</p>';
}

function cartItems()
{
    global $inputData;
    $raw = isset($inputData['cart_items']) ? $inputData['cart_items'] : '';
    if (is_array($raw)) {
        return $raw;
    }
    $decoded = json_decode((string) $raw, true);
    return is_array($decoded) ? $decoded : array();
}

$formType = v('formType', '');
$allowedTypes = array('contact', 'newsletter', 'quote');
if (!in_array($formType, $allowedTypes, true)) {
    json_exit(400, array('success' => false, 'error' => 'Invalid formType.'));
}

if ($formType === 'contact') {
    $msg = requiredFields(array('name' => 'Name', 'email' => 'Email'));
} elseif ($formType === 'newsletter') {
    $msg = requiredFields(array('email' => 'Email'));
} else {
    $msg = requiredFields(array(
        'billing_first_name' => 'Billing First Name',
        'billing_last_name' => 'Billing Last Name',
        'billing_email' => 'Billing Email',
        'billing_phone' => 'Billing Phone',
        'billing_address' => 'Billing Address',
        'billing_town' => 'Billing Town',
        'cart_items' => 'Cart Items',
        'cart_total' => 'Cart Total',
        'order_total' => 'Order Total',
    ));
}
if ($msg) {
    json_exit(422, array('success' => false, 'error' => $msg));
}

$email = firstFilled(array('email', 'billing_email', 'shipping_email'));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_exit(422, array('success' => false, 'error' => 'Invalid email.'));
}

$name = firstFilled(array('name', 'billing_first_name', 'firstName'));
if ($formType === 'quote') {
    $name = trim(v('billing_first_name', '') . ' ' . v('billing_last_name', ''));
}

$brandName = envVal('MAIL_FROM_NAME', 'Cart Corner');
$tagline = "Bold picks, honest prices, and fast delivery — shopping made fun.";
$brandColor = '#111111';
$accent = '#FFD54F';
$border = '#e5e7eb';
$toEmail = envVal('MAIL_TO', 'info@cart-corner.com');

if ($formType === 'contact') {
    $subject = 'New Contact Inquiry - Cart Corner - ' . $name;
} elseif ($formType === 'newsletter') {
    $subject = 'New Newsletter Signup - Cart Corner - ' . $email;
} else {
    $subject = 'New Quote Request - Cart Corner - ' . $name;
}

$mainContent = '';
$alt = $subject . "\n\n";

if ($formType === 'contact') {
    $fullName = v('name', trim(v('firstName', '') . ' ' . v('lastName', '')));
    $mainContent =
        '<tr><td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:' . $accent . ';padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:' . $brandColor . ';">Contact Details</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">'
        . kvRow('First Name', v('firstName', ''))
        . kvRow('Last Name', v('lastName', ''))
        . kvRow('Full Name', $fullName)
        . kvRow('Email', v('email', ''))
        . kvRow('Phone', v('phone', ''))
        . kvRow('Subject', v('subject', ''))
        . kvRow('Message', v('message', ''), true)
        . '</td></tr></table></td></tr>';
    $alt .= 'Name: ' . $fullName . "\nEmail: " . v('email', '') . "\nPhone: " . v('phone', '') . "\n";
} elseif ($formType === 'newsletter') {
    $mainContent =
        '<tr><td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:' . $accent . ';padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:' . $brandColor . ';">Newsletter</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">'
        . kvRow('Email', $email)
        . '</td></tr></table></td></tr>';
    $alt .= 'Email: ' . $email . "\n";
} else {
    $cartHtml = '';
    $cart = cartItems();
    if (count($cart)) {
        $cartHtml .= '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:8px;">
          <tr style="background:#fafafa;">
            <th align="left" style="padding:8px;border:1px solid ' . $border . ';">Item</th>
            <th align="center" style="padding:8px;border:1px solid ' . $border . ';">Qty</th>
            <th align="right" style="padding:8px;border:1px solid ' . $border . ';">Price</th>
          </tr>';
        foreach ($cart as $item) {
            $itemName = isset($item['name']) ? (string) $item['name'] : '';
            $itemQty = isset($item['quantity']) ? (string) $item['quantity'] : '';
            $itemPrice = isset($item['price']) ? (string) $item['price'] : '';
            $cartHtml .= '<tr>
              <td style="padding:8px;border:1px solid ' . $border . ';">' . clean($itemName) . '</td>
              <td align="center" style="padding:8px;border:1px solid ' . $border . ';">' . clean($itemQty) . '</td>
              <td align="right" style="padding:8px;border:1px solid ' . $border . ';">' . clean($itemPrice) . '</td>
            </tr>';
            $alt .= $itemName . ' x ' . $itemQty . ' - ' . $itemPrice . "\n";
        }
        $cartHtml .= '</table>';
    }

    $billingTownLine = v('billing_address', '') . ', ' . v('billing_town', '');
    if (v('billing_state', '') !== '') {
        $billingTownLine .= ', ' . v('billing_state', '');
    }
    if (firstFilled(array('postcode', 'billing_postcode')) !== '') {
        $billingTownLine .= ' - ' . firstFilled(array('postcode', 'billing_postcode'));
    }

    $mainContent =
        '<tr><td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:' . $accent . ';padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:' . $brandColor . ';">Billing Info</td></tr>
          <tr><td style="padding:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
            <p><strong>' . clean(v('billing_first_name', '') . ' ' . v('billing_last_name', '')) . '</strong></p>
            <p>' . clean(v('billing_email', '')) . '</p>
            <p>Phone: ' . clean(v('billing_phone', '')) . '</p>
            <p>' . clean($billingTownLine) . '</p>'
        . (v('notes', '') !== '' ? '<p>Notes: ' . nl2br(clean(v('notes', ''))) . '</p>' : '')
        . '</td></tr></table></td></tr>
        <tr><td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:' . $accent . ';padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:' . $brandColor . ';">Order Summary</td></tr>
          <tr><td style="padding:10px;">' . $cartHtml . '
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-collapse:collapse;">
              <tr><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:600;">CART SUBTOTAL:</td><td align="right" style="padding:6px 0;">' . clean(v('cart_total', '')) . '</td></tr>
              <tr><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:600;">SHIPPING:</td><td align="right" style="padding:6px 0;">FREE</td></tr>
              <tr><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:700;">ORDER TOTAL:</td><td align="right" style="padding:6px 0;">' . clean(v('order_total', '')) . '</td></tr>
            </table>
          </td></tr>
        </table></td></tr>';
    $alt .= 'Billing: ' . v('billing_first_name', '') . ' ' . v('billing_last_name', '') . "\n";
    $alt .= 'Email: ' . v('billing_email', '') . "\nPhone: " . v('billing_phone', '') . "\n";
    $alt .= 'Total: ' . v('order_total', '') . "\n";
}

$html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' . clean($subject) . '</title></head>
<body style="margin:0;padding:0;background:#111111;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:30px 10px;">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%;background:#ffffff;border:3px solid ' . $accent . ';">
      <tr><td align="center" style="padding:24px 10px;background:' . $brandColor . ';">
        <h1 style="margin:0;font-family:Arial,sans-serif;font-size:22px;color:' . $accent . ';">' . clean($brandName) . '</h1>
        <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#c6c6c6;">' . clean($tagline) . '</p>
      </td></tr>
      <tr><td align="center" style="padding:16px 20px 8px;font-family:Arial,sans-serif;font-weight:600;color:' . $brandColor . ';">' . clean($subject) . '</td></tr>
      <tr><td align="center" style="padding:0 20px 16px;font-family:Arial,sans-serif;font-size:12px;color:#888;">Received at ' . date('Y-m-d H:i:s') . ' IST</td></tr>
      ' . $mainContent . '
      <tr><td align="center" style="padding:14px 20px;background:#fafafa;font-family:Arial,sans-serif;font-size:12px;color:#888;">
        This email was generated from the <strong>' . clean($brandName) . '</strong> website.
      </td></tr>
    </table>
  </td></tr></table>
</body></html>';

$fromEmail = envVal('MAIL_FROM', $toEmail);
$fromName = $brandName;
$replyName = $name !== '' ? $name : $email;
$sent = false;
$sendError = '';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: ' . $fromName . ' <' . $fromEmail . '>' . "\r\n";
$headers .= 'Reply-To: ' . $replyName . ' <' . $email . '>' . "\r\n";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

if (function_exists('mail')) {
    $sent = @mail($toEmail, $encodedSubject, $html, $headers);
    if (!$sent) {
        $sendError = 'PHP mail() returned false. Create mailbox ' . $toEmail . ' in cPanel.';
    }
} else {
    $sendError = 'PHP mail() is disabled on this host.';
}

$smtpHost = envVal('SMTP_HOST', '');
$smtpUser = envVal('SMTP_USER', '');
$smtpPass = envVal('SMTP_PASS', '');
if (!$sent && $smtpHost !== '' && $smtpUser !== '' && $smtpPass !== '') {
    $autoloadCandidates = array(
        dirname(__DIR__) . '/vendor/autoload.php',
        dirname(dirname(__DIR__)) . '/vendor/autoload.php',
    );
    foreach ($autoloadCandidates as $autoload) {
        if (!is_file($autoload)) {
            continue;
        }
        try {
            require $autoload;
            if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
                break;
            }
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->Timeout = 8;
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPass;
            $mail->Port = (int) envVal('SMTP_PORT', '587');
            $smtpSecure = envVal('SMTP_SECURE', 'tls');
            if ($smtpSecure === 'smtps' || (int) envVal('SMTP_PORT', '587') === 465) {
                $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            } else {
                $mail->SMTPSecure = 'tls';
            }
            $mail->CharSet = 'UTF-8';
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($toEmail, $brandName);
            $mail->addReplyTo($email, $replyName);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $html;
            $mail->AltBody = $alt;
            $mail->send();
            $sent = true;
            $sendError = '';
        } catch (Exception $e) {
            $sendError = $e->getMessage();
        }
        break;
    }
}

if (!$sent) {
    json_exit(500, array(
        'success' => false,
        'error' => 'Failed to send email.',
        'message' => $sendError !== '' ? $sendError : 'Unable to send email.',
    ));
}

json_exit(200, array('success' => true, 'message' => 'Message sent successfully.'));
