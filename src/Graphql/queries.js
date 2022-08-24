import { gql } from 'graphql-request'

const QUERY = {
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
      category {
        name
        products {
          id
          name
          brand
          inStock
          prices {
            amount
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
export default QUERY
