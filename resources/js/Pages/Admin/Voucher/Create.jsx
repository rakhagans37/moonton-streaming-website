import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Create({ auth }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Create Voucher" />

            <div>
                <h1 className="text-xl">Insert a new voucher</h1>
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
                            />
                            <InputError  />
                        </div>
                    </form>

                    <div className="col-span-1 border-gray-[#F1F1F1] border-l p-8 h-screen">
                        <Button>
                            Insert New Voucher
                        </Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
