type Theme = 'light' | 'dark'

export interface AppState {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void

	modalOpen: boolean
	toggleModalOpen: () => void
}
