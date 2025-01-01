export default function Subheading({ children, className = "" }) {
    return (
        <p className={"text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 " + className}>
            {children}
        </p>
    );
}
