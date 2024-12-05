import { ITimeCard, IUser } from '@/const/const.interfaces'

export interface AppState {
	// Modal
	modalOpen: boolean
	toggleModalOpen: () => void

	deleteModalOpen: boolean
	deleteCardData: ITimeCard | null
	toggleDeleteModalOpen: (card?: ITimeCard | null) => void
	clearDeleteCardData: () => void

	// Users
	users: IUser[]
	setUsers: (users: IUser[]) => void

	// Cards
	cards: ITimeCard[]
	isCardEditing: boolean
	updateIsCardEditing: (isEditing: boolean) => void
	addCard: (card: ITimeCard) => void
	editCard: (updatedCard: ITimeCard) => void
	deleteCard: (cardId: string) => void

	// Edit card
	editCardData: ITimeCard | null
	setEditCardData: (card: ITimeCard | null) => void
	clearEditCardData: () => void
}
