import BrowseMovie from "@/Components/BrowseMovie";
import FeaturedMovie from "@/Components/FeaturedMovie";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";

export default function Dashboard() {
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

    return (
        <>
            <Head title="Dashboard">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <Authenticated>
                {/* Featured Movie */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Featured Movies
                    </div>
                    <Flickity
                        className="gap-[30px] __scroll-selector"
                        options={flickityOptions}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <FeaturedMovie
                                key={i}
                                slug={"the-batman-in-love"}
                                title={"The Batman In Love"}
                                category={["Action", "Romance"]}
                                rating={4.5}
                                thumbnail={"/images/featured-1.png"}
                            />
                        ))}
                    </Flickity>
                </div>

                {/* Browse */}
                <div className="mt-[50px]">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    <Flickity options={flickityOptions}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <BrowseMovie key={i} 
                                title={"Meong Golden"}
                                slug={"meong-golden"}
                                category={["Horror", "Romance"]}
                                thumbnail={"/images/browse-1.png"}
                            />
                        ))}
                    </Flickity>
                </div>
            </Authenticated>
        </>
    );
}
