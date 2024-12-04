import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { AppState } from './store.interfaces'

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
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
