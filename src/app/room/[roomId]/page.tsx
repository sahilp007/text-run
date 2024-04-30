import Messages from '@/components/Messages'
import {db} from '@/lib/db'
import {columns, Pokimons} from "@/app/table/columns";
import axios from "axios";
import {DataTable} from "@/app/table/data-table";

interface PageProps {
	params: {
		roomId: string
	}
}

async function getData(): Promise<Pokimons[]> {

	const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
	const pokemons = response.data.results;

	const data = await Promise.all(pokemons.map(async (pokemon: any, index: number) => {
		const pokemonDataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
		const pokemonData = await pokemonDataResponse.json();

		return {
			id: String(index + 1),
			name: pokemon.name,
			url: pokemonData.sprites.front_default,
			exp: pokemonData.base_experience,
		};
	}));

	return data;
}

const page = async ({params}: PageProps) => {
	const {roomId} = params;
	const data = await getData();
	const existingMessages = await db.message.findMany({
		where: {
			chatRoomId: roomId,
		},
	})

	const serializedMessages = existingMessages.map((message) => ({
		text: message.text,
		id: message.id,
	}))

	return (
		<div>
			<Messages roomId={roomId} initialMessages={serializedMessages}/>
			<DataTable columns={columns} data={data} roomId={roomId}/>
		</div>
	)
}

export default page
