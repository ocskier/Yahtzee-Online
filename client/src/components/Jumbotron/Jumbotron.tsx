import React, { ReactPropTypes, FC } from "react";

interface JumbotronProps extends ReactPropTypes {}

const Jumbotron: FC<JumbotronProps> = ({ children }) => (
  <div
    style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
