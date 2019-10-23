import React, { ReactPropTypes, FC } from "react";

interface RowProps extends ReactPropTypes {
  fluid: string;
}

export const Row: FC<RowProps> = ({ fluid, children }) => (
  <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>
);
