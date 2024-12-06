import { FC } from 'react'
import { addDays, subDays, format } from 'date-fns'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface WeekSelectorProp {
	currentWeekStart: Date
	setCurrentWeekStart: React.Dispatch<React.SetStateAction<Date>>
}

const WeekSelector: FC<WeekSelectorProp> = ({
	currentWeekStart,
	setCurrentWeekStart,
}) => {
	const handlePreviousWeek = () => {
		setCurrentWeekStart((prev) => subDays(prev, 7))
	}

	const handleNextWeek = () => {
		setCurrentWeekStart((prev) => addDays(prev, 7))
	}

	const weekEnd = addDays(currentWeekStart, 6)

	return (
		<div className='flex items-center gap-4'>
			<button
				onClick={handlePreviousWeek}
				className='p-2 rounded-full hover:bg-slate-200 focus-visible:bg-slate-200'
				aria-label='Previous week'>
				<FaChevronLeft />
			</button>
			<span className='border p-2 rounded bg-slate-100 border-slate-300'>
				{format(currentWeekStart, 'dd MMM')} - {format(weekEnd, 'dd MMM')}
			</span>
			<button
				onClick={handleNextWeek}
				className='p-2 rounded-full hover:bg-slate-200 focus-visible:bg-slate-200'
				aria-label='Next week'>
				<FaChevronRight />
			</button>
		</div>
	)
}

export default WeekSelector
