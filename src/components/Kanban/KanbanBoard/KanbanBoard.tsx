'use client'

import { FC, useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { addDays, format, startOfWeek, subDays } from 'date-fns'
import { InitialData, ITimeCard } from '@/const/const.interfaces'
import { useAppStore } from '@/store/store'
import { initialData } from '@/const/const'
import KanbanColumn from '../KanbanColumn/KanbanColumn'
import KanbanHead from '../KanbanHead/KanbanHead'

const KanbanBoard: FC = () => {
	const { toggleModalOpen } = useAppStore()
	const [data, setData] = useState<InitialData>(initialData)
	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	)

	const currentWeekDates = Array.from({ length: 7 }, (_, i) =>
		addDays(currentWeekStart, i)
	)

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event

		if (!over) return

		const overId = over.id as string
		const [overUserId, overDate] = overId.split(':')

		setData((prev) => {
			const cardIndex = prev.cards.findIndex((c) => c.id === active.id)
			if (cardIndex === -1) return prev

			const updatedCards = [...prev.cards]
			updatedCards[cardIndex] = {
				...updatedCards[cardIndex],
				userId: overUserId,
				date: overDate,
			}

			return { ...prev, cards: updatedCards }
		})
	}

	const handlePreviousWeek = (): void => {
		setCurrentWeekStart((prev) => subDays(prev, 7))
	}

	const handleNextWeek = (): void => {
		setCurrentWeekStart((prev) => addDays(prev, 7))
	}

	const handleEditCard = (card: ITimeCard): void => {
		console.log('Edit card:', card)
		toggleModalOpen()
	}

	const handleDeleteCard = (cardId: string): void => {
		setData((prev) => {
			const updatedCards = prev.cards.filter((card) => card.id !== cardId)
			return { ...prev, cards: updatedCards }
		})
	}

	return (
		<>
			<div className='flex items-center gap-4'>
				<button onClick={handlePreviousWeek}>← prew</button>
				<button onClick={handleNextWeek}>next →</button>
			</div>

			<button onClick={() => toggleModalOpen()}>create</button>

			<div
				className='grid'
				style={{ gridTemplateRows: 'auto' }}>
				<KanbanHead dates={currentWeekDates} />

				<DndContext onDragEnd={handleDragEnd}>
					{data.users.map((user) => (
						<div
							key={user.id}
							className='grid'
							style={{ gridTemplateColumns: '100px repeat(7, 1fr)' }}>
							<div>
								<strong>{user.name}</strong>
							</div>

							{currentWeekDates.map((date) => (
								<KanbanColumn
									key={`${user.id}:${format(date, 'yyyy-MM-dd')}`}
									id={`${user.id}:${format(date, 'yyyy-MM-dd')}`}
									cards={data.cards.filter(
										(card) =>
											card.userId === user.id &&
											card.date === format(date, 'yyyy-MM-dd')
									)}
									onEdit={handleEditCard}
									onDelete={handleDeleteCard}
								/>
							))}
						</div>
					))}
				</DndContext>
			</div>
		</>
	)
}

export default KanbanBoard
