export const fetchCategoryProductQuery = /* GraphQL */ `
  query fetchCategoryProductQuery($categoryEntityId: Int) {
    site {
      search {
        searchProducts(filters: { categoryEntityId: $categoryEntityId }) {
          products {
            edges {
              node {
                entityId
                name
                prices {
                  price {
                    value
                  }
                }
                description
                sku
                defaultImage {
                  ...ImageFields
                }
                path
              }
            }
          }
        }
      }
    }
  }
  fragment ImageFields on Image {
    url320wide: url(width: 320)
    url640wide: url(width: 640)
    url960wide: url(width: 960)
    url1280wide: url(width: 1280)
  }
`;
