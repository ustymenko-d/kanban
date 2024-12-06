import { FC, useMemo } from 'react'
import { format } from 'date-fns'
import ToggleSwitch from '@/components/UI/Toggler/Toggler'
import { FaRegUser } from 'react-icons/fa'

interface KanbanHeadProps {
	dates: Date[]
	currentWeekDates: Date[]
	showOnlyUsersWithTasks: boolean
	setShowOnlyUsersWithTasks: (value: boolean) => void
	cards: { date: string }[]
}

const KanbanHead: FC<KanbanHeadProps> = ({
	cards,
	dates,
	currentWeekDates,
	showOnlyUsersWithTasks,
	setShowOnlyUsersWithTasks,
}) => {
	const tasksPerDay = useMemo(() => {
		return currentWeekDates.map(
			(date) =>
				cards.filter((card) => card.date === format(date, 'yyyy-MM-dd')).length
		)
	}, [cards, currentWeekDates])

	const gridStyle = {
		gridTemplateColumns: '250px repeat(7, minmax(200px, 1fr)) 250px',
	}

	return (
		<>
			<div
				className='sticky top-0 z-10 grid'
				style={gridStyle}>
				<div className='sticky left-0 p-4 border-t border-e bg-slate-100 border-slate-300'></div>

				{dates.map((date, index) => (
					<div
						key={date.toISOString()}
						className={`p-4 font-bold text-center border-t border-e bg-slate-100 border-slate-300 ${
							index === dates.length - 1 ? 'rounded-tr-lg' : ''
						} hover:bg-slate-300`}>
						<span>{format(date, 'EE')}</span> <span>{format(date, 'dd')}</span>
					</div>
				))}
				<div className='bg-white'></div>
			</div>

			<div
				className='sticky z-10 grid'
				style={{ ...gridStyle, top: 71 }}>
				<div className='sticky left-0 p-2 border-t border-e border-slate-300 bg-emerald-50'>
					<label className='flex items-center gap-2 cursor-pointer'>
						<input
							type='checkbox'
							checked={showOnlyUsersWithTasks}
							onChange={() =>
								setShowOnlyUsersWithTasks(!showOnlyUsersWithTasks)
							}
							className='hidden'
						/>
						<span>Shifts disponibles</span>
						<ToggleSwitch
							active={showOnlyUsersWithTasks}
							additionalClasses='pointer-events-none'
						/>
					</label>
				</div>
				{tasksPerDay.map((count, index) => (
					<div
						key={index}
						className='p-2 flex justify-center items-center border-t border-e text-center border-slate-300 bg-emerald-50'>
						<span className='block py-1 px-4 w-fit rounded-md text-xs bg-black bg-opacity-15'>
							{count}
						</span>
					</div>
				))}

				<div className='border-t border-slate-300 bg-white'></div>
			</div>

			<div
				className='sticky z-10 grid'
				style={{ ...gridStyle, top: 152 }}>
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className=' p-2 border-t border-e border-gray-300 flex flex-wrap gap-2 items-center justify-center bg-orange-200 first:justify-start first:sticky first:left-0'>
						{index % 2 === 0 && (
							<div className='p-1 text-xs rounded-md text-white bg-orange-600 bg-opacity-75 hover:bg-opacity-85'>
								35h30/45h
							</div>
						)}
						{(index === 1 || index === 3) && (
							<div className='text-xs flex items-center gap-1 order-1'>
								<FaRegUser /> 4
							</div>
						)}
						<div className='p-1 text-xs rounded-md text-white bg-black bg-opacity-15 hover:bg-opacity-30'>
							196&euro;
						</div>
					</div>
				))}
				<div className='p-2 text-center font-bold bg-slate-300'>Compteurs</div>
			</div>
		</>
	)
}

export default KanbanHead
