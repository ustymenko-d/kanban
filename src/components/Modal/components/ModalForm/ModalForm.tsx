import { IUser } from '@/const/const.interfaces'
import { FC } from 'react'
import { FormData } from '../../Modal'

interface ModalFormProps {
	users: IUser[]
	timeError: string
	setTimeError: React.Dispatch<React.SetStateAction<string>>
	cardData: FormData
	setCardData: React.Dispatch<React.SetStateAction<FormData>>
}

const ModalForm: FC<ModalFormProps> = ({
	users,
	timeError,
	setTimeError,
	cardData,
	setCardData,
}) => {
	return (
		<>
			{/* User Selection */}
			<div className='mb-4'>
				<label
					htmlFor='user'
					className='block text-sm'>
					Select User
				</label>
				<select
					id='user'
					className='border p-2 rounded w-full'
					value={cardData.userId}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, userId: e.target.value }))
					}>
					{users.map((user) => (
						<option
							key={user.id}
							value={user.id}>
							{user.name}
						</option>
					))}
				</select>
			</div>

			{/* Time Selection */}
			<div className='mb-4'>
				<label
					htmlFor='time'
					className='block text-sm'>
					Enter Time (HH:mm-HH:mm)
				</label>
				<input
					type='text'
					id='time'
					className={`border p-2 rounded w-full ${
						timeError ? 'border-red-500' : ''
					}`}
					value={cardData.time}
					onChange={(e) => {
						setCardData((prev) => ({ ...prev, time: e.target.value }))
						setTimeError('')
					}}
					placeholder='e.g., 07:00-15:00'
				/>
				{timeError && <p className='text-red-500 text-sm'>{timeError}</p>}
			</div>

			{/* Date Selection */}
			<div className='mb-4'>
				<label
					htmlFor='date'
					className='block text-sm'>
					Select Date
				</label>
				<input
					type='date'
					id='date'
					className='border p-2 rounded w-full'
					value={cardData.date}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, date: e.target.value }))
					}
				/>
			</div>

			{/* Price Input */}
			<div className='mb-4'>
				<label
					htmlFor='price'
					className='block text-sm'>
					Price
				</label>
				<input
					type='number'
					id='price'
					className='border p-2 rounded w-full'
					value={cardData.price}
					onChange={(e) =>
						setCardData((prev) => ({
							...prev,
							price: Number(e.target.value),
						}))
					}
				/>
			</div>

			{/* Note Input */}
			<div className='mb-4'>
				<label
					htmlFor='note'
					className='block text-sm'>
					Note
				</label>
				<textarea
					id='note'
					className='border p-2 rounded w-full'
					value={cardData.note}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, note: e.target.value }))
					}
				/>
			</div>

			{/* Tag Selection */}
			<div className='mb-4'>
				<label
					htmlFor='tag'
					className='block text-sm'>
					Tag
				</label>
				<select
					id='tag'
					className='border p-2 rounded w-full'
					value={cardData.tag}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, tag: e.target.value }))
					}>
					<option value=''>No Tag</option>
					<option value='Caisse'>Caisse</option>
					<option value='Fermeture'>Fermeture</option>
					<option value='Camion'>Camion</option>
				</select>
			</div>

			{/* Status Selection */}
			<div className='mb-4'>
				<label
					htmlFor='status'
					className='block text-sm'>
					Status
				</label>
				<select
					id='status'
					className='border p-2 rounded w-full'
					value={cardData.status}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, status: e.target.value }))
					}>
					<option value='pending'>Pending</option>
					<option value='in-progress'>In Progress</option>
					<option value='completed'>Completed</option>
				</select>
			</div>
		</>
	)
}

export default ModalForm
