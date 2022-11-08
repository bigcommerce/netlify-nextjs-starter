import { fetchGraphQL } from '../../fetchers/fetch-graphql';

import { fetchAllProductPathsQuery } from './fetch-all-product-paths-query.graphql';

export type ProductPath = string;

export const fetchCategoryProduct = async (after = '', depth = 0): Promise<ProductPath[]> => {
  interface PathsNode {
    node: { path: string };
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const res = await fetchGraphQL(fetchAllProductPathsQuery, { after });

    const paths = res.data.site.products.edges.map((x: PathsNode) => {
      return x.node.path;
    });

    if (res.data.site.products.pageInfo.hasNextPage) {
      const nextAfter = res.data.site.products.pageInfo.endCursor;
      const morePaths = await fetchCategoryProduct(nextAfter, depth + 1);

      return paths.concat(morePaths);
    }

    return paths;
  } catch (e) {
    throw e;
  }
};
