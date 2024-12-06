import { FC } from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import Header from '@/components/Header/Header'

const Home: FC = () => {
	return (
		<div className='pageContainer h-full grid '>
			<Header />
			<Dashboard />
		</div>
	)
}

export default Home
