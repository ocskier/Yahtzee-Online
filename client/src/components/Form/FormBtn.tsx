import React, { FC, MouseEvent } from 'react';

interface FormBtnProps {
  onClick: (event: MouseEvent & any) => void;
  children: string;
}

export const FormBtn: FC<FormBtnProps> = props => (
  <button onClick={props.onClick} style={{ float: 'right', marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);
