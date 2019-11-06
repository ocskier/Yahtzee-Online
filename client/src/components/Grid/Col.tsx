import React, { FC, ReactNode, ReactNodeArray } from 'react';

interface ColProps {
  size?: string;
  children: ReactNode | ReactNodeArray;
}

export const Col: FC<ColProps> = ({ size, children }) => (
  <div
    className={size!
      .split(' ')
      .map(size => 'col-' + size)
      .join(' ')}
  >
    {children}
  </div>
);
