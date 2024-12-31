import PropTypes from "prop-types";

const SubscriptionDetail = function SubscriptionDetail({
    name,
    isPremium,
    remainingDays,
    activeDays,
}) {
    const remainingDaysPercentage = remainingDays / activeDays;
    const remainingDaysWidth = () => {
        if (remainingDaysPercentage < 0.25) {
            return "w-3/12";
        } else if (remainingDaysPercentage < 0.5) {
            return "w-6/12";
        } else if (remainingDaysPercentage < 0.75) {
            return "w-9/12";
        } else {
            return "w-full";
        }
    };

    return (
        <>
            {/* <!-- Subscription details --> */}
            {isPremium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-black rounded-[25px]">
                        <img src="/icons/ic_star-rounded.svg" alt="" />
                        <div className="text-white text-lg font-semibold mt-4 mb-8">
                            {name}
                        </div>
                        <div className="text-white text-sm mb-2">
                            {remainingDays} of {activeDays} days
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#333333]">
                            <div
                                className={`rounded-full h-full ${remainingDaysWidth()} bg-alerange`}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {!isPremium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-white rounded-[25px] outline outline-1 outline-[#f1f1f1]">
                        <div className="text-black text-lg font-semibold mb-8">
                            Basic
                        </div>
                        <div className="text-black text-sm mb-2">
                            {remainingDays} of {activeDays} days
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#f1f1f1]">
                            <div
                                className={`rounded-full h-full ${remainingDaysWidth()} bg-alerange`}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            {/* <!-- ./Subscription details --> */}
        </>
    );
};

SubscriptionDetail.propTypes = {
    isPremium: PropTypes.bool.isRequired,
    remainingDays: PropTypes.number,
    activeDays: PropTypes.number,
};

export default SubscriptionDetail;