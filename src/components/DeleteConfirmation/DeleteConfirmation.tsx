'use client'

import { FC, useMemo } from 'react'
import ReactFocusLock from 'react-focus-lock'
import { useAppStore } from '@/store/store'

const DeleteConfirmation: FC = ({}) => {
	const {
		deleteModalOpen,
		deleteCardData,
		toggleDeleteModalOpen,
		deleteCard,
		clearDeleteCardData,
		users,
	} = useAppStore()

	const handleClose = (): void => {
		toggleDeleteModalOpen()
		clearDeleteCardData()
	}

	const handleCancel = (): void => {
		handleClose()
	}

	const handleConfirm = (): void => {
		if (deleteCardData) {
			const cardId = deleteCardData.id as string
			deleteCard(cardId)
		}
		handleClose()
	}

	const userName = useMemo(() => {
		if (deleteCardData) {
			const user = users.find((user) => user.id === deleteCardData.userId)
			return user ? user.name : 'Unknown User'
		}
	}, [deleteCardData, users])

	if (!deleteModalOpen || !deleteCardData) return null

	return deleteModalOpen ? (
		<div className='z-40 fixed inset-0 w-screen h-screen flex justify-center items-center'>
			<div
				className='h-full w-full absolute bg-black bg-opacity-30'
				onClick={handleClose}></div>

			<ReactFocusLock
				returnFocus
				disabled={!deleteModalOpen}>
				<div
					className='relative z-50 h-full bg-white'
					onKeyDown={(e) => {
						if (e.code === 'Escape') {
							handleClose()
						}
					}}
					role='dialog'
					aria-modal='true'>
					<div className='p-6 flex flex-col gap-4'>
						<h2 className='mb-0 min-w-96 text-lg font-semibold'>
							Delete this task?
						</h2>

						<div className='flex flex-col gap-2'>
							<p>
								<span className='font-semibold'>Date: </span>
								{deleteCardData?.date}
							</p>
							<p>
								<span className='font-semibold'>Time: </span>
								{deleteCardData?.time}
							</p>
							<p>
								<span className='font-semibold'>Duration: </span>
								{deleteCardData?.duration}
							</p>
							<p>
								<span className='font-semibold'>User: </span>
								{userName}
							</p>
						</div>

						<div className='flex items-center justify-end gap-4'>
							<button
								onClick={handleCancel}
								className='px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 active:bg-blue-700 duration-200'>
								Cancel
							</button>
							<button
								onClick={handleConfirm}
								className='px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 active:bg-red-700 duration-200'>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</ReactFocusLock>
		</div>
	) : null
}

export default DeleteConfirmation
