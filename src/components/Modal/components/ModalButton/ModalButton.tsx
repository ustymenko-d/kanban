import { FC } from 'react'

interface ModalButtonProps {
	text: string
	onClick: () => void
	bgColor: string
}

const ModalButton: FC<ModalButtonProps> = ({ text, onClick, bgColor }) => (
	<button
		onClick={onClick}
		className={`px-4 py-2 w-full rounded text-white ${bgColor} hover:bg-opacity-90 focus-visible:bg-opacity-90 active:bg-opacity-80 duration-200`}>
		{text}
	</button>
)

export default ModalButton
