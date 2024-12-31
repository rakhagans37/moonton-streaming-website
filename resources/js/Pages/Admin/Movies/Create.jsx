import Button from "@/Components/Button";
import SimpleCategoryCard from "@/Components/CategoryCard";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        category: [],
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.dashboard.movie.store"));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setData("category", [...data.category, event.target.value]);
            event.target.value = "";
        }
    };

    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Create Movie" />

                <div>
                    <h1 className="text-xl">Insert a new movie</h1>
                    <hr className="mb-4" />

                    <div className="grid grid-cols-3 gap-8">
                        <form className="col-span-2 flex flex-col gap-2">
                            <div>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mb-4"
                                    variant="primary-outline"
                                    placeholder="Enter movie title"
                                    isError={errors.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="title">
                                    Category
                                </InputLabel>
                                <TextInput
                                    id="category"
                                    type="text"
                                    className={`mb-4 ${data.category.length >= 3 ? "hidden" : ""}`}
                                    variant="primary-outline"
                                    isError={errors.category}
                                    placeholder="Enter movie category, press enter to add more"
                                    onKeyDown={handleKeyDown}
                                    disabled={data.category.length >= 3}
                                />
                                <InputError message={errors.category} />

                                <div className="grid grid-cols-3 gap-4">
                                    {data.category.map((category, index) => (
                                        <SimpleCategoryCard
                                            key={index}
                                            category={category}
                                            onClick={() => {
                                                const newCategory =
                                                    data.category.filter(
                                                        (item, i) => i !== index
                                                    );
                                                setData(
                                                    "category",
                                                    newCategory
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="thumbnail">
                                    Thumbnail
                                </InputLabel>
                                <TextInput
                                    id="thumbnail"
                                    type="file"
                                    className="mb-4"
                                    variant="primary-outline"
                                    isError={errors.thumbnail}
                                    onChange={(e) =>
                                        setData("thumbnail", e.target.files[0])
                                    }
                                />
                                <InputError message={errors.thumbnail} />
                            </div>

                            <div>
                                <InputLabel htmlFor="video_url">
                                    Video URL
                                </InputLabel>
                                <TextInput
                                    id="video_url"
                                    type="text"
                                    className="mb-4"
                                    variant="primary-outline"
                                    placeholder="Enter movie video URL"
                                    isError={errors.video_url}
                                    onChange={(e) =>
                                        setData("video_url", e.target.value)
                                    }
                                />
                                <InputError message={errors.video_url} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="rating">
                                        Rating
                                    </InputLabel>
                                    <TextInput
                                        id="rating"
                                        type="number"
                                        className="mb-4"
                                        variant="primary-outline"
                                        placeholder="Enter movie rating"
                                        isError={errors.rating}
                                        onChange={(e) =>
                                            setData("rating", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.rating} />
                                </div>
                                <div className="flex flex-row gap-4 justify-center items-center">
                                    <Checkbox
                                        name="is_featured"
                                        label="Is Featured"
                                        onChange={(e) =>
                                            setData(
                                                "is_featured",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <p htmlFor="rating" className="mb-0">
                                        Is Featured
                                    </p>
                                </div>
                            </div>
                        </form>

                        <div className="col-span-1 border-gray-[#F1F1F1] border-l p-8 h-screen">
                            <Button processing={processing} onClick={submit}>
                                Insert New Movie
                            </Button>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
