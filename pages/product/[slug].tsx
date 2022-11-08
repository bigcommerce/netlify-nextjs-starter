import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products';
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product';
import { Layout } from '@vercel/examples-ui';
import type { GetStaticPropsContext } from 'next';

import { Container, Footer, Navbar, UIComponent } from '@components/ui';
import ProductView from '@components/ui/ProductView';
import { fetchCategoryProduct } from '@lib/bigcommerce/graphql/queries/fetch-category-product';
import { getAllEntries } from '@lib/cms/cmsEntries';

export async function getStaticPaths() {
  const productPaths = await fetchCategoryProduct();
  const paths = productPaths.map((path: string) => `/product${path}`);

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const product = await getProduct({ variables: { slug: params?.slug ?? '' } });
  const allProductsPromise = await getAllProducts({ variables: { first: 4 } });

  // TODO: Check on this
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { products: relatedProducts } = await allProductsPromise;
  const header = await getAllEntries('header');
  const navBar: any = header[0] || {};

  if (!product) {
    throw new Error(`Product with slug '${params?.slug}' not found`);
  }

  return {
    props: {
      product,
      navBar,
      relatedProducts,
    },
    revalidate: 200,
  };
}

function Slug(props: any) {
  const { product, relatedProducts, modular_blocks = [], navBar } = props;

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

        <ProductView product={product} relatedProducts={relatedProducts} />
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Slug.Layout = Layout;

export default Slug;
