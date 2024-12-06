import { FC } from 'react'
import KanbanBoard from '../Kanban/KanbanBoard/KanbanBoard'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import Modal from '../Modal/Modal'

const Dashboard: FC = () => {
	return (
		<div className='dashboard w-screen overflow-auto p-4'>
			<KanbanBoard />

			<Modal />
			<DeleteConfirmation />
		</div>
	)
}

export default Dashboard
