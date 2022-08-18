import { gql } from 'graphql-request'

const REQUEST = {
  FOR_CATEGORIES: gql`
    {
      categories {
        name
      }
    }
  `,
}
export default REQUEST
