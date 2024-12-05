'use client'

import { FC } from 'react'
import ReactFocusLock from 'react-focus-lock'
import { useAppStore } from '@/store/store'

const DeleteConfirmation: FC = ({}) => {
	const {
		deleteModalOpen,
		deleteCardData,
		toggleDeleteModalOpen,
		deleteCard,
		clearDeleteCardData,
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

	return deleteModalOpen ? (
		<div className='z-40 fixed inset-0 w-screen h-screen flex justify-center items-center'>
			<div
				className='h-full w-full absolute bg-black bg-opacity-30'
				onClick={handleClose}></div>

			<ReactFocusLock
				returnFocus
				disabled={!deleteModalOpen}>
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
						<h2 className='text-lg font-semibold mb-4'>Delete this task?</h2>

						<p className='mb-4'>
							<strong>Time:</strong> {deleteCardData?.time || 'N/A'}
							<br />
							<strong>Date:</strong> {deleteCardData?.date || 'N/A'}
							<br />
							<strong>User:</strong> {deleteCardData?.userId || 'N/A'}
						</p>

						<div className='flex justify-end'>
							<button
								onClick={handleCancel}
								className='bg-blue-500 text-white px-4 py-2 rounded'>
								Cancel
							</button>
							<button
								onClick={handleConfirm}
								className='bg-red-500 text-white px-4 py-2 rounded'>
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
