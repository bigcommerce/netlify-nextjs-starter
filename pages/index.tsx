import { Layout } from '@vercel/examples-ui';
import Head from 'next/head';

import { Container, Footer, Navbar, UIComponent } from '@components/ui';
import { getAllEntries } from '@lib/cms/cmsEntries';

export async function getStaticProps() {
  try {
    const entry = await getAllEntries('home_page');
    const header = await getAllEntries('header');
    const navBar: any = header[0] || null;

    if (entry) {
      return {
        props: {
          ...entry[0],
          navBar,
        },
        revalidate: 1,
      };
    }

    throw new Error('Entry is not valid');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function Index(props: any) {
  const { modular_blocks = [], navBar } = props;

  return (
    <>
      <Head>
        <title>BigCommerce Example</title>
        <meta
          content="This is a basic example outlining how to use BigCommerce"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Container>
        <Navbar data={navBar} />
        {/* @ts-ignore */}
        {modular_blocks.map(({ component }, i) => {
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
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Index.Layout = Layout;

export default Index;
