import Alert from "@/Components/Alert";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";
import Table from "@/Components/Table";

export default function Index({ auth, flashMessage, movies }) {
    const [showModal, setShowModal] = useState(false);
    const [movieId, setMovieId] = useState(null);
    const { delete: destroy, put } = useForm();

    const closeModal = () => setShowModal(false);

    function deleteMovie(id) {
        return () => {
            destroy(route("admin.dashboard.movie.destroy", id), {
                onSuccess: () => {
                    closeModal();
                },
            });
        };
    }

    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Movies" />

                {flashMessage?.message && (
                    <Alert
                        title={flashMessage.type}
                        message={flashMessage.message}
                        type={
                            flashMessage.type == "failed" ? "danger" : "success"
                        }
                    />
                )}

                <Modal show={showModal}>
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="popup-modal"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">
                                Are you sure you want to delete this product?
                            </h3>
                            <button
                                onClick={deleteMovie(movieId)}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={closeModal}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                <div className="flex flex-row justify-between mb-5 items-end">
                    <h1 className="text-2xl font-semibold text-gray-900 self-end">
                        Detail Movies
                    </h1>
                    <Link href={route("admin.dashboard.movie.create")}>
                        <Button
                            type="button"
                            variant="primary"
                            className="w-44"
                        >
                            Insert New Movie
                        </Button>
                    </Link>
                </div>

                <hr className="mb-4" />

                <Table
                    column={[
                        "Thumbnail",
                        "Title",
                        "Slug",
                        "Category",
                        "Video URL",
                        "Rating",
                        "Featured",
                        "Created At",
                        "Last Update",
                    ]}
                    dataLength={movies.length}
                >
                    {movies.map((movie) => (
                        <tr
                            className="border-b hover:bg-gray-100"
                            key={movie.id}
                        >
                            <td className="p-4 w-4">
                                <img
                                    src={"/storage/" + movie.thumbnail}
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
                                    {JSON.parse(movie.category).join(", ")}
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
                                        {movie.is_featured ? "Yes" : "No"}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {new Date(movie.created_at).toLocaleString(
                                    "id-ID"
                                )}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {new Date(movie.updated_at).toLocaleString(
                                    "id-ID"
                                )}
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
                                            className="p-2 w-24 text-white"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    {movie.deleted_at ? (
                                        <Button
                                            type="button"
                                            variant="good"
                                            className="p-2 w-24 text-white"
                                            onClick={() => {
                                                put(
                                                    route(
                                                        "admin.dashboard.movie.restore",
                                                        movie.id
                                                    )
                                                );
                                            }}
                                        >
                                            Restore
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="danger"
                                            className="p-2 w-24 text-white"
                                            onClick={() => {
                                                setShowModal(true);
                                                setMovieId(movie.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            </Authenticated>
        </>
    );
}
