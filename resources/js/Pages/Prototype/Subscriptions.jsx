import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Subscriptions() {
    return (
        <Authenticated>
            <Head title="Subscriptions" />
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
                    {/* Basic */}
                    <SubscriptionCard subscription="basic" name={"Biasa"} price={50000} durationInMonths={1} features={[
                        "HD Quality", "Unlimited Movies", "No Ads", "Offline Download"
                    ]} />

                    {/* For Greatest */}
                    <SubscriptionCard subscription="premium" name={"Premium"} price={200000} durationInMonths={3} features={[
                        "4K Quality", "Unlimited Movies", "No Ads", "Offline Download", "Watch on 4 devices"
                    ]} />
                </div>
                {/* /Pricing Card */}
            </div>
        </Authenticated>
    );
}
