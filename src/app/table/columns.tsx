"use client"

import {ColumnDef} from "@tanstack/react-table"
import Image from "next/image";

export type Pokimons = {
	id: string
	name: string
	url: string
	exp: number
}
const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export const columns: ColumnDef<Pokimons>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-left">#</div>,
		cell: ({row}) => {
			return <div className="text-left font-medium">{row.original.id}</div>
		},
	},
	{
		accessorKey: "imageUrl",
		header: () => <div className="text-left">Image</div>,
		cell: ({row}) => {
			return <Image src={row.original.url} width={50} height={50} alt="pokemon" className="w-10 h-10"/>
		},
	},
	{
		accessorKey: "name",
		header: () => <div className="text-left">Name</div>,
		cell: ({row}) => {
			return <div className="text-left">{capitalize(row.original.name)}</div>
		},
	},
	{
		accessorKey: "exp",
		header: () => <div className="text-left">Base Experience</div>,
		cell: ({row}) => {
			return <div className="text-left">{row.original.exp}</div>
		},
	},
]