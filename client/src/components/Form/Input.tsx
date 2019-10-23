import React, { ReactPropTypes, FC } from "react";

interface InputProps extends ReactPropTypes {}

export const Input: FC<InputProps> = props => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);
