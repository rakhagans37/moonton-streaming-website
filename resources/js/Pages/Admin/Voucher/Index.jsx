import Alert from "@/Components/Alert";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/Authenticated/Index";

export default function Index({ auth, vouchers, flashMessage }) {
    return (
        <Authenticated auth={auth}>
            {flashMessage?.message && (
                <Alert
                    title={flashMessage.type}
                    message={flashMessage.message}
                    type={flashMessage.type == "failed" ? "danger" : "success"}
                />
            )}
            <Table
                column={[
                    "ID",
                    "Code",
                    "Name",
                    "Type",
                    "Value",
                    "Subscription Plan",
                    "Limit",
                    "Expired At",
                ]}
                dataLength={vouchers.length}
            >
                {vouchers.map((voucher) => (
                    <tr
                        className="border-b hover:bg-gray-100 font-semibold text-black"
                        key={voucher.id}
                    >
                        <td className="p-4 w-4">{voucher.id}</td>
                        <td className="p-4 w-4">{voucher.code}</td>
                        <td className="p-4 w-4">{voucher.name}</td>
                        <td className="p-4 w-4">{voucher.type}</td>
                        <td className="p-4 w-4">
                            {voucher.type == "amount"
                                ? voucher.value.toLocaleString()
                                : voucher.type == "percent"
                                ? voucher.value + "%"
                                : "-"}
                        </td>
                        <td className="p-4 w-4">
                            {voucher.subscriptions_plan?.name ?? "-"}
                        </td>
                        <td className="p-4 w-4">{voucher.limit}</td>
                        <td className="p-4 w-4">
                            {new Date(voucher.expired_at).toLocaleDateString(
                                "id-ID"
                            )}
                        </td>
                    </tr>
                ))}
            </Table>
        </Authenticated>
    );
}
