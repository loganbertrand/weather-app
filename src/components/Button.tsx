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
	background-color: blue;
	color: white;
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`
