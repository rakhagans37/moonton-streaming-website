import Table from "@/Components/Table";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";

export default function Transaction({ auth }) {
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
                    <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            #123
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            Rp. 100.000
                        </td>
                        <td className="px-4 py-3 font-medium text-green-900 whitespace-nowrap">
                            Success
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            2021-09-27
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            2021-09-27
                        </td>
                    </tr>
                </Table>
            </>
        </Authenticated>
    );
}
