import React, { ReactPropTypes, FC } from "react";

interface TextAreaProps extends ReactPropTypes {}

export const TextArea: FC<TextAreaProps> = props => (
  <div className="form-group">
    <textarea className="form-control" rows={20} {...props} />
  </div>
);
