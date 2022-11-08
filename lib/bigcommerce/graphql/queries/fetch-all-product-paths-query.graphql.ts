export const fetchAllProductPathsQuery = /* GraphQL */ `
  query fetchAllProductPaths($first: Int = 25, $after: String) {
    site {
      products(first: $first, after: $after) {
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        edges {
          node {
            entityId
            path
            name
            categories {
              edges {
                node {
                  name
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;
