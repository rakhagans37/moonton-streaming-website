import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const FeaturedMovie = function FeaturedMovie({
    slug,
    title,
    category,
    thumbnail,
    rating = 0,
    isBookmarked,
    onClickBookmark = () => { },
}) {
    return (
        <div className="absolute overflow-hidden group mr-[30px] w-max">
            <img
                src={"/storage/" + thumbnail}
                className="object-cover rounded-[30px] w-[520px] h-[340px]"
                alt=""
            />
            {/* <!-- rating --> */}
            <div className="rating absolute top-0 left-0">
                <div className="p-[30px] flex items-center gap-1">
                    <img src="/icons/ic_star.svg" alt="" />
                    <span className="text-sm font-medium text-white mt-1">
                        {rating.toFixed(1)}/5
                    </span>
                </div>
            </div>
            {/* <!-- bottom detail --> */}
            <div
                className="absolute bottom-0 h-[100px] left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px]
                            rounded-br-[28px] flex justify-between items-center px-7 h-[130px]"
            >
                <div>
                    <div className="font-medium text-[22px] text-white">
                        {title}
                    </div>
                    <p className="mb-0 text-white text-sm font-light">
                        {category.join(" • ")}
                    </p>
                </div>
                <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                    <img src="/icons/ic_play.svg" width="50" alt="" />
                </div>
            </div>
            <Link
                href={route("user.dashboard.movie.watch", slug)}
                className="inset-0 absolute z-50"
            ></Link>
            <button className="insert-0 absolute z-50 top-4 right-16 m-[10px]"
                onClick={(e) => {
                    e.preventDefault();
                    onClickBookmark();
                }}
            >
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`insert-0 absolute z-50 ${isBookmarked? "fill-red-600" : "fill-white"}`}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8498 2.50071C16.4808 2.50071 17.1108 2.58971 17.7098 2.79071C21.4008 3.99071 22.7308 8.04071 21.6198 11.5807C20.9898 13.3897 19.9598 15.0407 18.6108 16.3897C16.6798 18.2597 14.5608 19.9197 12.2798 21.3497L12.0298 21.5007L11.7698 21.3397C9.48077 19.9197 7.34977 18.2597 5.40077 16.3797C4.06077 15.0307 3.02977 13.3897 2.38977 11.5807C1.25977 8.04071 2.58977 3.99071 6.32077 2.76971C6.61077 2.66971 6.90977 2.59971 7.20977 2.56071H7.32977C7.61077 2.51971 7.88977 2.50071 8.16977 2.50071H8.27977C8.90977 2.51971 9.51977 2.62971 10.1108 2.83071H10.1698C10.2098 2.84971 10.2398 2.87071 10.2598 2.88971C10.4808 2.96071 10.6898 3.04071 10.8898 3.15071L11.2698 3.32071C11.3616 3.36968 11.4647 3.44451 11.5537 3.50918C11.6102 3.55015 11.661 3.58705 11.6998 3.61071C11.7161 3.62034 11.7327 3.63002 11.7494 3.63978C11.8351 3.68983 11.9245 3.74197 11.9998 3.79971C13.1108 2.95071 14.4598 2.49071 15.8498 2.50071ZM18.5098 9.70071C18.9198 9.68971 19.2698 9.36071 19.2998 8.93971V8.82071C19.3298 7.41971 18.4808 6.15071 17.1898 5.66071C16.7798 5.51971 16.3298 5.74071 16.1798 6.16071C16.0398 6.58071 16.2598 7.04071 16.6798 7.18971C17.3208 7.42971 17.7498 8.06071 17.7498 8.75971V8.79071C17.7308 9.01971 17.7998 9.24071 17.9398 9.41071C18.0798 9.58071 18.2898 9.67971 18.5098 9.70071Z"
                    />
                </svg>
            </button>
        </div>
    );
};

FeaturedMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
};

export default FeaturedMovie;
