import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, router, usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import { Inertia } from "@inertiajs/inertia";

export default function Subscription({ auth, subscriptionsPlan, env }) {
    const onSelectSubscription = (id) => {
        router.post(
            route("user.dashboard.subscriptions.userSubscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                only: ["userSubscription"],
                onSuccess: ({ props }) => {
                    onSnapMidtrans(props.userSubscription);
                },
            }
        );
    };

    const onSnapMidtrans = (userSubscription) => {
        snap.pay(userSubscription.snap_token, {
            // Optional
            onSuccess: function (result) {
                Inertia.visit(route("user.dashboard.index"))
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
    const { props } = usePage();
    const { flash } = props;

    return (
        <Authenticated auth={auth}>
            <Head title="Subscriptions">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={env.MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>

            {/* Alert */}
            {flash.error && <Alert title={"Info"} message={flash.error} />}

            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* Pricing Card */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {subscriptionsPlan.map((subscriptionPlan) => (
                        <SubscriptionCard
                            key={subscriptionPlan.id}
                            isPremium={subscriptionPlan.name == "Premium"}
                            name={subscriptionPlan.name}
                            price={subscriptionPlan.price}
                            durationInMonths={
                                subscriptionPlan.duration_in_months
                            }
                            features={JSON.parse(subscriptionPlan.features)}
                            onSelectSubscription={() =>
                                onSelectSubscription(subscriptionPlan.id)
                            }
                        />
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}
