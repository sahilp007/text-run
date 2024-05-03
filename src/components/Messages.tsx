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
	const [lastMessageUserId, setLastMessageUserId] = useState<string>('')
	useEffect(() => {
		pusherClient.subscribe(roomId)
		pusherClient.bind('incoming-message', (text: any) => {
			let userId = text.userId;
			text = text.text;
			setIncomingMessages((prev) => [...prev, text])
			setLastMessageUserId(userId)
		})

		return () => {
			pusherClient.unsubscribe(roomId)
		}
	}, [])

	useEffect(() => {
		let userId = localStorage.getItem('userId');
		if (lastMessageUserId != userId){
			incomingMessages[incomingMessages.length - 1] &&
			toast(`Someone searched for ${incomingMessages[incomingMessages.length - 1]}`)
		}
	}, [incomingMessages])

	return (
		<div>
		</div>
	)
}

export default Messages
