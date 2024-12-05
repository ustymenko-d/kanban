'use client'

import { FC, useEffect, useState } from 'react'
import { useAppStore } from '@/store/store'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import ReactFocusLock from 'react-focus-lock'

const Modal: FC = () => {
	// const { modalOpen, toggleModalOpen, addCard, users } = useAppStore()
	const {
		modalOpen,
		toggleModalOpen,
		addCard,
		editCard,
		editCardData,
		// setEditCardData,
		clearEditCardData,
		users,
	} = useAppStore()
	const [selectedUser, setSelectedUser] = useState<string>('user1')
	const [selectedTime, setSelectedTime] = useState<string>('7:00-15:00')
	const [selectedDate, setSelectedDate] = useState<string>(
		format(new Date(), 'yyyy-MM-dd')
	)

	useEffect(() => {
		if (editCardData) {
			setSelectedUser(editCardData.userId)
			setSelectedTime(editCardData.time)
			setSelectedDate(editCardData.date)
		}
	}, [editCardData])

	const handleClose = (): void => {
		toggleModalOpen()
		clearEditCardData()
	}

	// const handleAddTask = (): void => {
	// 	const newCard = {
	// 		id: uuidv4(),
	// 		time: selectedTime,
	// 		date: selectedDate,
	// 		userId: selectedUser,
	// 	}
	// 	addCard(newCard)
	// 	toggleModalOpen()
	// }

	const handleSave = (): void => {
		if (editCardData) {
			editCard({
				...editCardData,
				userId: selectedUser,
				time: selectedTime,
				date: selectedDate,
			})
		} else {
			addCard({
				id: uuidv4(),
				userId: selectedUser,
				time: selectedTime,
				date: selectedDate,
			})
		}
		toggleModalOpen()
		clearEditCardData()
	}

	return modalOpen ? (
		<div className='z-40 fixed inset-0 w-screen h-screen flex justify-end'>
			<div
				className='h-full w-full absolute bg-black bg-opacity-30'
				onClick={handleClose}></div>

			<ReactFocusLock
				returnFocus
				disabled={!modalOpen}>
				<div
					className='relative z-50 h-full bg-white dark:bg-teal-950'
					onKeyDown={(e) => {
						if (e.code === 'Escape') {
							handleClose()
						}
					}}
					role='dialog'
					aria-modal='true'>
					<div className='p-4'>
						<h2 className='text-lg font-semibold mb-4'>
							{editCardData ? 'Edit Task' : 'Add New Task'}
						</h2>

						<div className='mb-4'>
							<label
								htmlFor='user'
								className='block text-sm'>
								Select User
							</label>
							<select
								id='user'
								className='border p-2 rounded'
								value={selectedUser}
								onChange={(e) => setSelectedUser(e.target.value)}>
								{users.map((user) => (
									<option
										key={user.id}
										value={user.id}>
										{user.name}
									</option>
								))}
							</select>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='time'
								className='block text-sm'>
								Select Time
							</label>
							<select
								id='time'
								className='border p-2 rounded'
								value={selectedTime}
								onChange={(e) => setSelectedTime(e.target.value)}>
								<option value='7:00-15:00'>7:00-15:00</option>
								<option value='15:00-23:00'>15:00-23:00</option>
								<option value='23:00-7:00'>23:00-7:00</option>
							</select>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='date'
								className='block text-sm'>
								Select Date
							</label>
							<input
								type='date'
								id='date'
								className='border p-2 rounded'
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
							/>
						</div>

						<div className='flex justify-end'>
							<button
								onClick={handleSave}
								className='bg-blue-500 text-white px-4 py-2 rounded'>
								{editCardData ? 'Save Changes' : 'Add Task'}
							</button>
						</div>
					</div>
				</div>
			</ReactFocusLock>
		</div>
	) : null
}

export default Modal
