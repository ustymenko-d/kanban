import { FC, useEffect, useState } from 'react'

interface ToggleSwitchProps {
	active?: boolean
	additionalClasses?: string
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ active, additionalClasses }) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(active || false)

	useEffect(() => {
		if (active !== undefined) {
			setIsEnabled(active)
		}
	}, [active])

	return (
		<label
			className={`flex items-center gap-2 cursor-pointer ${additionalClasses}`}>
			<span
				className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
					isEnabled ? 'bg-green-500' : 'bg-gray-300'
				}`}
				onClick={() => setIsEnabled(!isEnabled)}>
				<span
					className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
						isEnabled ? 'translate-x-4' : 'translate-x-0'
					}`}
				/>
			</span>
		</label>
	)
}

export default ToggleSwitch
