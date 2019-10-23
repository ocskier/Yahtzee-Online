import React, { ReactPropTypes, FC } from "react";

interface ContainerProps extends ReactPropTypes {
  fluid: string;
}

export const Container: FC<ContainerProps> = ({ fluid, children }) => (
  <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>
);
