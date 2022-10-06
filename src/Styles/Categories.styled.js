import styled from 'styled-components'

export const StyledCategories = styled.main`
  & .category-wrapper {
    margin: 0 1rem;
    padding-bottom: 2rem;
  }
  .category-wrapper h2 {
    font-size: 2.625rem;
    color: #1d1f22;
    padding: 5rem 0;
  }
  .category-product-box {
    display: grid;
    place-content: center;
    gap: 5rem 2.5rem;
  }

  @media screen and (min-width: 768px) {
    .category-product-box {
      grid-template-columns: repeat(2, 23.125rem);
    }
  }

  @media screen and (min-width: 900px) {
    .category-wrapper {
      margin: 0 6.625rem;
    }
    .category-product-box {
      grid-template-columns: repeat(3, 23.125rem);
    }
  }
`
