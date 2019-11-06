import React, { FC, ReactNode, ReactNodeArray } from 'react';

interface JumbotronProps {
  children: ReactNode | ReactNodeArray;
}

const Jumbotron: FC<JumbotronProps> = ({ children }) => (
  <div style={{ height: 300, clear: 'both', paddingTop: 120, textAlign: 'center' }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
