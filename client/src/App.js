import { BrowserRouter, Routes, Route } from "react-router-dom";
import Opportunities from "./pages/Opportunities";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.js";
import About from "./pages/About";
import "./App.css";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/">
						<Route index element={<Home />}></Route>
						<Route
							path="/opportunities"
							element={<Opportunities />}
						></Route>
						<Route path="/about" element={<About />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
