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
	const forecastArray: Array<any> = []
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

	const handleSubmit = async () => {
		console.log(
			"submit. API Key? ",
			process.env.NEXT_PUBLIC_OPENWEATHER_API
		)
		const city = textValue
		const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
			)
			console.log("API response: ", response.data)
			console.log(
				"Date format: ",
				new Date(response.data.dt * 1000).toDateString()
			)

			const forecast = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
			)
			console.log("Forecast data: ", forecast.data)

			const listData = forecast.data.list

			listData.forEach((element: any) => {
				console.log(element)
				const time = new Date(element.dt * 1000).toLocaleTimeString()

				console.log(time)
				if (time == "2:00:00 PM") {
					console.log("there is something here")
					forecastArray.push(element)
				}
			})

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
					<div
						style={{
							width: "70%",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
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
					<div>
						<Title>Forecast</Title>
						<div>
							{forecastArray.map((data: any) => {
								return (
									<div className={styles.card} key={data.dt}>
										<p>{data.main.temp}</p>
										<p>
											{new Date(
												data.dt * 1000
											).toDateString()}
										</p>
										<p>test</p>
									</div>
								)
							})}
						</div>
					</div>
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

const Icon = styled(Image)``
