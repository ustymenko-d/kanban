'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { ITimeCard } from '@/const/const.interfaces'

interface TimeCardProps {
	card: ITimeCard
	onEdit: (card: ITimeCard) => void
	onDelete: (cardId: string) => void
}

const TimeCard: FC<TimeCardProps> = ({ card, onEdit, onDelete }) => {
	const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
	const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
	const contextMenuRef = useRef<HTMLDivElement>(null)

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: card.id,
	})

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenuPosition({
			x: event.clientX,
			y: event.clientY,
		})
		setShowContextMenu(true)
	}

	const handleEdit = () => {
		onEdit(card)
		setShowContextMenu(false)
	}

	const handleDelete = () => {
		const cardId = card.id as string

		onDelete(cardId)
		setShowContextMenu(false)
	}

	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
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

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
				onContextMenu={handleContextMenu}
				className='p-2 m-2 bg-orange-200 dark:bg-neutral-500 rounded'>
				<p>Time: {card.time}</p>
				<p>Date: {card.date}</p>
				<p>UserId: {card.userId}</p>
			</div>

			{showContextMenu && (
				<div
					ref={contextMenuRef}
					className='bg-white shadow-md rounded z-30'
					style={{
						position: 'absolute',
						top: `${contextMenuPosition.y}px`,
						left: `${contextMenuPosition.x}px`,
					}}>
					<ul className='list-none m-0 p-0'>
						<li className='px-4 py-2 cursor-pointer hover:bg-slate-300 dark:text-cyan-950'>
							<button onClick={handleEdit}>edit</button>
						</li>
						<li className='px-4 py-2 cursor-pointer hover:bg-slate-300 dark:text-cyan-950'>
							<button onClick={handleDelete}>delete</button>
						</li>
					</ul>
				</div>
			)}
		</>
	)
}

export default TimeCard
