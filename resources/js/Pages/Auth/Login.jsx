import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import InputError from "@/Components/InputError";

export default function Signin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Sign In" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Welcome Back
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                            <InputError
                                message={errors.email}
                                className="mt-2 border border-red-600 p-4 text-center rounded-md"
                            />
                        </div>
                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <InputLabel
                                        value="Email Address"
                                        htmlFor="email"
                                    />
                                    <TextInput
                                        type="email"
                                        name="email"
                                        placeholder="Your Email Address"
                                        autoComplete="username"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        value="Password"
                                        htmlFor="password"
                                    />
                                    <TextInput
                                        type="password"
                                        name="password"
                                        placeholder="Your Password"
                                        autoComplete="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button type="submit" variant="primary">
                                    <span className="text-base font-semibold">
                                        Start Watching
                                    </span>
                                </Button>

                                <Link href={route("register")}>
                                    <Button type="button" variant="secondary">
                                        <span className="text-base font-semibold">
                                            Create New Account
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
