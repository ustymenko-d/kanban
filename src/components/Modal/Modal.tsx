'use client'

import { FC } from 'react'
import { useAppStore } from '@/store/store'

const Modal: FC = () => {
	const { modalOpen, toggleModalOpen } = useAppStore()

	const handleClose = (): void => {
		toggleModalOpen()
	}

	return modalOpen ? (
		<div className='z-40 fixed inset-0 w-screen h-screen flex justify-end'>
			<div
				className='h-full w-full absolute bg-black bg-opacity-30'
				onClick={handleClose}></div>
			<div
				className='relative z-50 h-full w-2/5 bg-white dark:bg-teal-950'
				role='dialog'
				aria-modal='true'>
				modal window
			</div>
		</div>
	) : null
}

export default Modal
