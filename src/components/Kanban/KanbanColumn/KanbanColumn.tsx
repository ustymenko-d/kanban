'use client'
import { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { ITimeCard } from '@/const/const.interfaces'
import TimeCard from '@/components/TimeCard/TimeCard'

interface KanbanColumnProps {
	id: string
	cards: ITimeCard[]
	onEdit: (card: ITimeCard) => void
}

const KanbanColumn: FC<KanbanColumnProps> = ({ id, cards, onEdit }) => {
	const { setNodeRef } = useDroppable({
		id,
	})
	return (
		<div
			ref={setNodeRef}
			className='min-h-24 p-2 border border-neutral-400 bg-neutral-200'>
			{cards.map((card) => (
				<TimeCard
					key={card.id}
					card={card}
					onEdit={onEdit}
				/>
			))}
		</div>
	)
}

export default KanbanColumn
