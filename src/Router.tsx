import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function BrowserRouter() {
	// "/:coinId/*"가 되면 뒤에 뭐가 들어와도 뭔가 보여주려고 함
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path="/" element={<Coins />} />
				<Route path="/:coinId" element={<Coin />}>
					<Route path="price" element={<Price />} />
					<Route path="chart" element={<Chart />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default BrowserRouter;
