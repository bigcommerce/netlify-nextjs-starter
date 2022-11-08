import cn from 'classnames';
import React, { FC } from 'react';

interface Props {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: FC<Props> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mx-auto': !clean,
  });

  const Component = el;

  // @ts-expect-error it's a valid component
  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
