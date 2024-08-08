import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

export default function TabelContoh() {
    const [isLoading, setIsLoading] = useState(false);
    const [mahasiswa, setmahasiswa] = useState([]);
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("id", {
            header: () => "NO",
            cell: (info) => parseInt(info.row.id) + 1,
        }),
        columnHelper.accessor("id", {
            header: "ID",
        }),
        columnHelper.accessor("nama", {
            header: "Nama",
        }),
        columnHelper.accessor("npm", {
            header: "NPM",
        }),
        columnHelper.accessor("fakultas", {
            header: "Fakultas",
        }),
        columnHelper.accessor("semester", {
            header: "Semester",
        }),
        columnHelper.accessor("created_at", {
            header: "Tgl Dibuat",
        }),
    ];

    const table = useReactTable({
        data: mahasiswa,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Inisialisasi
    useEffect(() => {
        getDataContoh();
    }, []);

    //Get Data Contoh
    const getDataContoh = () => {
        setIsLoading(true);
        axiosClient
            .get("/datacontoh")
            .then(({ data }) => {
                setIsLoading(false);
                setmahasiswa(data.data);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            id={header.id}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            {" "}
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                className="even:bg-blue-gray-50/50"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id} className="p-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
