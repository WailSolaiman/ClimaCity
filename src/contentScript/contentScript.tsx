import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { Card } from '@mui/material'

import WeatherCard from '../components/WeatherCard'

import { getStoredOptions, LocalStorageOptions } from '../utils/storage'
import { Messages } from '../utils/messages'

import './contentScript.css'

const App: React.FC = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [isActive, setIsActive] = useState<boolean>(false)

	useEffect(() => {
		getStoredOptions().then((options) => {
			setOptions(options)
			setIsActive(options.hasAutoOverlay)
		})
	}, [])

	useEffect(() => {
		chrome.runtime.onMessage.addListener((msg) => {
			if (msg === Messages.TOGGLE_OVERLAY) {
				setIsActive(!isActive)
			}
		})
	}, [isActive])

	if (!options) {
		return null
	}

	return (
		<>
			{isActive && (
				<Card className='overlayCard'>
					<WeatherCard
						city={options.homeCity}
						tempScale={options.tempScale}
						onDelete={() => setIsActive(false)}
					/>
				</Card>
			)}
		</>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
