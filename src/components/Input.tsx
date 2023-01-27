import React from "react"
import styled from "styled-components"

interface InputValues {
	value: string
}

const Input = (props: InputValues) => {
	return <InputWrapper value={props.value} />
}

export default Input

const InputWrapper = styled.input`
	height: 50;
	width: 60;
`
