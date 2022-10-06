import styled from 'styled-components'

export const StyledCategory = styled.div`
  width: 20.125rem;
  height: 27.75rem;
  padding: 1rem;
  position: relative;
  cursor: pointer;
  & div {
    height: 20rem;
    margin-bottom: 1.5rem;
    position: relative;
  }
  & .category-brand {
    color: #1d1f22;
  }
  .in-stock {
    font-size: 1.5rem;
    color: #8d8f9a;
    position: absolute;
    top: 10rem;
    left: 4rem;
    text-transform: uppercase;
  }
  & div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .add-product {
    background: var(--clr-green);
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    bottom: 5.25rem;
    right: 1.5rem;
    z-index: 3;
    transition: var(--transition);
    box-shadow: 0px 0px 5px 2px #555;
  }
  /* hover state */
  .add-product:hover {
    background: #0fad04d0;
    box-shadow: 0px 0px 5px 2px #555;
  }

  @media screen and (min-width: 768px) {
    & {
      width: 23.125rem;
    }
  }

  @media screen and (min-width: 900px) {
    .add-product {
      transform: scale(0);
    }
    /* hover state */
    &:hover {
      box-shadow: var(--main-shadow);
      transition: var(--transition);
    }
    &:hover .add-product {
      transform: scale(1);
    }
  }
`
