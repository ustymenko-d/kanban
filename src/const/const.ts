import { v4 as uuidv4 } from 'uuid'
import { InitialData, ITimeCard, IUser } from './const.interfaces'

const generateUsers = (): IUser[] => [
	{
		id: uuidv4(),
		name: 'Alexandre Timmermans',
		role: 'Employer',
	},
	{
		id: uuidv4(),
		name: 'Eloise Leroy',
		role: 'Student',
	},
	{
		id: uuidv4(),
		name: 'Samuel Goossens',
		role: 'Employer',
	},
	{
		id: uuidv4(),
		name: 'Camille Delangre',
		role: 'Employer',
	},
	{
		id: uuidv4(),
		name: 'Camille Evrard',
		role: 'Student',
	},
	{
		id: uuidv4(),
		name: 'Elena Dimou',
		role: 'Employer',
	},
]

const users = generateUsers()

const generateCards = (): ITimeCard[] => [
	{
		id: uuidv4(),
		time: '07:00-15:00',
		date: '2024-12-02',
		duration: '8h',
		status: 'approve',
		price: 75,
		note: 'Lorem',
		tag: 'Caisse',
		userId: users[0].id,
	},
	{
		id: uuidv4(),
		time: '18:00-01:30',
		date: '2024-12-02',
		duration: '7h30',
		status: 'pending',
		note: 'Lorem',
		price: 80,
		tag: 'Camion',
		userId: users[1].id,
	},
	{
		id: uuidv4(),
		time: '08:20-11:00',
		date: '2024-12-13',
		duration: '2h40',
		status: 'reject',
		note: 'Some note',
		price: 50,
		tag: 'Fermeture',
		userId: users[0].id,
	},
	{
		id: uuidv4(),
		time: '07:00-15:00',
		date: '2024-12-02',
		duration: '8h',
		status: 'approve',
		price: 75,
		tag: 'Caisse',
		userId: users[4].id,
	},
	{
		id: uuidv4(),
		time: '18:00-01:30',
		date: '2024-12-02',
		duration: '7h30',
		status: 'pending',
		note: 'Lorem',
		price: 82,
		userId: users[1].id,
	},
	{
		id: uuidv4(),
		time: '08:20-11:00',
		date: '2024-12-13',
		duration: '2h40',
		status: 'reject',
		note: 'Some note',
		price: 67,
		userId: users[2].id,
	},
]

const cards = generateCards()

export const initialData: InitialData = {
	users,
	cards,
}
