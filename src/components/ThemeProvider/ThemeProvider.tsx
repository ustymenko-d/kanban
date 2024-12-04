'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useAppStore } from '@/store/store'

interface ThemeProviderProps {
	children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const { theme } = useAppStore()

	useEffect(() => {
		const root = document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme)
	}, [theme])

	return <>{children}</>
}

export default ThemeProvider
