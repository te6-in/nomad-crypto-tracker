import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
	display: flex;
	background-color: ${(props) => props.theme.backgroundColor};
`;

const animation = keyframes`
	0% {
		transform: rotate(0deg);
		border-radius: 0px;
	}
	50% {
		transform: rotate(360deg);
		border-radius: 50%;
	}
	100% {
		transform: rotate(0deg);
		border-radius: 0px;
	}
`;

const Title = styled.h1`
	color: ${(props) => props.theme.textColor};
`;

const Emoji = styled.span`
	font-size: 72px;
`;

const Box = styled.div`
	height: 200px;
	width: 200px;
	background-color: ${(props) => props.theme.boxColor};
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${animation} 2s linear infinite;

	&:hover {
		background-color: green;
	}

	${Emoji} {
		&:hover {
			font-size: 100px;
		}
	}
`;

function App() {
	return (
		<Wrapper>
			<Title>This is a Title Component!</Title>
			<Box>
				<Emoji>😸</Emoji>
			</Box>
			<Emoji>🧢</Emoji>
		</Wrapper>
	);
}

export default App;
