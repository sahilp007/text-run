"use client"

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	roomId: string
}

export function DataTable<TData, TValue>({
	                                         roomId,
	                                         columns,
	                                         data,
                                         }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
		[]
	)
	const [input, setInput] = useState('');
	const sendSearch = async (text: string) => {
		await axios.post('/api/message', {text, roomId});
		// setInput('');
	}

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

	return (
		<div className='px-48 py-12 pb-12 '>
			<div className='rounded-xl bg-zinc-100 p-4'>
			<h2 className='text-2xl font-bold mb-4'>Pokemon</h2>
			<div className="flex items-center py-4 gap-4">
				<Input
					placeholder="Find Your Pokemon..."
					// value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					// onChange={(event: { target: { value: any; }; }) =>
					// 	table.getColumn("name")?.setFilterValue(event.target.value)
					// }
					type="text"
					onChange={({target}) => setInput(target.value)}
					value={input}
					className="max-w-sm"
					onKeyDownCapture={(e) => {
						if (e.key === "Enter") {
							table.getColumn("name")?.setFilterValue(input)
							input && sendSearch(input)
						}
					}}
				/>
				<Button variant='ghost' onClick={async () => {
					table.getColumn("name")?.setFilterValue(input)
					input && await sendSearch(input)
				}}>Search
				</Button>
			</div>
			<div className="rounded-md border">

				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className='p-1'
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className='p-0.5 pl-4'>

											{/*{image(row.original[1])}*/}
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
		</div>
	)
}
