import PropTypes from 'prop-types';

const Button = function Button({ type, className = '', variant='primary', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `rounded-2xl py-[13px] text-center btn-${variant} w-full ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'warning', 'danger', 'secondary', 'white-outline']),
    disabled: PropTypes.bool,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;