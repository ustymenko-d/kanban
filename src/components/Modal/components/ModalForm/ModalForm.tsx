import { FC, useState } from 'react'
import { IUser } from '@/const/const.interfaces'
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
	const [isShiftActive, setIsShiftActive] = useState<boolean>(true)

	const handleToggleActive = (): void => {
		setIsShiftActive((prev) => !prev)
	}

	return (
		<>
			<div className='grid grid-cols-2 '>
				<button
					disabled={isShiftActive}
					onClick={handleToggleActive}
					className={`py-2 px-4 rounded-s border ${
						isShiftActive ? ' bg-slate-200 ' : ' '
					} border-slate-200 duration-200 `}>
					Shift
				</button>
				<button
					disabled={!isShiftActive}
					onClick={handleToggleActive}
					className={`py-2 px-4 rounded-e border ${
						!isShiftActive ? ' bg-slate-200 ' : ' '
					} border-slate-200 duration-200`}>
					Absence
				</button>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='user'
					className='block text-sm font-semibold'>
					Select User
				</label>
				<select
					id='user'
					className='border p-2 rounded w-full bg-slate-100 border-slate-300'
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

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='time'
					className='block text-sm'>
					Enter Time (HH:mm-HH:mm)
				</label>
				<input
					type='text'
					id='time'
					className={`border p-2 rounded w-full${
						timeError ? ' border-red-500 ' : ' '
					}bg-slate-100 border-slate-300`}
					value={cardData.time}
					onChange={(e) => {
						setCardData((prev) => ({ ...prev, time: e.target.value }))
						setTimeError('')
					}}
					placeholder='e.g., 07:00-15:00'
				/>
				{timeError && <p className='text-red-500 text-sm'>{timeError}</p>}
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='date'
					className='block text-sm'>
					Select Date
				</label>
				<input
					type='date'
					id='date'
					className='border p-2 rounded w-full bg-slate-100 border-slate-300'
					value={cardData.date}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, date: e.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='price'
					className='block text-sm'>
					Price
				</label>
				<input
					type='number'
					id='price'
					className='border p-2 rounded w-full bg-slate-100 border-slate-300'
					value={cardData.price}
					onChange={(e) =>
						setCardData((prev) => ({
							...prev,
							price: Number(e.target.value),
						}))
					}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='note'
					className='block text-sm'>
					Note
				</label>
				<textarea
					id='note'
					className='border p-2 min-h-24 rounded w-full resize-none bg-slate-100 border-slate-300'
					value={cardData.note}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, note: e.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='tag'
					className='block text-sm'>
					Tag
				</label>
				<select
					id='tag'
					className='border p-2 rounded w-full bg-slate-100 border-slate-300'
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

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='status'
					className='block text-sm'>
					Status
				</label>
				<select
					id='status'
					className='border p-2 rounded w-full bg-slate-100 border-slate-300'
					value={cardData.status}
					onChange={(e) =>
						setCardData((prev) => ({ ...prev, status: e.target.value }))
					}>
					<option value='pending'>Pending</option>
					<option value='approve'>Approve</option>
					<option value='reject'>Reject</option>
				</select>
			</div>
		</>
	)
}

export default ModalForm
