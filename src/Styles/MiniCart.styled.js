import styled from 'styled-components'

export const StyledMiniCart = styled.div`
  width: 100%;
  height: 700vh;
  background: rgba(57, 55, 72, 0.22);
  position: absolute;
  left: 0;
  z-index: 6;

  .mini-wrapper {
    width: 21rem;
    min-height: 31.25rem;
    background: var(--clr-white);
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.25rem 0.5rem;
  }
  .mini {
    min-height: 33rem;
  }
  .mini-qty-box {
    font-weight: 900;
    margin-bottom: 2rem;
  }
  .mini-qty {
    font-weight: 500;
  }

  .mini-items-wrapper::-webkit-scrollbar {
    width: 0.28rem;
  }
  .mini-items-wrapper::-webkit-scrollbar-track {
    box-shadow: 0 0 2px 1px #808080a9;
    border-radius: 10px;
  }
  .mini-items-wrapper::-webkit-scrollbar-thumb {
    background: rgba(57, 55, 72, 0.22);
    border-radius: 10px;
    cursor: pointer;
  }

  .mini-items-wrapper {
    margin-top: 2rem;
    height: 25.25rem;
    overflow-y: scroll;
    padding-right: 0.5rem;
  }
  .mini-total {
    display: flex;
    justify-content: space-between;
    color: #1d1f22;
    margin-top: 0.75rem;
  }
  .mini-total h4 {
    font-size: 1rem;
    font-weight: bold;
  }
  .mini-total-amount {
    font-weight: bolder;
    color: #000;
  }
  /* overlay checkout button */
  .mini-checkout-btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .mini-checkout-btns button {
    width: 8.75rem;
    height: 2.625rem;
    background: #fff;
    border: 1px solid #1d1f22;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    display: grid;
    place-content: center;
    letter-spacing: 1px;
    font-family: var(--ff-primary);
    transition: var(--transition);
  }
  .mini-checkout-btns button:hover {
    background: #5ece7b;
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    height: 365vh;
  }

  @media screen and (min-width: 900px) {
    height: 280vh;

    .mini-wrapper {
      right: 3.5rem;
    }
  }
`

export const StyledEmptyCart = styled.div`
  width: 100%;
  height: 700vh;
  background: rgba(57, 55, 72, 0.22);
  position: absolute;
  left: 0;
  z-index: 6;

  .mini-wrapper {
    width: 21rem;
    min-height: 31.25rem;
    background: var(--clr-white);
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.25rem 0.5rem;
  }
  .empty-cart {
    display: grid;
    place-content: center;
    height: 25rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  .empty-cart h3 {
    font-size: 1.25rem;
  }

  @media screen and (min-width: 768px) {
    height: 365vh;
  }

  @media screen and (min-width: 900px) {
    height: 280vh;

    .mini-wrapper {
      right: 3.5rem;
    }
  }
`
