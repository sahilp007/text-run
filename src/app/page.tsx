'use client'

import {useRouter} from 'next/navigation'
import {FC} from 'react'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {createUser} from "@/lib/utils";

const Page: FC = () => {
	let roomIdInput = ''
	const router = useRouter()

	const createRoom = async () => {
		const res = await fetch('/api/rooms/create')
		const roomId: string = await res.text()
		router.push(`/room/${roomId}`)
		await createUser();
	}

	const joinRoom = async (roomId: string) => {
        roomId && router.push(`/room/${roomId}`)
		await createUser();
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
			<div className="bg-white rounded-lg shadow-lg w-1/2 p-8">
				<h2 className="text-2xl font-bold mb-6 text-center">Join or Create a Room</h2>
				<Button variant='ghost' className="mb-4 w-full bg-blue-500 text-white shadcn" onClick={createRoom}>Create
					room</Button>
				<div className='flex gap-2'>
					<Input
						type='text'
						onChange={({target}) => (roomIdInput = target.value)}
						className='border border-zinc-300 p-2 rounded w-full max-w-sm'
					/>
					<Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800"
					        onClick={() => joinRoom(roomIdInput)}>Join room</Button>
				</div>
			</div>
		</div>
	)
}
// TODO: BEAUTIFY THIS PAGE
// TODO: ADD A LOADING SPINNER WHEN CREATING A ROOM
// TODO: ADD A LOADING SPINNER WHEN LOADING API DATA AS SKELETON LOADING
// TODO: REMOVE SELECT FROM THE APP                                                                             // DONE
// TODO: DON'T SHOW THE NOTIFICATION OF SEARCH FOR THE SENDER                            // DONE
// TODO: ADD THEMES TO THE APP
// TODO: CHANGE SCROLLBAR TO A CUSTOM ONE
// TODO: ADD POPUP WHEN A POKEMON IMAGE IS CLICKED TO SHOW A BIGGER IMAGE
// TODO: ADD SORT TO COLS                                                                                                // DONE
export default Page
