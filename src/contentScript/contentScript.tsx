import React from 'react'
import { createRoot } from 'react-dom/client'

import { Card } from '@mui/material'

import WeatherCard from '../components/WeatherCard'

import './contentScript.css'

const App: React.FC = () => {
	return (
		<Card className='overlayCard'>
			<WeatherCard city='Berlin' tempScale='metric' />
		</Card>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
