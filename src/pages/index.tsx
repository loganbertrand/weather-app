import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styled from "styled-components"
import axios from "axios"

import styles from "@/styles/Home.module.css"
import Input from "@/components/Input"
import Button from "@/components/Button"

export default function Home() {
	const [array, setArray] = useState([])
	const [loading, setLoading] = useState(false)
	const [textValue, setTextValue] = useState("")
	const [weather, setWeather] = useState({
		temp: 0,
		icon: "",
		feelsLike: 0,
		humidity: "",
		windSpeed: "",
		tempMax: 0,
		tempMin: 0,
		description: "",
		date: "",
		time: "",
		location: "",
	})

	const handleChange = (e: any) => {
		setTextValue(e.target.value)
	}

	const checkKeyDown = (e: any) => {
		if (e.key === "Enter") {
			console.log("enter key was hit")
			handleSubmit()
		}
	}

	const forecastList = array.map((data: any) => {
		return (
			<span className={styles.card} key={data.dt}>
				<Icon
					src={`https://openweathermap.org/img/wn/${
						data.weather[0].icon ? data.weather[0].icon : "01d"
					}@2x.png`}
					width={50}
					height={50}
					alt="Icon of the type of weather"
				/>
				<ForecastTemp>{Math.trunc(data.main.temp)}</ForecastTemp>
				<p>{new Date(data.dt * 1000).toDateString()}</p>
			</span>
		)
	})

	const handleSubmit = async () => {
		setLoading(true)
		const city = textValue
		const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
			)
			console.log("API response: ", response.data)

			const forecast = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
			)
			console.log("Forecast data: ", forecast.data)

			const listData = forecast.data.list
			const forecastArray: any = []

			listData.forEach((element: any) => {
				const time = new Date(element.dt * 1000).toLocaleTimeString()
				console.log(time)
				if (time == "2:00:00 PM") {
					console.log("there is something here")
					forecastArray.push(element)
				}
			})
			setArray(forecastArray)
			setWeather({
				temp: Math.trunc(response.data.main.temp),
				icon: response.data.weather[0].icon,
				feelsLike: Math.trunc(response.data.main.feels_like),
				humidity: response.data.main.humidity,
				windSpeed: response.data.wind.speed,
				tempMax: Math.trunc(response.data.main.temp_max),
				tempMin: Math.trunc(response.data.main.temp_min),
				description: response.data.weather[0].description,
				date: new Date(response.data.dt * 1000).toDateString(),
				time: new Date(response.data.dt * 1000).toLocaleTimeString(),
				location: response.data.name,
			})
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Weather App | Logan Bertrand</title>
				<meta
					name="description"
					content="A Weather App built with React, Typescript, Next js and Styled components for unique design and full front end experience showcase"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.description}>
					<Title>Weather App</Title>
				</div>
				<Input
					value={textValue}
					onChange={handleChange}
					onKeyDown={checkKeyDown}
				/>
				<Button onClick={handleSubmit}>Submit</Button>
				<div className={styles.center}>
					<div className={styles.weatherMain}>
						<div>
							<Location>{weather.location}</Location>
							<Temperature> {weather.temp}° F</Temperature>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<p>High:{weather.tempMax}° F</p>
								<p>Low: {weather.tempMin}° F</p>
							</div>
							<p>{weather.description}</p>

							<p>Feels Like:{weather.feelsLike}° F</p>

							<p>Humidity:{weather.humidity}%</p>
							<p>Wind:{weather.windSpeed} mph</p>
						</div>
						<div>
							<Icon
								src={`https://openweathermap.org/img/wn/${
									weather.icon ? weather.icon : "01d"
								}@2x.png`}
								width={150}
								height={150}
								alt="Icon of the type of weather"
							/>
						</div>
					</div>
					{!loading && array.length >= 1 && (
						<div className={styles.forecastWrap}>
							<Title>Forecast</Title>
							<div className={styles.grid}>{forecastList}</div>
						</div>
					)}
				</div>
			</main>
		</>
	)
}

const Title = styled.p`
	font-size: 1.5rem;
	font-family: Roboto;
`
const Location = styled.p`
	font-size: 2rem;
	font-family: Roboto;
`
const Temperature = styled.p`
	font-size: 4.5rem;
	font-family: Roboto;
	font-weight: 700;
`
const ForecastTemp = styled.p`
	font-size: 2rem;
	font-family: Roboto;
	font-weight: 700;
`

const Icon = styled(Image)``
