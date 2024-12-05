import { FC } from 'react'
import KanbanBoard from '../Kanban/KanbanBoard/KanbanBoard'
import Modal from '../Modal/Modal'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'

const Dashboard: FC = () => {
	return (
		<>
			<KanbanBoard />

			<Modal />
			<DeleteConfirmation />
		</>
	)
}

export default Dashboard
