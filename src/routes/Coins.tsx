import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";

const Title = styled.h1`
	font-size: 2.4rem;
	font-weight: 600;
	color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
	padding: 0 2rem;
	max-width: 30rem;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 8rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const CoinsList = styled.ul`
	display: flex;
	gap: 1rem;
	flex-direction: column;
`;

const Coin = styled.li`
	display: flex;
	align-items: center;
	min-height: 3.5rem;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	transition: background-color 0.3s, box-shadow 0.3s;
	a {
		display: flex;
		padding: 1rem;
		width: 100%;
		align-items: center;
		transition: color 0.3s;
	}
	&:hover {
		color: ${(props) => props.theme.accentColor};
		box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
	}
	&:active {
		background-color: ${(props) => props.theme.activeCardColor};
		box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
	}
	&:last-child {
		margin-bottom: 8rem;
	}
`;

const Logo = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.7rem;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	// without React Query
	// const [loading, setLoading] = useState(true);
	// const [coins, setCoins] = useState<CoinInterface[]>([]);
	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch("https://api.coinpaprika.com/v1/coins");
	// 		const json = await response.json();
	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// }, []);

	// with React Query
	const { isLoading, data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);

	return (
		<Container>
			<Helmet>
				<title>Cryptocurrencies</title>
			</Helmet>
			<Header>
				<Title>Cryptocurrencies</Title>
			</Header>
			{isLoading ? (
				<Loader>로딩 중...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}/price`} state={{ coinName: coin.name }}>
								<Logo
									src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
									onError={(i) => (i.currentTarget.style.display = "none")}
									alt={`${coin.name} 로고`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
