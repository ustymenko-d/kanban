'use client'

import { FC, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import ReactFocusLock from 'react-focus-lock'
import { useAppStore } from '@/store/store'
import { ITimeCard, TCardStatus, TCardTag } from '@/const/const.interfaces'
import ModalDetails from './components/ModalDetails/ModalDetails'
import ModalForm from './components/ModalForm/ModalForm'
import { IoCloseOutline } from 'react-icons/io5'

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

	const handleCancel = () => {
		updateIsCardEditing(false)
	}

	const handleClose = (): void => {
		toggleModalOpen()
		clearEditCardData()
		handleCancel()
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
				className='h-full w-full absolute bg-black bg-opacity-40'
				onClick={handleClose}></div>

			<ReactFocusLock
				returnFocus
				disabled={!modalOpen}>
				<div
					className='overflow-hidden relative z-50 h-full min-w-96 flex flex-col bg-white shadow-lg'
					onKeyDown={(e) => {
						if (e.code === 'Escape') handleClose()
					}}
					role='dialog'
					aria-modal='true'>
					<div className='p-5 flex items-center gap-4 border-b'>
						<button
							className='cursor-pointer w-6 h-6 text-slate-400 hover:text-slate-500 focus-visible:text-slate-500 active:text-slate-600'
							onClick={handleClose}>
							<IoCloseOutline className='w-full h-full duration-200' />
						</button>
						<h2 className='text-2xl font-semibold'>
							{editCardData && isEditing
								? 'Edit Task'
								: editCardData && !isEditing
								? 'Task details'
								: 'Add New Task'}
						</h2>
					</div>
					<div className='overflow-auto mb-20 p-5 flex-grow flex flex-col gap-4'>
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
							<ModalDetails
								editCardData={editCardData}
								users={users}
							/>
						)}
					</div>
					<div className='absolute bottom-0 w-full p-5 bg-white shadow-2xl'>
						{editCardData && !isEditing ? (
							<button
								className='px-4 py-2 w-full rounded text-white bg-yellow-500 hover:bg-yellow-600 focus-visible:bg-yellow-600 active:bg-yellow-700 duration-200'
								onClick={handleEdit}>
								Edit Task
							</button>
						) : (
							<div className='grid grid-cols-2 gap-4'>
								<button
									onClick={() => {
										if (editCardData) {
											handleCancel()
										} else {
											handleClose()
										}
									}}
									className='px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 active:bg-red-700 duration-200'>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className='px-4 py-2 rounded text-white bg-emerald-500 hover:bg-emerald-600 focus-visible:bg-emerald-600 active:bg-emerald-700 duration-200'>
									{editCardData ? 'Save Changes' : 'Add Task'}
								</button>
							</div>
						)}
					</div>
				</div>
			</ReactFocusLock>
		</div>
	) : null
}

export default Modal
