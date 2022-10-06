import styled from 'styled-components'

export const StyledCurrencySwticher = styled.ul`
  position: absolute;
  top: 10%;
  right: 85px;
  width: 8.125rem;
  background: var(--clr-white);
  box-shadow: var(--main-shadow);
  z-index: 4;

  & li {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  & li:hover {
    background: #eee;
  }
`
