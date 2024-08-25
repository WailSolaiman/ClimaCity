import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCardContainer: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Box mx={'5px'} my={'16px'}>
			<Card>
				<CardContent>{children}</CardContent>
			</Card>
		</Box>
	)
}

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
	const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
	const [cardState, setCardState] = useState<WeatherCardState>('loading')

	useEffect(() => {
		fetchOpenWeatherData(city)
			.then((data) => {
				setWeatherData(data)
				setCardState('ready')
			})
			.catch(() => setCardState('error'))
	}, [city])

	if (cardState == 'loading' || cardState == 'error') {
		return (
			<WeatherCardContainer>
				<Typography>
					{cardState == 'loading'
						? 'loading...'
						: 'Error: City not found'}
				</Typography>
			</WeatherCardContainer>
		)
	}

	return (
		<WeatherCardContainer>
			<Typography variant='h5'>{weatherData.name}</Typography>
			<Typography variant='body1'>
				{Math.round(weatherData.main.temp)}
			</Typography>
			<Typography variant='body1'>
				Feels like: {Math.round(weatherData.main.feels_like)}
			</Typography>
		</WeatherCardContainer>
	)
}

export default WeatherCard
