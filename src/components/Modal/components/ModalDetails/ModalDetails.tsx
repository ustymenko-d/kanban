'use client'
import { ITimeCard, IUser } from '@/const/const.interfaces'
import { FC, useMemo } from 'react'

interface ModalDetailsProps {
	editCardData: ITimeCard
	users: IUser[]
}

const DetailItem: FC<{ label: string; value: string | number | undefined }> = ({
	label,
	value,
}) => (
	<div className='flex flex-col gap-1'>
		<strong>{label}:</strong>
		<p>{value || 'N/A'}</p>
	</div>
)

const ModalDetails: FC<ModalDetailsProps> = ({ editCardData, users }) => {
	const userName = useMemo(() => {
		const user = users.find((user) => user.id === editCardData.userId)
		return user ? user.name : 'Unknown User'
	}, [editCardData.userId, users])

	return (
		<>
			<DetailItem
				label='Time'
				value={editCardData.time}
			/>
			<DetailItem
				label='Date'
				value={editCardData.date}
			/>
			<DetailItem
				label='Duration'
				value={editCardData.duration}
			/>
			<DetailItem
				label='Status'
				value={editCardData.status}
			/>
			<DetailItem
				label='Note'
				value={editCardData.note}
			/>
			<DetailItem
				label='Price'
				value={`${editCardData.price} USD`}
			/>
			<DetailItem
				label='User'
				value={userName}
			/>
		</>
	)
}

export default ModalDetails
