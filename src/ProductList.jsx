import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();

  const CartItems = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return CartItems
      ? CartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )
      : 0;
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // your plantsArray and other functions...

  return (
    <div>
      <div className="navbar">

        {/* your existing navbar content */}

        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowCart(true);
            }}
          >
            <h1 className="cart">
              Cart
            </h1>

            <span className="cart_quantity_count">
              {calculateTotalQuantity()}
            </span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">

          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1 className="plant_heading">
                {category.category}
              </h1>

              <div className="product-list">

                {category.plants.map(
                  (plant, plantIndex) => (
                    <div
                      className="product-card"
                      key={plantIndex}
                    >
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />

                      <div className="product-title">
                        {plant.name}
                      </div>

                      <div className="product-description">
                        {plant.description}
                      </div>

                      <div className="product-price">
                        {plant.cost}
                      </div>

                      <button
                        className={`product-button ${
                          addedToCart[plant.name]
                            ? 'added-to-cart'
                            : ''
                        }`}
                        disabled={addedToCart[plant.name]}
                        onClick={() =>
                          handleAddToCart(plant)
                        }
                      >
                        {addedToCart[plant.name]
                          ? 'Added to Cart'
                          : 'Add to Cart'}
                      </button>
                    </div>
                  )
                )}

              </div>
            </div>
          ))}

        </div>
      ) : (
        <CartItem
          onContinueShopping={() =>
            setShowCart(false)
          }
        />
      )}
    </div>
  );
}

export default ProductList;