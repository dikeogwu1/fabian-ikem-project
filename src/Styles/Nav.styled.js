import styled from 'styled-components'

export const StyledNav = styled.header`
  width: 100%;
  height: 5rem;
  padding: 1.5rem 1rem;
  background: rgb(255, 255, 255);

  & nav {
    display: flex;
    justify-content: space-between;
  }
  .nav-box {
    display: flex;
    flex-direction: column;
    width: 4rem;
    justify-content: space-between;
  }
  .links-wrapper {
    order: 2;
    height: 0;
    overflow: hidden;
    transition: var(--transition);
    position: relative;
    z-index: 2;
    width: 99vw;
    background: #fff;
  }
  .show-links {
    height: 11rem;
    transition: var(--transition);
  }
  .links-wrapper li {
    padding: 1rem 0;
    text-transform: uppercase;
    position: relative;
  }
  .nav-link {
    color: #1d1f22;
    font-weight: 400;
    font-size: 1rem;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: #000;
  }
  li a.active {
    color: var(--clr-green);
  }
  li a.active:hover {
    color: var(--clr-green);
  }
  li a.active::after {
    content: '';
    width: 65px;
    height: 2px;
    background: var(--clr-green);
    position: absolute;
    bottom: 0;
    left: -5px;
  }
  .logo-wrapper {
    order: 1;
  }
  nav section {
    display: flex;
    justify-content: space-between;
    width: 8rem;
  }
  .currency-switch-wrapper {
    display: flex;
    cursor: pointer;
  }
  .cart-wrapper {
    margin-left: 2rem;
    cursor: pointer;
    position: relative;
  }
  .bars-wrapper {
    cursor: pointer;
  }
  /* Icons on the nav */
  .chevron-down,
  .chevron-up,
  .barsIcon {
    width: 1rem;
    height: 1rem;
  }

  @media screen and (min-width: 900px) {
    height: 5rem;
    padding: 1.75rem 5.625rem;
    overflow: visible;

    .nav-box {
      flex-direction: row;
      width: 34.25rem;
    }
    .links-wrapper {
      order: 1;
      margin-top: 0;
      width: auto;
      height: auto !important;
      overflow: visible;
    }
    .links-wrapper li {
      display: inline;
      margin: 0 1.25rem;
      padding: 0;
    }
    li a.active::after {
      bottom: -20px;
    }
    .logo-wrapper {
      order: 2;
    }
    nav section {
      display: flex;
      justify-content: space-between;
      width: 5rem;
    }

    .bars-wrapper {
      display: none;
    }
  }
`
