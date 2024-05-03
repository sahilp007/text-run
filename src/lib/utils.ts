import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {db} from "@/lib/db";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const createUser = async () => {
	const res = await axios.post('/api/user');
	localStorage.setItem('userId', res.data);
	debugger;
}