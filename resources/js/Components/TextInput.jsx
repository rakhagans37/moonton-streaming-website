import { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TextInput = forwardRef(function TextInput(
    {
        type = "text",
        autoComplete,
        className = "",
        isFocused = false,
        variant = "primary",
        placeholder,
        isError,
        value,
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={`rounded-2xl py-[13px] px-7 w-full ${isError && 'input-error'} input-${variant} ${className}`}
            ref={input}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
        />
    );
});

TextInput.propTypes = {
    type: PropTypes.oneOf(["text", "password", "email", "number", "file", "date"]),
    className: PropTypes.string,
    isFocused: PropTypes.bool,
    variant: PropTypes.oneOf(["primary", "error", "primary-outline"]),
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    defaultValue: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    autoComplete: PropTypes.string,
};

export default TextInput;