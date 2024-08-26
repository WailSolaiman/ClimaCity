import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Box, Grid, InputBase, IconButton, Paper } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import WeatherCard from './WeatherCard'

import { setStoredCities, getStoredCities } from '../utils/storage'

import '@fontsource/roboto/400.css'
import './popup.css'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([])
	const [cityInput, setCityInput] = useState<string>('')

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities))
	}, [])

	const handleCityButtonClick = () => {
		if (cityInput === '') {
			return
		}

		const updatedCities = [...cities, cityInput]
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities)
			setCityInput('')
		})
	}

	const handleCityDeleteButtonClick = (index: number) => {
		cities.splice(index, 1)
		const updatedCities = [...cities]
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities)
		})
	}

	return (
		<Box mx={'8px'} my={'16px'}>
			<Grid container>
				<Grid item xs={12}>
					<Paper>
						<Box px={'15px'} py={'5px'} sx={{ display: 'flex' }}>
							<InputBase
								value={cityInput}
								onChange={(event) =>
									setCityInput(event.target.value)
								}
								placeholder='Enter city name!'
								sx={{ flexGrow: 1 }}
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
