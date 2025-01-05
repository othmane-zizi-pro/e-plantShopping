import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Redux store cart items
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper: parse "$15" => 15 (float)
  const parseCost = (costStr) => {
    return parseFloat(costStr.replace('$', ''));
  };

  // Calculate total cost of everything in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Multiply cost by quantity
      total += parseCost(item.cost) * item.quantity;
    });
    return total.toFixed(2); // e.g. "58.00"
  };

  // Returns to the product listing
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); 
  };

  // Increase item quantity by 1
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // Decrease item quantity by 1 (remove if it hits 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      // If quantity would go to 0, remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  // Remove item entirely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    const costNumber = parseCost(item.cost); // e.g. 15
    return (costNumber * item.quantity).toFixed(2); // e.g. "30.00"
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Optional additional summary or note */}
      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      >
        {/* Could display something else here */}
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
