/**
 * Shared submit API for contact, newsletter, and quote forms.
 * Posts to public/api/submit.php (same-origin on production).
 */
export function getSubmitApiUrl() {
  return process.env.NEXT_PUBLIC_SUBMIT_API_URL || "/api/submit.php";
}

export async function submitToApi(payload: FormData | Record<string, unknown>) {
  const url = getSubmitApiUrl();
  const isFormData = payload instanceof FormData;
  const body = isFormData
    ? payload
    : JSON.stringify({
        ...payload,
        cart_items:
          payload.cart_items && typeof payload.cart_items !== "string"
            ? JSON.stringify(payload.cart_items)
            : payload.cart_items,
      });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body,
    });
    const text = await res.text();
    let data: { error?: string; message?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false as const,
        error:
          "Mailer is not reachable. Upload public/api/submit.php to public_html/api/submit.php.",
      };
    }
    if (!res.ok) {
      return {
        success: false as const,
        error: data.error || data.message || "Request failed.",
      };
    }
    return { success: true as const, data };
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Network error. Please try again.",
    };
  }
}
