import PropTypes from "prop-types";

const Table = function Table({ column, children, dataLength = 0 }) {
    return (
        <>
            {/* <!-- Start block --> */}
            <section className="bg-gray-50 antialiased">
                <div className="mx-auto max-w-screen-2xl ">
                    <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex items-center space-x-2">
                                <h5>
                                    <span className="text-gray-500">
                                        All Data:
                                    </span>
                                    <span> {dataLength}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        {column.map((columnName, index) => (
                                            <th scope="col" key={index} className="p-4">
                                                {columnName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>{children}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Table.propTypes = {
    column: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    dataLength: PropTypes.number
};

export default Table;
