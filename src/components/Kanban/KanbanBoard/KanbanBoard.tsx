'use client'

import { FC, useEffect, useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { addDays, format, startOfWeek } from 'date-fns'
import { useAppStore } from '@/store/store'
import KanbanColumn from '../KanbanColumn/KanbanColumn'
import KanbanHead from '../KanbanHead/KanbanHead'
import { ITimeCard } from '@/const/const.interfaces'
import DecorSelect from './components/DecorativeSelect/DecorativeSelect'
import WeekSelector from './components/WeekSelector/WeekSelector'
import { FaRegUser } from 'react-icons/fa'
import DecorativeHeadBlock from './components/DecorativeHeadBlock'
import { useBreakpoints } from '@/hooks/useBreakpoints'

const KanbanBoard: FC = () => {
	const { users, cards, editCard, toggleModalOpen, updateIsCardEditing } =
		useAppStore()
	const screenBreakpoint = useBreakpoints([768])
	const [isHydrated, setIsHydrated] = useState<boolean>(false)
	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	)
	const [showOnlyUsersWithTasks, setShowOnlyUsersWithTasks] =
		useState<boolean>(false)

	const currentWeekDates = Array.from({ length: 7 }, (_, i) =>
		addDays(currentWeekStart, i)
	)

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

	const handleEditTask = (card: ITimeCard) => {
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
		<div className='h-full w-full overflow-auto rounded-md shadow-md bg-white'>
			<div className='kanbanBoard sticky left-0 py-4 px-2 grid grid-rows-3 gap-4 items-center sm:grid-rows-2 sm:grid-cols-2-auto xl:grid-cols-3 xl:grid-rows-1'>
				<DecorSelect />

				<div className='order-1 flex items-center justify-center gap-4 sm:col-span-full xl:order-none xl:col-auto'>
					<WeekSelector
						currentWeekStart={currentWeekStart}
						setCurrentWeekStart={setCurrentWeekStart}
					/>
				</div>

				<div className='flex items-center justify-end gap-3'>
					<DecorativeHeadBlock />

					<button
						className='py-2 px-4 w-fit rounded-lg text-white bg-sky-300 hover:bg-sky-400 focus-visible:bg-sky-400 active:bg-sky-500'
						onClick={handleCreateTask}>
						Create Task
					</button>
				</div>
			</div>

			<div className='w-full grid border-b border-b-slate-300'>
				<KanbanHead
					screenBreakpoint={screenBreakpoint}
					cards={cards}
					dates={currentWeekDates}
					currentWeekDates={currentWeekDates}
					showOnlyUsersWithTasks={showOnlyUsersWithTasks}
					setShowOnlyUsersWithTasks={setShowOnlyUsersWithTasks}
				/>

				<DndContext onDragEnd={handleDragEnd}>
					{filteredUsers.map((user, index) => (
						<div
							key={user.id}
							className='grid'
							style={{
								gridTemplateColumns: !!screenBreakpoint
									? '250px repeat(7, minmax(200px, 1fr)) 250px'
									: '170px repeat(7, minmax(200px, 1fr)) 250px',
							}}>
							<div
								className={`sticky left-0 p-2 border-s-8 border-t border-e border-slate-300 bg-slate-100 ${
									index === 0 || index === 1 || index === 3
										? 'border-s-orange-300'
										: 'border-s-green-500'
								} md:p-5`}>
								<div className='flex flex-wrap flex-col items-start gap-4 md:flex-row'>
									<div className='aspect-square w-8 border rounded-full flex justify-center items-center'>
										<FaRegUser />
									</div>
									<div className='flex flex-col justify-center'>
										<span className='font-medium'>{user.name}</span>
										<span className='text-sm text-neutral-500'>
											{user.role}
										</span>
										<span className='text-xs text-orange-400'>38h</span>
									</div>
								</div>
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
									onEdit={handleEditTask}
								/>
							))}
							<div className='p-2 border-t flex flex-wrap justify-end items-start gap-y-1 gap-x-2 border-slate-300 bg-slate-100'>
								<div className='p-1 text-xs rounded-md text-white bg-orange-600 bg-opacity-75 hover:bg-opacity-85'>
									62.5h-450&euro;
								</div>
								<div className='p-1 text-xs rounded-md text-white bg-slate-600 bg-opacity-85 hover:bg-opacity-100'>
									+24h;
								</div>
								<div className='p-1 text-xs rounded-md text-white bg-black bg-opacity-15 hover:bg-opacity-30'>
									38h/s;
								</div>
								<div className='p-1 text-xs rounded-md text-white bg-green-500 bg-opacity-85 hover:bg-opacity-100'>
									55j;
								</div>
							</div>
						</div>
					))}
				</DndContext>
			</div>
		</div>
	)
}

export default KanbanBoard
