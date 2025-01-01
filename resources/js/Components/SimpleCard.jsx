export default function SimpleCard({ children, variant = "primary", className, ...props }) {
    return (
        <div
            {...props}
            className={
                `rounded-3xl px-4 py-2 text-center btn-${variant} ` + className
            }
        >
            {children}
        </div>
    );
}
