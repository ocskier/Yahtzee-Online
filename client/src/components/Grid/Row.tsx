import React, { FC, ReactNode, ReactNodeArray } from 'react';

interface RowProps {
  fluid?: string;
  children: ReactNode | ReactNodeArray;
}

export const Row: FC<RowProps> = ({ fluid, children }) => (
  <div className={`row${fluid ? '-fluid' : ''}`}>{children}</div>
);
