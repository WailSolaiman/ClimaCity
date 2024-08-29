import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
	Box,
	Grid,
	InputBase,
	IconButton,
	Paper,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material'
import {
	Add as AddIcon,
	Image as ImageIcon,
	HideImage as HideImageIcon,
} from '@mui/icons-material'

import WeatherCard from '../components/WeatherCard'

import {
	setStoredCities,
	setStoredOptions,
	getStoredCities,
	getStoredOptions,
	LocalStorageOptions,
} from '../utils/storage'
import { Messages } from '../utils/messages'

import {
	OpenWeatherTempScale,
	OpenWeatherStaticCardsStatus,
} from '../utils/api'

import '@fontsource/roboto/400.css'
import './popup.css'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([])
	const [cityInput, setCityInput] = useState<string>('')
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [tempScaleToggle, setTempScaleToggle] =
		useState<OpenWeatherTempScale>('metric')
	const [staticCardsToggle, setStaticCardsToggle] =
		useState<OpenWeatherStaticCardsStatus>('hide')

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities))
		getStoredOptions().then((options) => {
			setOptions(options)
			setTempScaleToggle(options.tempScale)
			console.log('options.staticCards: ', options.staticCards)
			setStaticCardsToggle(options.staticCards)
		})
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

	const handleTempScaleToggleChange = (
		event: React.MouseEvent<HTMLElement>,
		value: OpenWeatherTempScale
	) => {
		if (value !== null) {
			setTempScaleToggle(value)

			const updatedOptions: LocalStorageOptions = {
				...options,
				tempScale:
					options.tempScale === 'metric' ? 'imperial' : 'metric',
			}

			setStoredOptions(updatedOptions).then(() => {
				setOptions(updatedOptions)
			})
		}
	}

	const handleStaticCardsToggleChange = (
		event: React.MouseEvent<HTMLElement>,
		value: OpenWeatherStaticCardsStatus
	) => {
		if (value !== null) {
			console.log('V: ', value)
			setStaticCardsToggle(value)

			const updatedOptions: LocalStorageOptions = {
				...options,
				staticCards: options.staticCards === 'hide' ? 'show' : 'hide',
			}

			setStoredOptions(updatedOptions).then(() => {
				setOptions(updatedOptions)
			})

			chrome.tabs.query(
				{
					active: true,
					currentWindow: true,
				},
				(tabs) => {
					if (tabs.length > 0) {
						chrome.tabs.sendMessage(
							tabs[0].id,
							Messages.TOGGLE_OVERLAY
						)
					}
				}
			)
		}
	}

	if (!options) {
		return null
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
				<Grid container>
					<Grid item xs={6}>
						<Box py={'5px'}>
							<ToggleButtonGroup
								size='small'
								value={tempScaleToggle}
								onChange={handleTempScaleToggleChange}
								exclusive>
								<ToggleButton value={'metric'} key={'metric'}>
									{'\u2103'}
								</ToggleButton>
								<ToggleButton
									value={'imperial'}
									key={'imperial'}>
									{'\u2109'}
								</ToggleButton>
							</ToggleButtonGroup>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box py={'5px'}>
							<ToggleButtonGroup
								size='small'
								value={staticCardsToggle}
								onChange={handleStaticCardsToggleChange}
								exclusive>
								<ToggleButton value={'show'} key={'show'}>
									<ImageIcon />
								</ToggleButton>
								<ToggleButton value={'hide'} key={'hide'}>
									<HideImageIcon />
								</ToggleButton>
							</ToggleButtonGroup>
						</Box>
					</Grid>
				</Grid>
			</Grid>

			{options.homeCity != '' && (
				<WeatherCard
					city={options.homeCity}
					tempScale={options.tempScale}
				/>
			)}

			{cities.map((city, index) => (
				<WeatherCard
					city={city}
					tempScale={options.tempScale}
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
