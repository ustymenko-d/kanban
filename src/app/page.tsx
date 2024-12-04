import { FC } from 'react'
import ThemeToggler from '@/components/UI/ThemeToggler/ThemeToggler'
import Dashboard from '@/components/Dashboard/Dashboard'

const Home: FC = () => {
	return (
		<div>
			<ThemeToggler />
		
			<Dashboard />
		</div>
	)
}

export default Home
