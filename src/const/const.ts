import { v4 as uuidv4 } from 'uuid'
import { InitialData } from './const.interfaces'

const firstUserId = uuidv4()
const secondUserId = uuidv4()
const thirdUserId = uuidv4()

const firstTaskId = uuidv4()
const secondTaskId = uuidv4()
const thirdTaskId = uuidv4()

export const initialData: InitialData = {
	users: [
		{ id: firstUserId, name: 'Alexandre Timmermans' },
		{ id: secondUserId, name: 'Eloise Leroy' },
		{ id: thirdUserId, name: 'John Doe' },
	],
	cards: [
		{
			id: firstTaskId,
			time: '7:00-15:00',
			date: '2024-12-02',
			userId: firstUserId,
		},
		{
			id: secondTaskId,
			time: '18:00-1:00',
			date: '2024-12-02',
			userId: secondUserId,
		},
		{
			id: thirdTaskId,
			time: '8:00-17:00',
			date: '2024-12-13',
			userId: firstUserId,
		},
	],
}
