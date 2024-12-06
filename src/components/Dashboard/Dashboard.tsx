import { FC } from 'react'
import KanbanBoard from '../Kanban/KanbanBoard/KanbanBoard'
import Modal from '../Modal/Modal'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'

const Dashboard: FC = () => {
	return (
		<div className='dashboard  overflow-auto p-4'>
			<KanbanBoard />

			<Modal />
			<DeleteConfirmation />
		</div>
	)
}

export default Dashboard
