import React from "react"
import styled from "styled-components"

interface InputValues {
	value: string
	onChange: (e?: any) => void
	onKeyDown: (e?: any) => void
}

const Input = (props: InputValues) => {
	return (
		<InputWrapper
			value={props.value}
			onChange={props.onChange}
			onKeyDown={props.onKeyDown}
		/>
	)
}

export default Input

const InputWrapper = styled.input`
	height: 70px;
	width: 70%;
	@media (max-width: 768px) {
		width: 100%;
	}
	font-size: 2rem;
	font-family: Roboto;
	margin: 2.5rem 0;
`
