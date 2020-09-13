import React, { ReactPropTypes, FC, ChangeEvent } from 'react';
import './Form.css';

interface InputProps extends ReactPropTypes {
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export const Input: FC<InputProps & any> = (props) => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);
