import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AppState } from './store.interfaces'
import { initialData } from '@/const/const'
import { v4 as uuidv4 } from 'uuid'

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				// Modal
				modalOpen: false,
				toggleModalOpen: () =>
					set((state) => ({ modalOpen: !state.modalOpen })),

				deleteModalOpen: false,
				deleteCardData: null,
				toggleDeleteModalOpen: (card = null) =>
					set((state) => ({
						deleteModalOpen: !state.deleteModalOpen,
						deleteCardData: card,
					})),
				clearDeleteCardData: () => set({ deleteCardData: null }),

				// Users
				users: initialData.users,
				setUsers: (users) => set({ users }),

				// Cards
				cards: initialData.cards,
				addCard: (card) =>
					set((state) => ({
						cards: [
							...state.cards,
							{
								...card,
								id: uuidv4(),
							},
						],
					})),
				isCardEditing: false,
				updateIsCardEditing: (isEditing) => set({ isCardEditing: isEditing }),
				editCard: (updatedCard) =>
					set((state) => ({
						cards: state.cards.map((card) =>
							card.id === updatedCard.id ? updatedCard : card
						),
					})),
				deleteCard: (cardId) =>
					set((state) => ({
						cards: state.cards.filter((card) => card.id !== cardId),
					})),

				// Edit card
				editCardData: null,
				setEditCardData: (card) => set({ editCardData: card }),
				clearEditCardData: () => set({ editCardData: null }),
			}),
			{
				name: 'appStateStorage',
			}
		)
	)
)
