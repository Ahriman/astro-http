import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	console.log('Seed executed');

	await db.insert(Clients).values([
		{ name: "Kasim", age: 35, isActive: true },
		{ name: "Marcos", age: 25, isActive: false },
		{ name: "Carlos", age: 19, isActive: true },
		{ name: "Melissa", age: 66, isActive: false },
		{ name: "Emin", age: 54, isActive: false },
	]);
}
