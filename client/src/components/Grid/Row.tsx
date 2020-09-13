import React, { FC, ReactNode, ReactNodeArray } from 'react';

interface RowProps {
  children: ReactNode | ReactNodeArray;
}

export const Row: FC<RowProps> = ({ children }) => (
  <div className={`row`} style={{ padding: '40px' }}>
    {children}
  </div>
);
