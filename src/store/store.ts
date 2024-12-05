import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AppState } from './store.interfaces'
import { initialData } from '@/const/const'
import { v4 as uuidv4 } from 'uuid'

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				users: initialData.users,
				setUsers: (users) => set({ users }),

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

				editCardData: null,
				setEditCardData: (card) => set({ editCardData: card }),
				clearEditCardData: () => set({ editCardData: null }),

				theme: 'light',
				setTheme: (theme) => set({ theme }),
				toggleTheme: () =>
					set((state) => ({
						theme: state.theme === 'light' ? 'dark' : 'light',
					})),

				modalOpen: false,
				toggleModalOpen: () =>
					set((state) => ({ modalOpen: !state.modalOpen })),
			}),
			{
				name: 'appStateStorage',
			}
		)
	)
)
