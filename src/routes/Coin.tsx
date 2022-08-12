import { useParams, useLocation, useMatch, Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Title = styled.h1`
	font-size: 2.4rem;
	font-weight: 600;
	max-width: 11ch;
	text-overflow: ellipsis;
	overflow-x: clip;
	white-space: nowrap;
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
	position: relative;
	color: ${(props) => props.theme.accentColor};
`;

interface MaterialIconProps {
	name: string;
}

export function MaterialIcon({ name }: MaterialIconProps) {
	return (
		<div className="material-icons-round" style={{ fontSize: "inherit" }}>
			{name}
		</div>
	);
}

const Button = styled(Link)`
	position: absolute;
	left: 0;
	font-size: 2.2rem;
	display: flex;
	align-items: center;
	padding: 0.8rem;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	padding: 1rem;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	span:first-child {
		font-size: 0.75rem;
		font-weight: 700;
		opacity: 0.6;
	}
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 8rem;
	p {
		line-height: 1.5;
	}
`;

const Tab = styled(Link)<{ $isActive: boolean }>`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 3rem;
	font-weight: ${(props) => (props.$isActive ? "700" : "500")};
	color: ${(props) => (props.$isActive ? props.theme.accentColor : props.theme.textColor)};
	opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
	transition: color 0.3s;
	&::after {
		content: "";
		position: absolute;
		height: 2px;
		bottom: 4px;
		width: 1.4rem;
		border-radius: 1px;
		background-color: ${(props) => (props.$isActive ? props.theme.accentColor : props.theme.textColor)};
		transition: background-color 0.3s;
	}
`;

const Tabbar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

interface RouteState {
	state: {
		coinName: string;
	};
}

interface InfoInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	contract: string;
	platform: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

export interface TickersInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const { coinId } = useParams<string>();
	const { state } = useLocation() as RouteState; // 이렇게 쓸 거면 typescript를 쓸 이유가 없다는데
	const priceMatch = useMatch("/:coinId/price");
	const chartMatch = useMatch("/:coinId/chart");

	// without React Query
	// const [loading, setLoading] = useState(true);
	// const [info, setInfo] = useState<InfoData>();
	// const [priceInfo, setPriceInfo] = useState<PriceData>();

	// useEffect(() => {
	// 	(async () => {
	// 		const infoData = await (
	// 			await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
	// 		).json();

	// 		const priceData = await (
	// 			await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
	// 		).json();

	// 		setInfo(infoData);
	// 		setPriceInfo(priceData);
	// 		setLoading(false);
	// 	})();
	// }, [coinId]);

	// with React Query
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface>(["info", coinId], () =>
		fetchCoinInfo(coinId)
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<TickersInterface>(
		["tickers", coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 5000,
		}
	);

	const isLoading = infoLoading || tickersLoading;

	return (
		<Container>
			<Helmet>
				<title>{state?.coinName ? state.coinName : isLoading ? "로딩 중..." : infoData?.name}</title>
			</Helmet>
			<Header>
				<Button to="/">
					<MaterialIcon name="arrow_back" />
				</Button>
				<Title>{state?.coinName ? state.coinName : isLoading ? "로딩 중..." : infoData?.name}</Title>
			</Header>
			{isLoading ? (
				<Loader>{coinId} 로딩 중...</Loader>
			) : (
				<DetailContainer>
					<Overview>
						<OverviewItem>
							<span>티커</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>순위</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>현재가</span>
							<span>${tickersData?.quotes.USD.price.toFixed(3) ?? "Unknown"}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>총량</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>최대 발행량</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					{infoData?.description ? (
						<Overview>
							<p>{infoData?.description}</p>
						</Overview>
					) : null}
					<Tabbar>
						<Tab to={`/${coinId}/price`} $isActive={priceMatch !== null}>
							Price
						</Tab>
						<Tab to={`/${coinId}/chart`} $isActive={chartMatch !== null}>
							Chart
						</Tab>
					</Tabbar>
					<Outlet context={{ coinId, tickersData }} />
				</DetailContainer>
			)}
		</Container>
	);
}

export default Coin;
