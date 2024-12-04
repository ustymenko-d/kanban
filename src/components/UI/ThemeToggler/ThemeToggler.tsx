'use client'

import { FC } from 'react'
import { useAppStore } from '@/store/store'

const ThemeToggler: FC = () => {
	const { theme, toggleTheme } = useAppStore()

	return (
		<button
			onClick={toggleTheme}
			className='p-2 bg-gray-200 dark:bg-gray-800 rounded'>
			{theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
		</button>
	)
}

export default ThemeToggler
