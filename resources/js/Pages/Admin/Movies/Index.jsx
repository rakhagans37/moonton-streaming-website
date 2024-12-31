import Alert from "@/Components/Alert";
import MovieTable from "@/Components/MovieTable";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Index({ auth, flashMessage, movies }) {
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

                <MovieTable movies={movies} />
            </Authenticated>
        </>
    );
}
