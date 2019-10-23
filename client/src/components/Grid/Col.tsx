import React, { ReactPropTypes, FC, ReactChild, ReactChildren } from "react";

interface ColProps extends ReactPropTypes {
  size: string;
}

export const Col: FC<ColProps> = ({ size, children }) => (
  <div
    className={size
      .split(" ")
      .map(size => "col-" + size)
      .join(" ")}
  >
    {children}
  </div>
);
