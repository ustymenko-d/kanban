import { FC } from 'react'
import { format } from 'date-fns'

interface KanbanHeadProps {
	dates: Date[]
}

const KanbanHead: FC<KanbanHeadProps> = ({ dates }) => {
	return (
		<div
			className='grid'
			style={{ gridTemplateColumns: '100px repeat(7, 1fr)' }}>
			<div className='p-2 bg-slate-300 border-e	border-yellow-300'></div>

			{dates.map((date) => (
				<div
					key={date.toISOString()}
					className='p-2 bg-neutral-500'>
					<div>{format(date, 'EEEE')}</div>{' '}
					<div>{format(date, 'dd.MM.yyyy')}</div>
				</div>
			))}
		</div>
	)
}

export default KanbanHead
