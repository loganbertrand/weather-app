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
	const [textValue, setTextValue] = useState("")
	const [temp, setTemp] = useState(0)
	const [icon, setIcon] = useState("")
	const [weather, setWeather] = useState({
		temp: 0,
		icon: "",
		feelsLike: 0,
		humidity: "",
		windSpeed: "",
		tempMax: 0,
		tempMin: 0,
		description: "",
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
			setWeather({
				temp: Math.trunc(response.data.main.temp),
				icon: response.data.weather[0].icon,
				feelsLike: Math.trunc(response.data.main.feels_like),
				humidity: response.data.main.humidity,
				windSpeed: response.data.wind.speed,
				tempMax: Math.trunc(response.data.main.temp_max),
				tempMin: Math.trunc(response.data.main.temp_min),
				description: response.data.weather[0].description,
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
					content="A Weather App built with React, Typescript, and Styled components for unique design and full front end experience showcase"
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

				<div className={styles.center}>
					<Input
						value={textValue}
						onChange={handleChange}
						onKeyDown={checkKeyDown}
					/>
					<Button onClick={handleSubmit}>Submit</Button>
					<Icon
						src={`https://openweathermap.org/img/wn/${
							weather.icon ? weather.icon : "01d"
						}@2x.png`}
						width={100}
						height={100}
						alt="Icon of the type of weather"
					/>
					<p>{weather.description}</p>
					<p>Temperature: {weather.temp}° F</p>
					<p>Feels Like:{weather.feelsLike}° F</p>
					<p>High:{weather.tempMax}° F</p>
					<p>Low: {weather.tempMin}° F</p>
					<p>Humidity:{weather.humidity}%</p>
					<p>Wind:{weather.windSpeed} mph</p>
				</div>

				<div className={styles.grid}></div>
			</main>
		</>
	)
}

const Title = styled.p`
	font-size: 1.5rem;
`

const Icon = styled(Image)``
