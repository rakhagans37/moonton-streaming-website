import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
export default function MovieTable({ movies }) {
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
                                    <span> {movies.length}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <InputLabel
                                        htmlFor="simple-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </InputLabel>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                />
                                            </svg>
                                        </div>
                                        <TextInput
                                            type="text"
                                            id="simple-search"
                                            placeholder="Search for products"
                                            className="block w-full pl-10 p-2"
                                            variant="primary-outline"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link
                                    href={route("admin.dashboard.movie.create")}
                                >
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="px-4"
                                    >
                                        Insert New Movie
                                    </Button>
                                </Link>
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
                                    {movies.map((movie) => (
                                        <tr
                                            className="border-b hover:bg-gray-100"
                                            key={movie.id}
                                        >
                                            <td className="p-4 w-4">
                                                <img
                                                    src={
                                                        "/storage/" +
                                                        movie.thumbnail
                                                    }
                                                    alt=""
                                                />
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                <div className="flex items-center mr-3">
                                                    {movie.title}
                                                </div>
                                            </th>
                                            <td className="px-4 py-3">
                                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                                                    {movie.slug}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {JSON.parse(
                                                        movie.category
                                                    ).join(", ")}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {movie.video_url}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {movie.rating}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-gray-500 ml-1">
                                                        {movie.is_featured
                                                            ? "Yes"
                                                            : "No"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {new Date(
                                                    movie.created_at
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {new Date(
                                                    movie.updated_at
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center space-x-4">
                                                    <Link
                                                        href={route(
                                                            "admin.dashboard.movie.edit",
                                                            movie.id
                                                        )}
                                                    >
                                                        <Button
                                                            type="button"
                                                            variant="warning"
                                                            className="p-2 w-32 text-white"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "admin.dashboard.movie.destroy",
                                                            movie.id
                                                        )}
                                                    >
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            className="p-2 w-32 text-white"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
