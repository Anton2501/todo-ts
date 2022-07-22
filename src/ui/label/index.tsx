import * as React from 'react';
import './style.scss';
import { ILabelProps } from './types';

function Label({ id, children }: ILabelProps) {
    return (
        <label className="label" htmlFor={id}>
            {children}
        </label>
    );
}

export default Label;
