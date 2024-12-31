import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, flashMessage }) {
    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Movies" />

                {flashMessage?.message && (
                    <Alert
                        title={flashMessage.type}
                        message={flashMessage.message}
                        type={flashMessage.type == "failed" ? "danger" : "success"}
                    />
                )}

                <Link href={route("admin.dashboard.movie.create")}>
                    <Button type="button" className="w-40 mb-8">
                        Insert New Movie
                    </Button>
                </Link>
            </Authenticated>
        </>
    );
}
