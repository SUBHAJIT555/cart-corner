import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { CandyButtonLink } from "@/components/ui/candy-button";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="cart-page-summary">
      <div className="cart-page-summary__head">Order Summary</div>

      <div className="cart-page-summary__body">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-page-summary__row">
            <span className="cart-page-summary__row-label">{item.title}</span>
            <span>
              ₹{(item.discountedPrice * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}

        <div className="cart-page-summary__total">
          <span>Total</span>
          <span>₹{totalPrice.toLocaleString("en-IN")}</span>
        </div>

        <CandyButtonLink
          href="/checkout"
          variant="success"
          className="cart-page-summary__checkout"
        >
          Proceed to Checkout
        </CandyButtonLink>
      </div>
    </div>
  );
};

export default OrderSummary;
