import { UniqueIdentifier } from '@dnd-kit/core'

export interface IUser {
	id: string
	name: string
}

export interface ITimeCard {
	id: string | number | UniqueIdentifier
	date: string
	time: string
	userId: string
}

export interface InitialData {
	users: IUser[]
	cards: ITimeCard[]
}
