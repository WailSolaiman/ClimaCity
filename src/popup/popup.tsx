import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { fetchOpenWeatherData } from '../utils/api'

import './popup.css'

const App: React.FC<{}> = () => {
	useEffect(() => {
		fetchOpenWeatherData('berlin')
			.then((data) => console.log(data))
			.catch((error) => console.log(error))
	}, [])

	return (
		<div>
			<h1>hello react 18</h1>
		</div>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
