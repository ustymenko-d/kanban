import { UniqueIdentifier } from '@dnd-kit/core'

export type TCardTag = 'Caisse' | 'Fermeture' | 'Camion'
export type TCardStatus = 'approve' | 'reject' | 'pending'

export interface IUser {
	id: string | UniqueIdentifier
	name: string
	role: string
}

export interface ITimeCard {
	id: string | number | UniqueIdentifier
	date: string
	time: string
	userId: string | UniqueIdentifier
	duration: string
	status: TCardStatus
	price?: number
	note?: string
	tag?: TCardTag
}

export interface InitialData {
	users: IUser[]
	cards: ITimeCard[]
}
