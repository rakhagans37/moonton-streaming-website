import Button from "@/Components/Button";
import FeaturedMovie from "@/Components/FeaturedMovie";
import Heading from "@/Components/Typography/Heading";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link, router } from "@inertiajs/react";
import Flickity from "react-flickity-component";

export default function Bookmark({ auth, bookmarks }) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
        initialIndex: 0,
    };

    const onClickBookmark = (movies_id, pre) => {
        if (pre === false) {
            router.post(route("user.dashboard.bookmark.store", movies_id));
        } else {
            router.delete(route("user.dashboard.bookmark.destroy", movies_id));
        }
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Bookmark">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <>
                {bookmarks !== null ? (
                    <Flickity
                        className="gap-[30px] __scroll-selector"
                        options={flickityOptions}
                    >
                        {bookmarks.map((bookmark) => (
                            <FeaturedMovie
                                key={bookmark.id}
                                movieId={bookmark.id}
                                title={bookmark.title}
                                slug={bookmark.slug}
                                category={JSON.parse(bookmark.category)}
                                thumbnail={bookmark.thumbnail}
                                rating={bookmark.rating}
                                isBookmarked={true}
                                onClickBookmark={() =>
                                    onClickBookmark(bookmark.id, true)
                                }
                            />
                        ))}
                    </Flickity>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(70vh-64px)]">
                        <img src="/images/oops.png" alt="" className="w-1/4" />
                        <div className="mb-4">
                            <h1 className="text-2xl text-black text-center font-bold mt-4">
                                You don't have any bookmarked movies
                            </h1>
                            <p>
                                Bookmark your favorite movies to watch them later.
                            </p>
                        </div>
                        <Link href={route("user.dashboard.index")}>
                            <Button className="p-5 rounded-3xl">
                                Explore Movies
                            </Button>
                        </Link>
                    </div>
                )}
            </>
        </Authenticated>
    );
}
