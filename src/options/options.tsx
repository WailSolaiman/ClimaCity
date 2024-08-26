import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
} from '@mui/material'

import {
	getStoredOptions,
	setStoredOptions,
	LocalStorageOptions,
} from '../utils/storage'

import '@fontsource/roboto/400.css'
import './options.css'

const App: React.FC = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)

	useEffect(() => {
		getStoredOptions().then((options) => setOptions(options))
	}, [])

	const handleHomeCityChange = (homeCity: string) => {
		setOptions({
			...options,
			homeCity,
		})
	}

	const handleSavedOptions = () => {
		setStoredOptions(options)
	}

	if (!options) {
		return null
	}

	return (
		<Box mx={'10%'} my={'2%'}>
			<Card>
				<CardContent>
					<Grid container direction={'column'} spacing={4}>
						<Grid item>
							<Typography variant='h4'>ClimaCity 1.0</Typography>
						</Grid>
						<Grid item>
							<TextField
								label='Enter a home city name'
								variant='standard'
								value={options.homeCity}
								onChange={(e) =>
									handleHomeCityChange(e.target.value)
								}
							/>
						</Grid>
						<Grid item>
							<Button
								variant='outlined'
								color='primary'
								onClick={handleSavedOptions}>
								Save Options
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
