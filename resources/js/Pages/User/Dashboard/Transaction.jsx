import Table from "@/Components/Table";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Transaction({ auth, transactions }) {
    console.log(transactions);
    return (
        <Authenticated auth={auth}>
            <Head title="Transaction" />
            <>
                <Table
                    column={[
                        "ID",
                        "Amount",
                        "Status",
                        "Created At",
                        "Updated At",
                    ]}
                >
                    {transactions.map((transaction, index) => (
                        <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={index}
                        >
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                #{transaction.id}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                Rp. {transaction.final_price.toLocaleString()}
                            </td>
                            <td
                                className={`px-4 py-3 font-medium ${
                                    transaction.payment_status === "success"
                                        ? "text-green-900"
                                        : "text-red-900"
                                } text-green-900 whitespace-nowrap`}
                            >
                                {transaction.payment_status}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {new Date(transaction.created_at).toLocaleString('id-ID')}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {new Date(transaction.updated_at).toLocaleString('id-ID')}
                            </td>
                        </tr>
                    ))}
                </Table>
            </>
        </Authenticated>
    );
}
