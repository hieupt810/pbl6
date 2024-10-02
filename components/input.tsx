'use client';

import { Input, InputProps } from '@nextui-org/input';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { EyeFilledIcon, EyeSlashFilledIcon } from './icons';

type Props = {
    formValidate?: UseFormRegisterReturn;
} & InputProps;

export const FormInput = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            aria-disabled={props.isDisabled}
            aria-readonly={props.isReadOnly}
            aria-required={props.isRequired}
            className={props.className}
            color={props.color}
            defaultValue={props.defaultValue}
            description={props.description}
            endContent={
                props.type === 'password' && (
                    <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        )}
                    </button>
                )
            }
            errorMessage={props.errorMessage}
            isDisabled={props.isDisabled}
            isInvalid={!!props.errorMessage}
            isReadOnly={props.isReadOnly}
            isRequired={props.isRequired}
            label={props.label}
            labelPlacement={props.labelPlacement}
            placeholder={props.placeholder}
            radius={props.radius}
            size={props.size}
            type={props.type === 'password' && isVisible ? 'text' : props.type}
            variant={props.variant}
            {...props.formValidate}
        />
    );
};
