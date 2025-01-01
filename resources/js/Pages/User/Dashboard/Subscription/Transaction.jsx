import Button from "@/Components/Button";
import SimpleCard from "@/Components/SimpleCard";
import TextInput from "@/Components/TextInput";
import Heading from "@/Components/Typography/Heading";
import Subheading from "@/Components/Typography/Subheading";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Transaction({ auth }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Pay Subscription" />

            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden w-full p-4 flex flex-col gap-6">
                <Subheading>
                    <h2 className="text-black mb-4">
                        Transaction ID{" "}
                        <span className="font-semibold text-alerange">
                            #1234
                        </span>{" "}
                    </h2>
                    <div className="w-full grid grid-cols-5 gap-10">
                        <TextInput
                            name="voucher"
                            type="text"
                            variant="primary-outline"
                            placeholder="Enter Your Voucher Here"
                            className="col-span-4"
                        />
                        <Button
                            className="col-span-1"
                            onClick="#"
                            variant="primary"
                        >
                            Redeem
                        </Button>
                    </div>
                </Subheading>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-black text-lg">
                            Subscription Plan
                        </h2>

                        <p>Premium</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Payment Method</h2>

                        <p>Otomatis</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Normal Price</h2>

                        <p>Rp. 200.000</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Discount Amount</h2>

                        <p className="text-green-600">-Rp. 200.000</p>
                    </div>
                    <hr />
                </div>

                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Pay</h2>

                    <p className="font-bold text-2xl">Rp. 200.000</p>
                </div>

                <Button className="col-span-1" onClick="#" variant="primary">
                    Pay
                </Button>
            </div>
        </Authenticated>
    );
}
