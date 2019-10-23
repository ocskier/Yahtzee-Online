import React, { ReactPropTypes, FC } from "react";

interface FormBtnProps extends ReactPropTypes {}

export const FormBtn: FC<FormBtnProps> = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10 }}
    className="btn btn-success"
  >
    {props.children}
  </button>
);
