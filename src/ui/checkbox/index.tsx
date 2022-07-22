/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { IconCheck } from './icon';
import './style.scss';
import { ICheckboxProps } from './types';

function Checkbox({ checked, className, onChange, id }: ICheckboxProps) {
    const inputRef = React.useRef(null);

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLLabelElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputRef.current.click();
            }
        },
        []
    );

    return (
        <span className={`checkbox${className ? ` ${className}` : ''}`}>
            <input
                type="checkbox"
                className="checkbox__input"
                checked={checked}
                id={id}
                onChange={onChange}
                ref={inputRef}
            />
            <label
                className="checkbox__square"
                htmlFor={id}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {checked && <IconCheck color="#fff" />}
            </label>
        </span>
    );
}

export default Checkbox;
