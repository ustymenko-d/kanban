import { FC, useState } from 'react'

const DecorSelect: FC = () => {
	const options = ['Jour', 'OPS', 'Semaine', 'Mois']

	const [activeTab, setActiveTab] = useState<string>('Jour')

	const handleChange = (newActiveTab: string): void => {
		setActiveTab(newActiveTab)
	}

	return (
		<div>
			<div
				className='grid grid-cols-4'
				style={{ gridTemplateColumns: 'repeat(4, auto)' }}>
				{options.map((item, index) => (
					<button
						key={`tab-${index}`}
						disabled={activeTab === item}
						onClick={() => handleChange(item)}
						className={`py-1 px-3 border ${
							activeTab === item
								? ' bg-slate-200 text-black '
								: ' text-slate-500 '
						} border-slate-200 duration-200 first:rounded-s last:rounded-e`}>
						{item}
					</button>
				))}
			</div>
		</div>
	)
}

export default DecorSelect
