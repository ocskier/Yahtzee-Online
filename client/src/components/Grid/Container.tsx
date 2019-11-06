import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  fluid?: boolean | string;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ fluid, children }) => (
  <div className={`container${fluid ? '-fluid' : ''}`}>{children}</div>
);
