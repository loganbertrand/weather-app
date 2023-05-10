import React from "react"
import styled from "styled-components"

interface ButtonProps {
	onClick: () => void
	children: string
}

const Button = (props: ButtonProps) => {
	return (
		<ButtonContainer onClick={props.onClick}>
			{props.children}
		</ButtonContainer>
	)
}

export default Button

const ButtonContainer = styled.div`
	cursor: pointer;
	height: 50px;
	width: 7rem;
	background-color: white;
	border-radius: 10px;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Roboto;
	font-size: 16px;
`
