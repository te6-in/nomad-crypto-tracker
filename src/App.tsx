import { createGlobalStyle } from "styled-components";
import BrowserRouter from "./Router";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLightAtom } from "./atoms";
import styled from "styled-components";
import { MaterialIcon } from "./routes/Coin";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: "Pretendard", sans-serif;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
	transition: background-color 0.3s, color 0.3s;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	text-decoration: none;
	color: inherit;
}
* {
	box-sizing: border-box;
}
`;

const Toggle = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 1rem;
	left: 1rem;
	width: 3rem;
	height: 3rem;
	padding: 0;
	font-size: 1.6rem;
	border: none;
	border-radius: 50%;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.accentColor};
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	transition: background-color 0.3s, box-shadow 0.3s;
	cursor: pointer;
	&:hover {
		box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
	}
	&:active {
		background-color: ${(props) => props.theme.activeCardColor};
		box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
	}
`;

function App() {
	const isLight = useRecoilValue(isLightAtom);
	const setIsLightAtom = useSetRecoilState(isLightAtom);
	const toggleTheme = () => setIsLightAtom((current) => !current);

	return (
		<>
			<ThemeProvider theme={isLight ? lightTheme : darkTheme}>
				<Toggle onClick={toggleTheme}>
					<MaterialIcon name={isLight ? "dark_mode" : "light_mode"} />
				</Toggle>
				<GlobalStyle />
				<BrowserRouter />
				{/* <ReactQueryDevtools initialIsOpen={true} /> */}
			</ThemeProvider>
		</>
	);
}

export default App;
