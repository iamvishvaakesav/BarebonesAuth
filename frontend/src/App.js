import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Onboard from "./pages/Onboard";
function App() {
	return (
		<Routes>
			<Route path="/" element={<Welcome />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
			<Route path="/onboard" element={<Onboard />}></Route>
		</Routes>
	);
}

export default App;
