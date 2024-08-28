import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Switch,
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

type FormState = 'ready' | 'saving'

const App: React.FC = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [formState, setFormState] = useState<FormState>('ready')

	useEffect(() => {
		getStoredOptions().then((options) => setOptions(options))
	}, [])

	const handleHomeCityChange = (homeCity: string) => {
		setOptions({
			...options,
			homeCity,
		})
	}

	const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
		setOptions({
			...options,
			hasAutoOverlay,
		})
	}

	const handleSavedOptions = () => {
		setFormState('saving')
		setStoredOptions(options).then(() => {
			setTimeout(() => {
				setFormState('ready')
			}, 1000)
		})
	}

	const isFieldDisabled = formState === 'saving'

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
								disabled={isFieldDisabled}
								label='Enter a home city name'
								variant='standard'
								value={options.homeCity}
								onChange={(e) =>
									handleHomeCityChange(e.target.value)
								}
							/>
						</Grid>
						<Grid item>
							<Typography variant='body2'>
								Toggle Static Cards
							</Typography>
							<Switch
								color='primary'
								checked={options.hasAutoOverlay}
								onChange={(event, checked) =>
									handleAutoOverlayChange(checked)
								}
								disabled={isFieldDisabled}
							/>
						</Grid>
						<Grid item>
							<Button
								disabled={isFieldDisabled}
								variant='outlined'
								color='primary'
								onClick={handleSavedOptions}>
								{formState === 'ready'
									? 'Save Options'
									: 'Saving...'}
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
