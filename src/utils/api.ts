const OPEN_WEATHER_API_KEY = '2fdcb78279a1aa7def127494a6c35ac0'

export async function fetchOpenWeatherData(city: string) {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
	)

	if (!res.ok) {
		throw new Error('City not found!')
	}

	const data = await res.json()
	return data
}
