import { InitialData } from './const.interfaces'

export const initialData: InitialData = {
	users: [
		{ id: 'user1', name: 'Alexandre Timmermans' },
		{ id: 'user2', name: 'Eloise Leroy' },
	],
	cards: [
		{
			id: '1',
			time: '7:00-15:00',
			date: '2024-12-02',
			userId: 'user1',
		},
		{
			id: '2',
			time: '18:00-1:00',
			date: '2024-12-02',
			userId: 'user1',
		},
		{
			id: '3',
			time: '8:00-17:00',
			date: '2024-12-03',
			userId: 'user2',
		},
		{
			id: '4',
			time: '8:00-17:00',
			date: '2024-12-13',
			userId: 'user2',
		},
	],
}
