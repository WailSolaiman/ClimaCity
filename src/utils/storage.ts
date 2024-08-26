import { OpenWeatherTempScale } from './api'

export interface LocalStorageOptions {
	tempScale: OpenWeatherTempScale
}

export interface LocalStorage {
	cities?: string[]
	options?: LocalStorageOptions
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
	const citiesLs: LocalStorage = { cities }

	return new Promise((resolve) => {
		chrome.storage.local.set(citiesLs, () => resolve())
	})
}

export function getStoredCities(): Promise<string[]> {
	const keys: LocalStorageKeys[] = ['cities']

	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) =>
			resolve(res.cities ?? [])
		)
	})
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
	const optionsLs: LocalStorage = {
		options,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(optionsLs, () => {
			resolve()
		})
	})
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
	const keys: LocalStorageKeys[] = ['options']

	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.options)
		})
	})
}
