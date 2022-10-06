import styled from 'styled-components'

export const StyledDetails = styled.div`
  width: 100%;

  .product-name {
    font-weight: 400;
    margin-bottom: 2.5rem;
  }

  /* product details items wrapper */
  .cart-items .cart-item-price {
    font-weight: 900;
    color: #1d1f22;
    font-size: 1rem;
  }
  .product-attr-name {
    font-size: 1rem;
    color: #1d1f22;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .product-attr-btn {
    min-width: 3.5rem;
    height: 2rem;
    margin-right: 0.25rem;
    border: 1px solid #1d1f22;
    margin-bottom: 1rem;
  }
  .active-attribute {
    background: #1d1f22;
    color: #fff;
  }
  .product-attr-color {
    width: 2rem;
    height: 2rem;
    border: 1px solid #1d1f22;
    margin-right: 0.25rem;
    margin-bottom: 1.5rem;
  }
  .activeColor {
    outline: 3px solid #5ece7b;
  }

  .product-price {
    margin-top: 1rem;
  }
  .product-unit-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1d1f22;
  }

  /* product details place order btn */
  .unavailable-product,
  .product-order {
    width: 17.375rem;
    height: 2.625rem;
    padding: 1rem 2rem;
    font-weight: 600;
    color: #fff;
    border: none;
    text-transform: uppercase;
    background: #5ece7b;
    margin-bottom: 1rem;
  }
  .unavailable-product {
    cursor: not-allowed;
  }

  @media screen and (min-width: 900px) {
    width: 45%;
    margin-left: 0.5rem;
  }
`
