import Button from "@/Components/Button";
import SimpleCard from "@/Components/SimpleCard";
import TextInput from "@/Components/TextInput";
import Heading from "@/Components/Typography/Heading";
import Subheading from "@/Components/Typography/Subheading";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, router, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import InputError from "@/Components/InputError";

export default function Transaction({
    auth,
    subscriptionPlan,
    transaction,
    env,
}) {
    const {data, setData, post, processing, errors} = useForm({
        voucher: "",
    });

    const onPay = () => {
        router.post(
            route("user.dashboard.subscriptions.pay", {
                transaction: transaction.id,
            }),
            {},
            {
                only: ["transaction"],
                onSuccess: ({ props }) => {
                    onSnapMidtrans(props.transaction);
                },
            }
        );
    };

    const onApplyVoucher = () => {
        post(
            route("user.dashboard.voucher.apply", {
                transaction: transaction.id,
            })
        );
    }

    const onSnapMidtrans = (transaction) => {
        snap.pay(transaction.snap_token, {
            // Optional
            onSuccess: function (result) {
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onPending: function (result) {
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onError: function (result) {
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onClose: function () {
                Inertia.visit(route("user.dashboard.index"));
            },
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Pay Subscription">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={env.MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>

            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden w-full p-4 flex flex-col gap-6">
                <div>
                    <h2 className="text-black mb-4">
                        Transaction ID{" "}
                        <span className="font-semibold text-alerange">
                            #{transaction.id}
                        </span>{" "}
                    </h2>
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
                            variant="primary"
                            onClick={onApplyVoucher}
                        >
                            Redeem
                        </Button>
                    </div>
                    {errors.voucher && (
                        <InputError message={errors.voucher}/>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-black text-lg">
                            Subscription Plan
                        </h2>

                        <p>{subscriptionPlan.name}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Payment Method</h2>

                        <p>Otomatis</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Normal Price</h2>

                        <p>Rp. {transaction.price}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg">Discount Amount</h2>

                        <p className="text-green-600">
                            -Rp. {transaction.discount}
                        </p>
                    </div>
                    <hr />
                </div>

                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Pay</h2>

                    <p className="font-bold text-2xl">
                        Rp. {transaction.final_price}
                    </p>
                </div>

                <Button className="col-span-1" onClick={onPay} variant="primary">
                    Pay
                </Button>
            </div>
        </Authenticated>
    );
}
