import { db } from '@/lib/db'

export async function POST() {
	const createdUser = await db.user.create({
		data: {},
	})

	return new Response(createdUser.id)
}
