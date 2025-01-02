import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import Heading from "@/Components/Typography/Heading";
import Subheading from "@/Components/Typography/Subheading";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/react";

export default function SubscriptionRedeem({ auth, flashMessage }) {
    const { data, setData, errors, processing, post } = useForm({
        voucher: "",
    });

    const onRedeem = () => {
        post(
            route("user.dashboard.voucher.redeem", {
                voucher: data.voucher,
            }),
        );
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Redeem" />

            {flashMessage?.message && (
                <Alert
                    title={flashMessage.type}
                    message={flashMessage.message}
                    type={flashMessage.type == "failed" ? "danger" : "success"}
                />
            )}
            
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
                    onChange={(e) => setData("voucher", e.target.value)}
                />
                <Button
                    className="col-span-1"
                    onClick={onRedeem}
                    variant="primary"
                >
                    Redeem
                </Button>
            </div>

            <InputError message={errors.voucher} className="col-span-4" />
        </Authenticated>
    );
}
