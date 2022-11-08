import React from 'react';

import Grid from '@components/ui/Grid/Grid';
import GridProduct from '@components/ui/GridProduct';
import Hero from '@components/ui/Hero';

const UIComponent: React.FC<{
  componentType: UIComponentTypes;
  componentVariant?: string;
  data?: any;
  children?: any;
  priority?: boolean;
}> = (props) => {
  const { componentType = 'default', componentVariant, data, ...rest } = props;

  const componentMap = {
    hero: Hero,
    grid: Grid,
    gridProduct: GridProduct,
    default: () => {
      return null;
    },
  };

  const Component = componentMap[componentType];

  return <Component data={data} variant={componentVariant} {...rest} />;
};

export default UIComponent;
