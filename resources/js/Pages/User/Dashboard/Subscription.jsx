import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Alert from "@/Components/Alert";

export default function Subscription({ auth, subscriptionsPlan }) {
    const onSelectSubscription = (id) => {
        Inertia.post(
            route("user.dashboard.subscriptions.userSubscribe", {
                subscriptionPlan: id,
            })
        );
    };

    const { props } = usePage();
    const { flash } = props;

    return (
        <Authenticated auth={auth}>
            <Head title="Subscriptions" />

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
