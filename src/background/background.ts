import {
	setStoredCities,
	setStoredOptions,
	getStoredOptions,
} from '../utils/storage'

import { fetchOpenWeatherData } from '../utils/api'

chrome.runtime.onInstalled.addListener(() => {
	setStoredCities([]),
		setStoredOptions({
			homeCity: 'Berlin',
			tempScale: 'metric',
			hasAutoOverlay: false,
			staticCards: 'hide',
		}),
		chrome.alarms.create({
			periodInMinutes: 60,
		})
})

chrome.alarms.onAlarm.addListener(() => {
	getStoredOptions().then((options) => {
		if (options.homeCity === '') {
			return
		}

		fetchOpenWeatherData(options.homeCity, options.tempScale).then(
			(data) => {
				const temp = Math.round(data.main.temp)
				const symbol =
					options.tempScale === 'metric' ? '\u2109' : '\u2103'

				chrome.action.setBadgeText({
					text: `${temp}${symbol}`,
				})
			}
		)
	})
})
