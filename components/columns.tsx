"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Transaction = {
    id: string
    receiver: string
    country: string
    tokens: number
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
    },
    {
        accessorKey: "receiver",
        header: "Receiver",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "tokens",
        header: "Tokens Donated",
        cell: ({ row }) => <div className="text-right">{row.getValue("tokens")}</div>,
    },
]

export type Cause = {
    cause: string
    tokens: number
}

export const causeColumns: ColumnDef<Cause>[] = [
    {
        accessorKey: "cause",
        header: "Cause",
    },
    {
        accessorKey: "tokens",
        header: "Tokens Donated",
    },
]

export const beneficiaryColumns: ColumnDef<Cause>[] = [
    {
        accessorKey: "cause",
        header: "Beneficiary",
    },
    {
        accessorKey: "tokens",
        header: "Tokens Donated",
    },
]
