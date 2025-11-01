"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowColor?: string // base color (hex)
    button?: boolean
    title: string
    width: number
}

function hexToRgba(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             rowColor = "#FF5C00", // default orange
                                             button,
                                             title,
                                             width
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={`w-[${width}px] rounded-xl border border-[#2a2a2a] bg-[url('/assets/images/Ellipse.svg')] p-4`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {button && (
                    <button className="text-sm text-gray-400 hover:text-white transition">
                        View all Transactions ↗
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="rounded-md border border-[#2a2a2a] overflow-hidden">
                <Table>
                    <TableHeader className="[&_tr]:border-0 [&_th]:border-0">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className="bg-transparent">
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        className="text-left px-6 py-3 text-white font-medium border-none"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                className="border-none"
                                style={{
                                    backgroundColor:
                                        row.index % 2 === 0
                                            ? hexToRgba(rowColor, 0.12)
                                            : "transparent", // ✅ 12% opacity
                                }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className="px-6 py-3 text-gray-100">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
