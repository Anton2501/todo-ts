import React, { LegacyRef } from 'react';
import './style.scss';
import { IInputProps } from './types';

const Input = React.forwardRef(
    (props: IInputProps, ref: LegacyRef<HTMLInputElement>) => {
        const {
            value,
            className,
            onChange,
            onBlur,
            id,
            type = 'text',
            placeholder,
        } = props;
        return (
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={`input${className ? ` ${className}` : ''}`}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                ref={ref}
            />
        );
    }
);

Input.displayName = 'Input';

export default Input;
