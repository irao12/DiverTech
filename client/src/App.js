import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route index="/" element={<h1>Home Page</h1>}></Route>
					<Route index="opportunities"></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
