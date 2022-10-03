import { gql } from 'graphql-request'

const QUERYS = {
  // **** Query for all categories *****
  CATEGORIES: gql`
    {
      category {
        products {
          id
          name
          inStock
          gallery
          category
          brand
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          attributes {
            id
            type
            name
            items {
              value
              id
            }
          }
        }
      }
    }
  `,

  // **** Query for single category *****
  CATEGORY: gql`
    query category($name: CategoryInput!) {
      category(input: $name) {
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
            id
            type
            name
            items {
              id
              value
            }
          }
          gallery
        }
      }
    }
  `,
  // **** Query for single category *****
  PRODUCT: gql`
    query productId($id: String!) {
      product(id: $id) {
        id
        name
        brand
        description
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          type
          name
          items {
            id
            value
          }
        }
        gallery
      }
    }
  `,

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
}
export default QUERYS
