import React from "react";
import { CandyButton } from "@/components/ui/candy-button";

const Discount = () => {
  return (
    <div className="cart-page-coupon">
      <div className="cart-page-coupon__head">Have a discount code?</div>

      <div className="cart-page-coupon__body">
        <form
          className="cart-page-coupon__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Enter coupon code"
            className="cart-page-coupon__input"
          />
          <CandyButton type="submit" className="cart-page-coupon__btn">
            Apply Code
          </CandyButton>
        </form>
      </div>
    </div>
  );
};

export default Discount;
