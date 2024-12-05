'use client'

import { FC, useEffect, useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { addDays, format, startOfWeek, subDays } from 'date-fns'
import { useAppStore } from '@/store/store'
import KanbanColumn from '../KanbanColumn/KanbanColumn'
import KanbanHead from '../KanbanHead/KanbanHead'
import { ITimeCard } from '@/const/const.interfaces'

const KanbanBoard: FC = () => {
	const { users, cards, editCard, toggleModalOpen, updateIsCardEditing } =
		useAppStore()

	const [isHydrated, setIsHydrated] = useState<boolean>(false)

	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	)

	const [showOnlyUsersWithTasks, setShowOnlyUsersWithTasks] =
		useState<boolean>(false)

	const currentWeekDates = Array.from({ length: 7 }, (_, i) =>
		addDays(currentWeekStart, i)
	)

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event

		if (!over) return

		const overId = over.id as string
		const [overUserId, overDate] = overId.split(':')

		const cardToUpdate = cards.find((card) => card.id === active.id)

		if (cardToUpdate) {
			editCard({
				...cardToUpdate,
				userId: overUserId,
				date: overDate,
			})
		}
	}

	const handlePreviousWeek = (): void => {
		setCurrentWeekStart((prev) => subDays(prev, 7))
	}

	const handleNextWeek = (): void => {
		setCurrentWeekStart((prev) => addDays(prev, 7))
	}

	const filteredUsers = showOnlyUsersWithTasks
		? users.filter((user) =>
				cards.some((card) =>
					currentWeekDates.some(
						(date) =>
							card.userId === user.id &&
							card.date === format(date, 'yyyy-MM-dd')
					)
				)
		  )
		: users

	const tasksPerDay = currentWeekDates.map(
		(date) =>
			cards.filter((card) => card.date === format(date, 'yyyy-MM-dd')).length
	)

	const onEdit = (card: ITimeCard) => {
		const { setEditCardData, toggleModalOpen } = useAppStore.getState()
		setEditCardData(card)
		toggleModalOpen()
	}

	const handleCreateTask = (): void => {
		updateIsCardEditing(true)
		toggleModalOpen()
	}

	useEffect(() => {
		setIsHydrated(true)
	}, [])

	if (!isHydrated) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className='flex items-center gap-4 mb-4'>
				<button onClick={handlePreviousWeek}>← Previous Week</button>
				<button onClick={handleNextWeek}>Next Week →</button>
				<button onClick={handleCreateTask}>Create Task</button>
			</div>

			<div
				className='grid'
				style={{ gridTemplateRows: 'auto' }}>
				<KanbanHead dates={currentWeekDates} />

				<div
					className='grid task-count-row'
					style={{
						gridTemplateColumns: '100px repeat(7, 1fr)',
						fontWeight: 'bold',
					}}>
					<div>
						<label className='flex items-center gap-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={showOnlyUsersWithTasks}
								onChange={() => setShowOnlyUsersWithTasks((prev) => !prev)}
								className='hidden'
							/>
							<span
								className={`toggle-switch ${
									showOnlyUsersWithTasks ? 'bg-blue-500' : 'bg-gray-300'
								}`}
							/>
							<span>Filter</span>
						</label>
					</div>
					{tasksPerDay.map((count, index) => (
						<div
							key={index}
							className='text-center'>
							{count}
						</div>
					))}
				</div>

				<DndContext onDragEnd={handleDragEnd}>
					{filteredUsers.map((user) => (
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
									cards={cards.filter(
										(card) =>
											card.userId === user.id &&
											card.date === format(date, 'yyyy-MM-dd')
									)}
									onEdit={onEdit}
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
