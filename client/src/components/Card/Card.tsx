import React, { FC, ReactElement } from 'react';

interface CardProps {
  title: string;
  children: ReactElement[] | ReactElement;
}

export const Card: FC<CardProps> = props => (
  <div className="card" style={{ maxWidth: '680px' }}>
    <div className="card-header bg-primary" style={{ color: '#fff' }}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
      {props.children}
    </div>
  </div>
);
