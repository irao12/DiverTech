import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Opportunities from "./pages/Opportunities";
import "./App.css"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<h1>Home Page</h1>}></Route>
						<Route
							path="/opportunities"
							element={<Opportunities />}
						></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
