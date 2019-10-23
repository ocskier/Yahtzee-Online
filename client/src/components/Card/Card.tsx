import React, { ReactPropTypes, FC } from "react";

interface CardProps extends ReactPropTypes {
  title: string;
}

export const Card: FC<CardProps> = props => (
  <div className="card">
    <div className="card-header bg-primary" style={{ color: "#fff" }}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">{props.children}</div>
  </div>
);
