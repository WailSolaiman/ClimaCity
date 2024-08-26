import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Box, Grid, InputBase, IconButton, Paper } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import WeatherCard from './WeatherCard'

import '@fontsource/roboto/400.css'
import './popup.css'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([
		'Berlin',
		'New York',
		'Riyadh',
	])
	const [cityInput, setCityInput] = useState<string>('')

	const handleCityButtonClick = () => {
		if (cityInput === '') {
			return
		}

		setCities([...cities, cityInput])
		setCityInput('')
	}

	const handleCityDeleteButtonClick = (index: number) => {
		cities.splice(index, 1)
		setCities([...cities])
	}

	return (
		<Box mx={'8px'} my={'16px'}>
			<Grid container>
				<Grid item>
					<Paper>
						<Box px={'15px'} py={'5px'}>
							<InputBase
								value={cityInput}
								onChange={(event) =>
									setCityInput(event.target.value)
								}
								placeholder='Enter city name!'
							/>
							<IconButton onClick={handleCityButtonClick}>
								<AddIcon />
							</IconButton>
						</Box>
					</Paper>
				</Grid>
			</Grid>

			{cities.map((city, index) => (
				<WeatherCard
					city={city}
					onDelete={() => handleCityDeleteButtonClick(index)}
					key={index}
				/>
			))}

			<Box height={'16px'} />
		</Box>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
