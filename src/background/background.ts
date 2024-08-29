import { setStoredCities, setStoredOptions } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
	setStoredCities([]),
		setStoredOptions({
			homeCity: 'Berlin',
			tempScale: 'metric',
			hasAutoOverlay: false,
			staticCards: 'hide',
		})
})
