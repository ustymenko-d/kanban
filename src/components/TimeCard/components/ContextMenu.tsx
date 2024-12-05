import { FC, RefObject } from 'react'

interface ContextMenuProps {
	contextMenuRef: RefObject<HTMLDivElement>
	contextMenuPosition: { x: number; y: number }
	handleEdit: () => void
	handleDelete: () => void
}

const ContextMenu: FC<ContextMenuProps> = ({
	contextMenuRef,
	contextMenuPosition,
	handleEdit,
	handleDelete,
}) => {
	return (
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
	)
}

export default ContextMenu
