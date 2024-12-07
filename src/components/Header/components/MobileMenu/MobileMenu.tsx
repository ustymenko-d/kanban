import { FC } from 'react'
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon'
import {
	FaBell,
	FaLock,
	FaRegCalendarAlt,
	FaRegUser,
	FaSearch,
} from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { MdOutlineTimer } from 'react-icons/md'
import { FaChartColumn } from 'react-icons/fa6'
import { IoDocumentTextSharp } from 'react-icons/io5'

interface MobileMenuProps {
	screenBreakpoint: number
	isMenuOpen: boolean
}

const MobileMenu: FC<MobileMenuProps> = ({ screenBreakpoint, isMenuOpen }) => {
	return (
		<div
			className={`fixed right-8 z-30 overflow-auto mt-4 rounded-lg p-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-1 bg-white shadow-md ${
				isMenuOpen ? 'block' : 'hidden'
			} `}
			style={{ maxHeight: '75vh' }}>
			<div className='flex flex-col items-start gap-4'>
				<button className='flex items-center gap-3 text-lg text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
					<FaSearch className='pointer-events-none' />
					Search
				</button>
				<button className='flex items-center gap-3 text-lg text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
					<FaBell className='pointer-events-none' />
					Notifications
				</button>

				<button className='-order-1 w-full rounded-lg py-2 px-4 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300'>
					Aide
				</button>

				<div className='-order-2 flex items-center gap-4'>
					<span className='font-medium'>Young&Free</span>

					<div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-300 focus-visible::bg-gray-300 active:bg-gray-400'>
						<FaRegUser />
					</div>
				</div>
				<button className='flex items-center gap-3 text-lg text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
					<FaLock className='pointer-events-none' />
					Security
				</button>
				<button className='flex items-center gap-3 text-lg text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
					<IoIosSettings className='pointer-events-none' />
					Settings
				</button>
			</div>

			{screenBreakpoint === 0 && (
				<div className='grid grid-rows-6 justify-end gap-4'>
					<select
						className='rounded border px-2 py-1 text-sm cursor-pointer text-gray-400 bg-slate-100 border-slate-300'
						defaultValue='Toutes les sections'>
						<option>Toutes les sections</option>
						<option>Section 1</option>
						<option>Section 2</option>
					</select>

					<button className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:bg-green-800'>
						<FaRegCalendarAlt className='text-lg' />
						Horaires{' '}
						<span className='py-1 px-2 rounded-full text-xs text-green-500 bg-white'>
							99+
						</span>
					</button>
					<ButtonWithIcon
						icon={<MdOutlineTimer className='text-green-600' />}
						text='Pointages'
					/>
					<ButtonWithIcon
						icon={<FaRegUser className='text-green-600' />}
						text='Equipe'
						badge='99+'
					/>
					<ButtonWithIcon
						icon={<FaChartColumn className='text-green-600' />}
						text='Rapports'
					/>
					<ButtonWithIcon
						icon={<IoDocumentTextSharp className='text-green-600' />}
						text='Documents'
					/>
				</div>
			)}
		</div>
	)
}

export default MobileMenu
