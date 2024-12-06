import { FC } from 'react'
import { FaChartColumn } from 'react-icons/fa6'
import { MdArrowDropDown, MdOutlineRocketLaunch } from 'react-icons/md'

const DecorativeHeadBlock: FC = () => {
	return (
		<>
			<button className='h-10 aspect-square rounded-lg flex items-center justify-center hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300'>
				<FaChartColumn className='pointer-events-none' />
			</button>

			<div className='relative flex items-center gap-2'>
				<label className='py-1 px-4 min-h-10 flex items-center gap-1 cursor-pointer bg-gray-100 rounded-md hover:bg-gray-200'>
					<span className='w-fit text-sm font-bold'>Plus</span>
					<MdArrowDropDown className='text-xl text-gray-600 pointer-events-none' />
					<select
						className='absolute opacity-0 cursor-pointer w-full h-full left-0 top-0'
						defaultValue=''>
						<option
							value=''
							disabled>
							Select Option
						</option>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</select>
				</label>
			</div>

			<button className='h-10 aspect-square rounded-lg flex items-center justify-center text-white bg-sky-300 hover:bg-sky-400 focus-visible:bg-sky-400 active:bg-sky-500'>
				<MdOutlineRocketLaunch className='pointer-events-none' />
			</button>
		</>
	)
}

export default DecorativeHeadBlock
