import { v4 as uuidv4 } from 'uuid'
import { InitialData } from './const.interfaces'

export const initialData: InitialData = {
	users: [
		{ id: uuidv4(), name: 'Alexandre Timmermans' },
		{ id: uuidv4(), name: 'Eloise Leroy' },
		{ id: uuidv4(), name: 'John Doe' },
	],
	cards: [
		{
			id: uuidv4(),
			time: '7:00-15:00',
			date: '2024-12-02',
			userId: uuidv4(),
		},
		{
			id: uuidv4(),
			time: '18:00-1:00',
			date: '2024-12-02',
			userId: uuidv4(),
		},
		{
			id: uuidv4(),
			time: '8:00-17:00',
			date: '2024-12-03',
			userId: uuidv4(),
		},
		{
			id: uuidv4(),
			time: '8:00-17:00',
			date: '2024-12-13',
			userId: uuidv4(),
		},
	],
}
