'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import ButtonWithIcon from './components/ButtonWithIcon/ButtonWithIcon'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import {
	FaBell,
	FaLock,
	FaRegCalendarAlt,
	FaRegUser,
	FaSearch,
	FaBars,
} from 'react-icons/fa'
import { FaChartColumn } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { MdOutlineTimer } from 'react-icons/md'
import MobileMenu from './components/MobileMenu/MobileMenu'

const Header: FC = () => {
	const screenBreakpoint = useBreakpoints([1279, 1536])
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false)
		}
	}, [screenBreakpoint])

	return (
		<header className='py-3 px-10 w-full shadow-md bg-white'>
			<div className='flex items-center justify-between'>
				<div className='flex gap-4'>
					<div className='mr-6 flex items-center text-2xl font-black'>
						<Link
							href='/'
							className='inline-block'>
							shyft
						</Link>
					</div>
					{screenBreakpoint !== 0 && (
						<>
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
						</>
					)}
				</div>

				{screenBreakpoint === 2 && (
					<div className='flex items-center gap-4'>
						<button className='text-xl text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
							<FaSearch className='pointer-events-none' />
						</button>
						<button className='text-xl text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
							<FaBell className='pointer-events-none' />
						</button>
						<button className='rounded-lg py-2 px-4 hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300'>
							Aide
						</button>

						<div className='flex items-center gap-4'>
							<span className='font-medium'>Young&Free</span>

							<div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-300 focus-visible::bg-gray-300 active:bg-gray-400'>
								<FaRegUser />
							</div>
						</div>
						<button className='text-xl text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
							<FaLock className='pointer-events-none' />
						</button>
						<button className='text-2xl text-gray-400 cursor-pointer hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'>
							<IoIosSettings className='pointer-events-none' />
						</button>
					</div>
				)}

				{screenBreakpoint !== 2 && (
					<button
						className='text-2xl text-gray-400 hover:text-gray-500 focus-visible:text-gray-500 active:text-gray-600'
						onClick={toggleMenu}>
						<FaBars />
					</button>
				)}
			</div>

			{screenBreakpoint !== 2 && (
				<MobileMenu
					isMenuOpen={isMenuOpen}
					screenBreakpoint={screenBreakpoint}
				/>
			)}
		</header>
	)
}

export default Header
