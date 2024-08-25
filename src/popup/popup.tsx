import React from 'react'
import { createRoot } from 'react-dom/client'

import WeatherCard from './WeatherCard'

import '@fontsource/roboto/400.css'
import './popup.css'

const App: React.FC<{}> = () => {
	return (
		<div>
			<WeatherCard city='Berlin' />
			<WeatherCard city='New York' />
			<WeatherCard city='Riyadh' />
			<WeatherCard city='ABC' />
		</div>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
