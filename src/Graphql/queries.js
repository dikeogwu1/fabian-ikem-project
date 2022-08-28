import { gql } from 'graphql-request'

const QUERYS = {
  // **** Query category names for navbar *****
  CATEGORIES_NAMES: gql`
    {
      categories {
        name
      }
    }
  `,
  // **** Query for all categories *****
  ALL_CATEGORIES: gql`
    {
      categories {
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
