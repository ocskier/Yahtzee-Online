import React, { FC, ReactElement } from 'react';

interface CardProps {
  title: string;
  children: ReactElement[] | ReactElement;
}

export const Card: FC<CardProps> = (props) => (
  <div className="card">
    <div className="card-header bg-primary" style={{ color: '#fff' }}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body" style={{ margin: 'auto' }}>
      {props.children}
    </div>
  </div>
);
