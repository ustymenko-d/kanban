import { FC, RefObject } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

interface ContextMenuProps {
	contextMenuRef: RefObject<HTMLDivElement>
	contextMenuPosition: { x: number; y: number }
	handleViewDetails: () => void
	handleEdit: () => void
	handleDelete: () => void
}

const ContextMenu: FC<ContextMenuProps> = ({
	contextMenuRef,
	contextMenuPosition,
	handleEdit,
	handleDelete,
	handleViewDetails,
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
				<li>
					<button
						className='py-2 px-4 w-full flex items-center gap-2 cursor-pointer bg-white hover:bg-slate-300 focus-visible:bg-slate-300 active:bg-slate-400'
						onClick={handleViewDetails}>
						<BiDetail /> View details
					</button>
				</li>
				<li>
					<button
						className='py-2 px-4 w-full flex items-center gap-2 cursor-pointer bg-white hover:bg-slate-300 focus-visible:bg-slate-300 active:bg-slate-400'
						onClick={handleEdit}>
						<FaRegEdit /> Edit
					</button>
				</li>
				<li>
					<button
						className='py-2 px-4 w-full flex items-center gap-2 cursor-pointer text-red-500 bg-white hover:bg-slate-300 focus-visible:bg-slate-300 active:bg-slate-400'
						onClick={handleDelete}>
						<MdDeleteOutline /> Delete
					</button>
				</li>
			</ul>
		</div>
	)
}

export default ContextMenu
