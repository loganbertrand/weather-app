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
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
			)
			console.log("API response: ", response.data)
			const tempF = Math.trunc(
				(response.data.main.temp - 273.15) * (9 / 5) + 32
			)
			setTemp(tempF)
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
					<p>Temperature: {temp} Degrees Fahrenheit</p>
				</div>

				<div className={styles.grid}></div>
			</main>
		</>
	)
}

const Title = styled.p`
	font-size: 1.5rem;
`
