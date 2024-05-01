"use client"

import {ColumnDef} from "@tanstack/react-table"
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {Button} from "@/components/ui/button";

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
		// header: () => <div className="text-left">Name</div>,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
					className="text-left"
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({row}) => {
			return <div className="text-left px-5">{capitalize(row.original.name)}</div>
		},
	},
	{
		accessorKey: "exp",
		// header: () => <div className="text-left">Base Experience</div>,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
					className="text-left"
				>
					Base Experience
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({row}) => {
			return <div className="text-left px-5">{row.original.exp}</div>
		},
	},
]