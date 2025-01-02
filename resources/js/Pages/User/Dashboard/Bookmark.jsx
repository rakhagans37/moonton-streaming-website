import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Bookmark({auth, bookmarks}){
    console.log(bookmarks);
    return(
        <Authenticated auth={auth}>
            <Head title="Bookmark" />
        </Authenticated>
    )
}