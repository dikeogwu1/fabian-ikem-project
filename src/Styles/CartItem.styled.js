import styled from 'styled-components'

export const StyedCartItem = styled.article`
  /* cart items wrapper */
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;

  .cart-items-box h4 {
    margin-bottom: 0.75rem;
    color: #1d1f22;
    letter-spacing: 0;
  }
  .cart-brand-name {
    font-weight: 900;
    color: #000;
    font-size: 1.1rem;
  }
  .cart-prd-name {
    font-weight: 300;
    font-size: 1.1rem;
  }

  .cart-items .cart-item-price {
    font-weight: 900;
    color: #1d1f22;
    font-size: 1rem;
  }
  .cart-item-size {
    font-size: 0.875rem;
    color: #1d1f22;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  .cart-attr-btn {
    min-width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.25rem;
    border: 1px solid #1d1f22;
    margin-bottom: 0.5rem;
  }
  .active-attribute {
    background: #1d1f22;
    color: #fff;
  }
  .cart-attr-color {
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #1d1f22;
    margin-right: 0.25rem;
  }

  .activeColor {
    outline: 2px solid #5ece7b;
  }

  /* cart items btn wrapper */
  .cart-btns-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
  }
  .cart-btns-wrapper button {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
    border: 1px solid #1d1f22;
    padding: 3px;
  }
  .cart-btns-wrapper h4 {
    margin-bottom: 0;
    font-size: 1.25rem;
  }
  /* cart items image wrapper */
  .cart-img-container {
    width: 8.5rem;
    height: 10.75rem;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .cart-img-container div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: var(--transition);
  }
  .cart-img-container div img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .next-slide {
    transform: translateX(100%);
    opacity: 0;
  }
  .prev-slide {
    opacity: 0;
    transform: translateX(-100%);
  }
  .active-slide {
    opacity: 1;
    transform: translateX(0);
  }

  /* cart btn wrapper */
  .cart-btn-wrapper {
    position: absolute;
    right: 10px;
    bottom: 0;
    z-index: 2;
    width: 3rem;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    background: #666;
  }
  .cart-btn-wrapper button {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.1rem;
    display: block;
  }
  .chevron-left,
  .chevron-right {
    height: 1rem;
    width: 1rem;
  }

  @media screen and (min-width: 900px) {
    & .cart-items-box {
      width: 60%;
    }
  }
`
