export default function Select({ id, children, className, ...props }) {
    return (
        <div>
            <select
                {...props}
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-alerange focus:border-alerange block w-full p-2.5 "
            >
                {children}
            </select>
        </div>
    );
}
