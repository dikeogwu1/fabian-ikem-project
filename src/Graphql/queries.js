import { gql } from 'graphql-request'

const QUERYS = {
  // **** Query for currency label and symbols *****
  CURRENCIES: gql`
    {
      currencies {
        label
        symbol
      }
    }
  `,
  // **** Query category names for navbar use *****
  CATEGORIES_NAMES: gql`
    {
      categories {
        name
      }
    }
  `,
  // **** Query for all category *****
  ALL_CATEGORY: gql`
    {
      category {
        name
        products {
          id
          name
          brand
          inStock
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          attributes {
            name
            type
          }
          gallery
        }
      }
    }
  `,
  // **** Query for tech category *****
  TECH_CATEGORY: gql`
    {
      category(input: { title: "tech" }) {
        name
        products {
          id
          name
          brand
          inStock
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          attributes {
            name
            type
          }
          gallery
        }
      }
    }
  `,
  // **** Query for clothes category *****
  CLOTHES_CATEGORY: gql`
    {
      category(input: { title: "clothes" }) {
        name
        products {
          id
          name
          brand
          inStock
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          attributes {
            name
            type
          }
          gallery
        }
      }
    }
  `,
}
export default QUERYS
