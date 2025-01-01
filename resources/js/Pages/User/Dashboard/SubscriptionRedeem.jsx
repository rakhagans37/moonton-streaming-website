import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import Heading from "@/Components/Typography/Heading";
import Subheading from "@/Components/Typography/Subheading";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function SubscriptionRedeem({ auth }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Redeem" />

            <div className="mb-8">
                <Heading
                    title="Redeem Subscription"
                    subtitle="Redeem your subscription here."
                    className="mb-8"
                >
                    Redeem <span className="text-alerange">Your</span> Voucher.
                </Heading>

                <Subheading>
                    Each voucher code can only be redeemed{" "}
                    <b className="text-alerange"> once.</b>
                </Subheading>
            </div>

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
        </Authenticated>
    );
}
