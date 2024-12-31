export default function Table({ children, dataLength = 0 }) {
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
                                        All Movies:
                                    </span>
                                    <span> {dataLength}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            Thumbnail
                                        </th>
                                        <th scope="col" className="p-4">
                                            Tittle
                                        </th>
                                        <th scope="col" className="p-4">
                                            Slug
                                        </th>
                                        <th scope="col" className="p-4">
                                            Category
                                        </th>
                                        <th scope="col" className="p-4">
                                            Video URL
                                        </th>
                                        <th scope="col" className="p-4">
                                            Rating
                                        </th>
                                        <th scope="col" className="p-4">
                                            Featured
                                        </th>
                                        <th scope="col" className="p-4">
                                            Created At
                                        </th>
                                        <th scope="col" className="p-4">
                                            Last Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
