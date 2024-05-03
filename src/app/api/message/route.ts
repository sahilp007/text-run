import {db} from '@/lib/db'
import {pusherServer} from '@/lib/pusher'

export async function POST(req: Request) {
	const {text, roomId, userId} = await req.json()
	await pusherServer.trigger(roomId, 'incoming-message', {text, userId})

	await db.message.create({
		data: {
			text,
			chatRoomId: roomId,
			userId,
		},
	})

	return new Response(JSON.stringify({success: true}))
}

export async function GET(params: { roomId: string }) {
	const {roomId} = params

	// get the last message in the chat for roomId
	const message = await db.message.findMany({
		where: {
			chatRoomId: roomId,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 1,
	})

	return new Response(JSON.stringify(message))
}
