import moment from "moment";
import React from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import "./Order.css";

const Order = ({ order }) => {

  return (
    <div className="order">
      <h2>order</h2>

      <p>{moment.unix(order.data.created).format("MMM DO YYY h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.key}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          rating={item.rating}
          hiddenButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order-total">Order Total : {value}</h3>
          </>
        )}
        decimalScale={2}
        displayType={"text"}
        value={order.data.amount * 100}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default Order;
