import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel
} from "@tanstack/react-table";

export default function Paginasi() {
    const [isLoading, setIsLoading] = useState(false);
    const [mahasiswa, setmahasiswa] = useState([]);
    const [meta, setMeta] = useState([]);
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

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        columns,
        data: mahasiswa,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
          pagination,
        },
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
      })

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
                setmahasiswa(data.data)
                setMeta(data.meta)
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            {mahasiswa.length} <button type="button" onClick={() => table.nextPage()}>Next</button>
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
            
{/* tombol paginasi */}
<div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

        </div>

    );
}
