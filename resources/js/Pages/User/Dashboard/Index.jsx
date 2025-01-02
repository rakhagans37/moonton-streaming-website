import Alert from "@/Components/Alert";
import BrowseMovie from "@/Components/BrowseMovie";
import FeaturedMovie from "@/Components/FeaturedMovie";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, usePage } from "@inertiajs/react";
import Flickity from "react-flickity-component";

export default function Dashboard({ auth, movies, featuredMovies }) {
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
    const { props } = usePage();
    const { flash } = props;

    return (
        <>
            <Head title="Dashboard">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <Authenticated auth={auth}>
                {/* Alert */}
                {flash.error && (
                    <Alert title={"Info"} message={flash.error} />
                )}
                

                {/* Featured Movie */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Featured Movies
                    </div>
                    {featuredMovies && (
                        <Flickity
                            className="gap-[30px] __scroll-selector"
                            options={flickityOptions}
                        >
                            {featuredMovies.map((featuredMovie) => (
                                <FeaturedMovie
                                    key={featuredMovie.id}
                                    movieId={featuredMovie.id}
                                    title={featuredMovie.title}
                                    slug={featuredMovie.slug}
                                    category={JSON.parse(featuredMovie.category)}
                                    thumbnail={featuredMovie.thumbnail}
                                    rating={featuredMovie.rating}
                                    isBookmarked={false}
                                />
                            ))}
                        </Flickity>
                    )}
                </div>

                {/* Browse */}
                <div className="mt-[50px]">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    {movies && (
                        <Flickity options={flickityOptions}>
                            {movies.map((movie) => (
                                <BrowseMovie
                                    key={movie.id}
                                    title={movie.title}
                                    slug={movie.slug}
                                    category={JSON.parse(movie.category)}
                                    thumbnail={movie.thumbnail}
                                />
                            ))}
                        </Flickity>
                    )}
                </div>
            </Authenticated>
        </>
    );
}
