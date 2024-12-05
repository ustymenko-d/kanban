import { ITimeCard, IUser } from '@/const/const.interfaces'

type Theme = 'light' | 'dark'

export interface AppState {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void

	modalOpen: boolean
	toggleModalOpen: () => void

	users: IUser[]
	setUsers: (users: IUser[]) => void

	cards: ITimeCard[]
	addCard: (card: ITimeCard) => void
	editCard: (updatedCard: ITimeCard) => void
	deleteCard: (cardId: string) => void

	editCardData: ITimeCard | null
	setEditCardData: (card: ITimeCard | null) => void
	clearEditCardData: () => void
}
