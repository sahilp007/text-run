'use client'
import {pusherClient} from '@/lib/pusher'
import {FC, useEffect, useState} from 'react'
import {toast} from "sonner";

interface MessagesProps {
	initialMessages: {
		text: string
		id: string
	}[]
	roomId: string
}

const Messages: FC<MessagesProps> = ({initialMessages, roomId}) => {
	const [incomingMessages, setIncomingMessages] = useState<string[]>([])

	useEffect(() => {
		pusherClient.subscribe(roomId)

		pusherClient.bind('incoming-message', (text: string) => {
			setIncomingMessages((prev) => [...prev, text])
		})

		return () => {
			pusherClient.unsubscribe(roomId)
		}
	}, [])

	useEffect(() => {
		incomingMessages[incomingMessages.length - 1] &&
		toast(`Someone searched for ${incomingMessages[incomingMessages.length - 1]}`)
	}, [incomingMessages])

	return (
		<div>
		</div>
	)
}

export default Messages
