'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useDndMonitor, useDraggable } from '@dnd-kit/core'
import { ITimeCard } from '@/const/const.interfaces'
import { useAppStore } from '@/store/store'
import ContextMenu from './components/ContextMenu'
import { FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa'

interface TimeCardProps {
	card: ITimeCard
	onEdit: (card: ITimeCard) => void
}

const TimeCard: FC<TimeCardProps> = ({ card, onEdit }) => {
	const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
	const [contextMenuPosition, setContextMenuPosition] = useState<{
		x: number
		y: number
	}>({ x: 0, y: 0 })
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

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenuPosition({
			x: event.clientX,
			y: event.clientY,
		})
		setShowContextMenu(true)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target as Node)
			) {
				setShowContextMenu(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleViewDetails = () => {
		onEdit(card)
		setShowContextMenu(false)
	}

	const handleEdit = () => {
		updateIsCardEditing(true)
		onEdit(card)
		setShowContextMenu(false)
	}

	const handleDelete = () => {
		toggleDeleteModalOpen(card)
		setShowContextMenu(false)
	}

	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		cursor: isDragging ? 'grabbing' : 'grab',
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
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

			{showContextMenu && (
				<ContextMenu
					contextMenuRef={contextMenuRef}
					contextMenuPosition={contextMenuPosition}
					handleViewDetails={handleViewDetails}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			)}
		</>
	)
}

export default TimeCard
