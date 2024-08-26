import React, { useEffect, useState } from 'react'
import {
	Box,
	Card,
	CardContent,
	Typography,
	CardHeader,
	IconButton,
} from '@mui/material'
import { RemoveCircle } from '@mui/icons-material'
import {
	fetchOpenWeatherData,
	OpenWeatherData,
	OpenWeatherTempScale,
} from '../../utils/api'

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCardContainer: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return (
		<Box my={'16px'}>
			<Card>{children}</Card>
		</Box>
	)
}

const WeatherCard: React.FC<{
	city: string
	tempScale: OpenWeatherTempScale
	onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
	const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
	const [cardState, setCardState] = useState<WeatherCardState>('loading')

	useEffect(() => {
		fetchOpenWeatherData(city, tempScale)
			.then((data) => {
				setWeatherData(data)
				setCardState('ready')
			})
			.catch(() => setCardState('error'))
	}, [city, tempScale])

	if (cardState == 'loading' || cardState == 'error') {
		return (
			<WeatherCardContainer>
				<CardHeader
					action={
						<IconButton aria-label='delete'>
							{onDelete && cardState != 'loading' && (
								<RemoveCircle
									color='error'
									onClick={onDelete}
								/>
							)}
						</IconButton>
					}
					title={
						cardState == 'loading' ? 'loading...' : 'City not found'
					}
				/>
			</WeatherCardContainer>
		)
	}

	return (
		<WeatherCardContainer>
			<CardHeader
				action={
					<IconButton aria-label='delete'>
						{onDelete && (
							<RemoveCircle color='error' onClick={onDelete} />
						)}
					</IconButton>
				}
				title={weatherData.name}
			/>
			<CardContent>
				<Typography variant='body1'>
					{Math.round(weatherData.main.temp)}
				</Typography>
				<Typography variant='body1'>
					Feels like: {Math.round(weatherData.main.feels_like)}
				</Typography>
			</CardContent>
		</WeatherCardContainer>
	)
}

export default WeatherCard
