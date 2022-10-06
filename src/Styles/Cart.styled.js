import styled from 'styled-components'

export const StyledCart = styled.main`
  .cart-container {
    margin: 0 1rem;
    padding-bottom: 2rem;
  }
  .title {
    padding-top: 2.5rem;
    color: #1d1f22;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
  }
  .cart-underline {
    width: 100%;
    height: 1px;
    background: #e5e5e5;
    margin-bottom: 1.75rem;
  }
  .cart-total-wrapper {
    display: flex;
    height: 10rem;
  }
  .total-text p {
    color: #1d1f22;
    font-weight: 400;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .total-numbers {
    margin-left: 1rem;
  }
  .total-numbers b {
    font-weight: 700;
    color: #1d1f22;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  .place-order {
    width: 17.375rem;
    height: 2.625rem;
    padding: 1rem 2rem;
    font-weight: 600;
    color: #fff;
    border: none;
    text-transform: uppercase;
    background: #5ece7b;
  }

  @media screen and (min-width: 900px) {
    .cart-container {
      margin: 0 6.625rem;
    }
  }
`
export const StyledEmpty = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;

  & .empty-cart {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 1.25rem;
  }
`
