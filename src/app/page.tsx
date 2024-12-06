import { FC } from 'react'
import Header from '@/components/Header/Header'
import Dashboard from '@/components/Dashboard/Dashboard'

const Home: FC = () => {
	return (
		<div className='pageContainer h-full grid '>
			<Header />
			<Dashboard />
		</div>
	)
}

export default Home
