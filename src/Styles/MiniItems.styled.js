import styled from 'styled-components'

export const StyledMiniItems = styled.article`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.75rem;

  & .mini-items-box {
    min-width: 9.75rem;
    width: 60%;
  }
  .mini-items-box h4 {
    margin-bottom: 0.75rem;
    color: #1d1f22;
    font-weight: 300;
    letter-spacing: 0;
  }
  .mini-item-price {
    font-weight: 500;
    color: #1d1f22;
    font-size: 1rem;
  }
  .mini-item-size {
    font-size: 0.875rem;
    color: #1d1f22;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  .mini-attr-btn {
    min-width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
    border: 1px solid #1d1f22;
    margin-bottom: 0.5rem;
  }
  .active-attribute {
    background: #1d1f22;
    color: #fff;
  }
  .mini-attr-color {
    width: 1rem;
    height: 1rem;
    border: 1px solid #1d1f22;
    margin-right: 0.25rem;
  }

  .activeColor {
    outline: 2px solid #5ece7b;
  }

  /* mini items btn wrapper */
  .mini-btns-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
  }
  .mini-btns-wrapper button {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    background: transparent;
    border: 1px solid #1d1f22;
    padding: 3px;
  }
  .mini-btns-wrapper h4 {
    margin-bottom: 0;
  }
  /* mini items image wrapper */
  .mini-img-wrapper {
    width: 7.5rem;
    height: 9.75rem;
  }
  .mini-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media screen and (min-width: 900px) {
    & .mini-items-box {
      width: 60%;
    }
  }
`
