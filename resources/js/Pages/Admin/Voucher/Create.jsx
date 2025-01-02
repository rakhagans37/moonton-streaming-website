import Button from "@/Components/Button";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, subscriptionPlans }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        type: "percent",
        value: "",
        limit: "",
        expired_at: "",
        subscriptions_plans_id: "",
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.voucher.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Create Voucher" />

            <div>
                <h1 className="text-xl">Insert a new voucher</h1>
                <hr className="mb-4" />

                <div className="grid grid-cols-3 gap-8">
                    <form className="col-span-2 flex flex-col gap-2">
                        <div>
                            <InputLabel htmlFor="name">Voucher Name</InputLabel>
                            <TextInput
                                id="name"
                                type="text"
                                className="mb-4"
                                variant="primary-outline"
                                placeholder="Enter voucher name here"
                                isError={errors.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="type">Voucher Type</InputLabel>
                            <Select
                                id="type"
                                className="mb-4"
                                variant="primary-outline"
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                            >
                                <option value="percent">
                                    Discount Percentage
                                </option>
                                <option value="redeem">Redeem</option>
                                <option value="amount">Fixed Amount</option>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                        <div>
                            {data.type !== "redeem" && (
                                <>
                                    <InputLabel htmlFor="code">
                                        Voucher Code
                                    </InputLabel>
                                    <TextInput
                                        id="code"
                                        type="text"
                                        className="mb-4"
                                        variant="primary-outline"
                                        placeholder="Enter voucher name here"
                                        isError={errors.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.code} />
                                </>
                            )}
                        </div>
                        <div>
                            <InputLabel htmlFor="value">
                                Voucher Value
                            </InputLabel>
                            {data.type === "percent" ||
                            data.type === "amount" ? (
                                <>
                                    <TextInput
                                        id="value"
                                        type="number"
                                        className="mb-4"
                                        variant="primary-outline"
                                        placeholder="Enter voucher usage value here"
                                        isError={errors.value}
                                        onChange={(e) =>
                                            setData("value", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.value} />
                                </>
                            ) : (
                                <>
                                    <Select
                                        id="subscriptions_plans_id"
                                        className="mb-4"
                                        variant="primary-outline"
                                        onChange={(e) =>
                                            setData(
                                                "subscriptions_plans_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>
                                            Select Subscription Plan
                                        </option>
                                        {subscriptionPlans.map((plan) => (
                                            <option
                                                key={plan.id}
                                                value={plan.id}
                                            >
                                                {plan.name} - {plan.price}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.subscriptions_plans_id}
                                    />
                                </>
                            )}
                        </div>
                        <div>
                            {data.type !== "redeem" && (
                                <>
                                    <InputLabel htmlFor="limit">
                                        Voucher Limit
                                    </InputLabel>
                                    <TextInput
                                        id="limit"
                                        type="number"
                                        className="mb-4"
                                        variant="primary-outline"
                                        placeholder="Enter voucher usage limit here"
                                        isError={errors.limit}
                                        onChange={(e) =>
                                            setData("limit", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.limit} />
                                </>
                            )}
                        </div>
                        <div>
                            <InputLabel htmlFor="expired_at">
                                Expired At
                            </InputLabel>
                            <TextInput
                                id="expired_at"
                                type="date"
                                className="mb-4"
                                variant="primary-outline"
                                placeholder="Enter voucher expired date here"
                                isError={errors.expired_at}
                                onChange={(e) =>
                                    setData("expired_at", e.target.value)
                                }
                            />
                            <InputError message={errors.expired_at} />
                        </div>
                    </form>

                    <div className="col-span-1 border-gray-[#F1F1F1] border-l p-8 h-screen">
                        <Button onClick={submit}>Insert New Voucher</Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
