import { FC } from 'react'
import KanbanBoard from '../Kanban/KanbanBoard/KanbanBoard'
import Modal from '../Modal/Modal'

const Dashboard: FC = () => {
	return (
		<>
			<KanbanBoard />

			<Modal />
		</>
	)
}

export default Dashboard
