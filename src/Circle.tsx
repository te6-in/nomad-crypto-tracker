import { useState } from "react";
import styled from "styled-components";
import { isPropertySignature } from "typescript";

interface ContainerProps {
	bgColor: string;
	borderColor: string;
}

const Container = styled.div<ContainerProps>`
	width: 100px;
	height: 100px;
	background-color: ${(props) => props.bgColor};
	border: 4px solid ${(props) => props.borderColor || "black"};
	border-radius: 50%;
`;

interface CircleProps {
	bgColor: string;
	borderColor?: string;
	text?: string;
}

function Circle({ bgColor, borderColor, text = "default test" }: CircleProps) {
	const [counter, setCounter] = useState(0);

	return (
		<Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
			{text}
		</Container>
	);
}

export default Circle;
