const OPEN_WEATHER_API_KEY = '2fdcb78279a1aa7def127494a6c35ac0'

export interface OpenWeatherData {
	name: string
	main: {
		feels_like: number
		humidity: number
		pressure: number
		temp: number
		temp_max: number
		temp_min: number
	}
	weather: {
		description: string
		icon: string
		id: number
		main: string
	}[]
	wind: {
		deg: number
		speed: number
	}
}

export type OpenWeatherTempScale = 'metric' | 'imperial'

export type OpenWeatherStaticCardsStatus = 'hide' | 'show'

export async function fetchOpenWeatherData(
	city: string,
	tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
	)

	if (!res.ok) {
		throw new Error('City not found!')
	}

	const data: OpenWeatherData = await res.json()
	return data
}
