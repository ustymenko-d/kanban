'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDndMonitor, useDraggable } from '@dnd-kit/core'
import { ITimeCard } from '@/const/const.interfaces'
import { useAppStore } from '@/store/store'
import ContextMenu from './components/CpntextMenu/ContextMenu'
import { FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa'

interface TimeCardProps {
	card: ITimeCard
	onEdit: (card: ITimeCard) => void
}

const TimeCard: FC<TimeCardProps> = ({ card, onEdit }) => {
	const [contextMenu, setContextMenu] = useState<{
		show: boolean
		x: number
		y: number
	}>({ show: false, x: 0, y: 0 })
	const contextMenuRef = useRef<HTMLDivElement>(null)
	const { toggleDeleteModalOpen, updateIsCardEditing } = useAppStore()
	const [isDragging, setIsDragging] = useState<boolean>(false)

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: card.id,
	})

	useDndMonitor({
		onDragStart: (event) => {
			if (event.active.id === card.id) setIsDragging(true)
		},
		onDragEnd: (event) => {
			if (event.active.id === card.id) setIsDragging(false)
		},
	})

	const handleContextMenu = useCallback((event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenu({
			show: true,
			x: event.clientX,
			y: event.clientY,
		})
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target as Node)
			) {
				setContextMenu((prev) => ({ ...prev, show: false }))
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleViewDetails = useCallback(() => {
		onEdit(card)
		setContextMenu((prev) => ({ ...prev, show: false }))
	}, [card, onEdit])

	const handleEdit = useCallback(() => {
		updateIsCardEditing(true)
		onEdit(card)
		setContextMenu((prev) => ({ ...prev, show: false }))
	}, [card, onEdit, updateIsCardEditing])

	const handleDelete = useCallback(() => {
		toggleDeleteModalOpen(card)
		setContextMenu((prev) => ({ ...prev, show: false }))
	}, [card, toggleDeleteModalOpen])

	const cardStyle = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		cursor: isDragging ? 'grabbing' : 'grab',
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={cardStyle}
				{...listeners}
				{...attributes}
				onContextMenu={handleContextMenu}
				className={`p-3 m-2 rounded-md flex flex-col gap-1 ${
					card.status === 'approve'
						? 'bg-lime-200 bg-opacity-90'
						: card.status === 'reject'
						? 'bg-striped bg-opacity-50'
						: 'bg-neutral-100'
				}`}>
				<p>{card.time}</p>

				<div className='flex items-center gap-2 text-xs text-neutral-500'>
					<div className='flex items-center gap-1'>
						<FaRegClock />
						<span>{card.duration}</span>
					</div>
					{card.price && (
						<div className='flex items-center gap-1'>
							<FaRegMoneyBillAlt />
							<span>{card.price}&euro;</span>
						</div>
					)}
				</div>

				{card.tag && (
					<span
						className={`block rounded-md p-1 w-full text-xs font-medium ${
							card.tag === 'Caisse'
								? 'bg-green-500'
								: card.tag === 'Fermeture'
								? 'bg-pink-500 text-white'
								: 'bg-blue-500 text-white'
						}`}>
						{card.tag}
					</span>
				)}
			</div>

			{contextMenu.show && (
				<ContextMenu
					contextMenuRef={contextMenuRef}
					contextMenuPosition={{ x: contextMenu.x, y: contextMenu.y }}
					handleViewDetails={handleViewDetails}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			)}
		</>
	)
}

export default TimeCard
