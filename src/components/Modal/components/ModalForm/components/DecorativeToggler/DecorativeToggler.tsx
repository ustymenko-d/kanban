import { FC, useState } from 'react'

const DecorativeToggler: FC = () => {
	const [isShiftActive, setIsShiftActive] = useState<boolean>(true)

	const handleToggleActive = (): void => {
		setIsShiftActive((prev) => !prev)
	}
	return (
		<div className='grid grid-cols-2 '>
			<button
				disabled={isShiftActive}
				onClick={handleToggleActive}
				className={`py-2 px-4 rounded-s border ${
					isShiftActive ? ' bg-slate-200 ' : ' '
				} border-slate-200 duration-200 `}>
				Shift
			</button>
			<button
				disabled={!isShiftActive}
				onClick={handleToggleActive}
				className={`py-2 px-4 rounded-e border ${
					!isShiftActive ? ' bg-slate-200 ' : ' '
				} border-slate-200 duration-200`}>
				Absence
			</button>
		</div>
	)
}

export default DecorativeToggler
