import { Layout } from '@vercel/examples-ui';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import { Container, Footer, Navbar, UIComponent } from '@components/ui';
import ProductCard from '@components/ui/ProductCard';
import { Product } from '@lib/bigcommerce/types/product';
import { getAllEntries } from '@lib/cms/cmsEntries';
import getSlugName from '@lib/get-slug-name';

import { fetchGraphQL } from '../../lib/bigcommerce/fetchers/fetch-graphql';
import { fetchCategoryProductQuery } from '../../lib/bigcommerce/graphql/queries/fetch-category-products-query.graphql';

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<any | null> | undefined> {
  const listing = typeof params?.listing === 'string' ? getSlugName(params.listing) : '';
  const entry = await getAllEntries('header');

  const navBar: any = entry[0] || null;
  let products;
  const categories = entry[0]?.bc_cat?.data;

  try {
    const activeCatogories =
      categories.filter((cat: any) => {
        return getSlugName(cat.name) === listing;
      }) || null;
    const activeCategory = activeCatogories[0];

    if (activeCategory) {
      products = await fetchGraphQL(fetchCategoryProductQuery, {
        categoryEntityId: activeCategory.id,
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  const normalizeProducts: Product[] =
    products?.data?.site?.search?.searchProducts?.products?.edges || [];

  if (normalizeProducts) {
    return {
      props: {
        normalizeProducts,
        navBar,
      },
      revalidate: 1,
    };
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

function Listing(props: any) {
  const { normalizeProducts, navBar, modular_blocks = [] } = props;

  return (
    <>
      <Container>
        <Navbar data={navBar} />
        {modular_blocks.map((component: any, i: any) => {
          const { component_type, component_variant, ...rest } = component;

          return (
            <UIComponent
              componentType={component_type}
              componentVariant={component_variant}
              data={rest}
              key={`${component_type}_${i}`}
              priority={i < 3}
            />
          );
        })}
        <div className="grid grid-cols-2 gap-2 lg:m-3 w-full lg:grid-cols-3 lg:pr-2 lg:pl-2">
          {/* @ts-ignore */}
          {normalizeProducts.map(({ node }) => {
            return (
              <div key={node?.name}>
                <ProductCard product={node} />
              </div>
            );
          })}
        </div>
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Listing.Layout = Layout;

export default Listing;
