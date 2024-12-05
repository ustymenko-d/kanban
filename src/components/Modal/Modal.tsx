'use client'

import { FC, useEffect, useState } from 'react'
import { useAppStore } from '@/store/store'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import ReactFocusLock from 'react-focus-lock'
import { ITimeCard, TCardStatus, TCardTag } from '@/const/const.interfaces'
import ModalForm from './components/ModalForm/ModalForm'
import ModalDetails from './components/ModalDetails/ModalDetails'

export interface FormData {
	userId: string | number
	time: string
	date: string
	price: number
	note: string
	tag: string | undefined
	status: string
}

const isValidTimeFormat = (time: string): boolean => {
	const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/
	return timeRegex.test(time)
}

const calculateDuration = (time: string): string => {
	const [start, end] = time.split('-').map((t) => {
		const [hours, minutes] = t.split(':').map(Number)
		return hours * 60 + (minutes || 0)
	})
	const duration = end >= start ? end - start : 24 * 60 - start + end
	return `${Math.floor(duration / 60)}h${
		duration % 60 ? (duration % 60) + 'm' : ''
	}`
}

const Modal: FC = () => {
	const {
		modalOpen,
		toggleModalOpen,
		addCard,
		editCard,
		isCardEditing,
		updateIsCardEditing,
		editCardData,
		clearEditCardData,
		users,
	} = useAppStore()

	const [isEditing, setIsEditing] = useState<boolean>(isCardEditing)

	const [cardData, setCardData] = useState<FormData>({
		userId: users[0]?.id || '',
		time: '7:00-15:00',
		date: format(new Date(), 'yyyy-MM-dd'),
		price: 0,
		note: '',
		tag: '',
		status: 'pending',
	})

	const [timeError, setTimeError] = useState<string>('')

	const handleClose = (): void => {
		toggleModalOpen()
		clearEditCardData()
		updateIsCardEditing(false)
	}

	const handleEdit = () => {
		updateIsCardEditing(true)
	}

	const handleSave = (): void => {
		if (!cardData.userId) return
		if (cardData.price < 0) {
			alert('Price cannot be less than 0')
			return
		}
		if (!isValidTimeFormat(cardData.time)) {
			setTimeError('Time must be in HH:mm-HH:mm format')
			return
		}

		const duration = calculateDuration(cardData.time)

		const newCard: ITimeCard = {
			id: editCardData ? editCardData.id : uuidv4(),
			userId: cardData.userId,
			time: cardData.time,
			date: cardData.date,
			duration,
			price: cardData.price,
			note: cardData.note,
			tag: cardData.tag as TCardTag | undefined,
			status: cardData.status as TCardStatus,
		}

		if (editCardData) {
			editCard(newCard)
		} else {
			addCard(newCard)
		}

		handleClose()
	}

	useEffect(() => {
		if (editCardData) {
			setCardData({
				userId: String(editCardData.userId),
				time: editCardData.time,
				date: editCardData.date,
				price: editCardData.price || 0,
				note: editCardData.note || '',
				tag: editCardData.tag || '',
				status: editCardData.status || 'pending',
			})
		}
	}, [editCardData])

	useEffect(() => {
		setIsEditing(isCardEditing)
	}, [isCardEditing])

	return modalOpen ? (
		<div className='z-40 fixed inset-0 w-screen h-screen flex justify-end'>
			<div
				className='h-full w-full absolute bg-black bg-opacity-30'
				onClick={handleClose}></div>

			<ReactFocusLock
				returnFocus
				disabled={!modalOpen}>
				<div
					className='relative z-50 h-full bg-white dark:bg-teal-950 p-4'
					onKeyDown={(e) => {
						if (e.code === 'Escape') handleClose()
					}}
					role='dialog'
					aria-modal='true'>
					<h2 className='text-lg font-semibold mb-4'>
						{editCardData ? 'Edit Task' : 'Add New Task'}
					</h2>

					{isEditing && (
						<ModalForm
							users={users}
							timeError={timeError}
							setTimeError={setTimeError}
							cardData={cardData}
							setCardData={setCardData}
						/>
					)}

					{!isEditing && editCardData && (
						<ModalDetails editCardData={editCardData} users={users} />
					)}

					{editCardData && !isEditing ? (
						<button
							className='bg-yellow-500 text-white px-4 py-2 rounded mb-4'
							onClick={handleEdit}>
							Edit Task
						</button>
					) : (
						<div className='flex justify-end'>
							<button
								onClick={handleClose}
								className='bg-red-500 text-white px-4 py-2 rounded'>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className='bg-blue-500 text-white px-4 py-2 rounded'>
								{editCardData ? 'Save Changes' : 'Add Task'}
							</button>
						</div>
					)}
				</div>
			</ReactFocusLock>
		</div>
	) : null
}

export default Modal
