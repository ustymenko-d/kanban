import { FC } from 'react'

interface ButtonWithIconProps {
	icon: JSX.Element
	text: string
	badge?: string
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ icon, text, badge }) => (
	<button className='px-3 rounded-lg text-sm font-medium flex gap-2 items-center uppercase hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300'>
		{icon}
		{text}
		{badge && (
			<span className='py-1 px-2 rounded-full text-xs text-white bg-green-500'>
				{badge}
			</span>
		)}
	</button>
)

export default ButtonWithIcon
