import styled from 'styled-components'

export const StyledProduct = styled.main`
  .product-container {
    position: relative;
    margin: 0 1rem;
    padding-bottom: 2rem;
  }
  .product-gallery-wrapper {
    width: 55%;
    padding-top: 2rem;
    margin-bottom: 2rem;
  }
  .major-image {
    height: 30rem;
    width: 80%;
    position: absolute;
    left: 6rem;
    top: 0;
  }
  .major-image img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .other-image {
    width: 3.5rem;
    height: 5rem;
    margin-top: 0.5rem;
    cursor: pointer;
  }
  .other-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media screen and (min-width: 900px) {
    .product-container {
      margin: 2rem 6.625rem;
      display: flex;
    }
    .product-gallery-wrapper {
      width: 55%;
      padding-top: 2rem;
      margin-bottom: 0;
    }
    .major-image {
      height: 30rem;
      width: 32rem;
      position: absolute;
      left: 6rem;
      top: 0;
    }
  }
`
