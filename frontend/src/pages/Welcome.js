import React from "react";
import styles from "../styles/Welcome.module.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
	const navigate = useNavigate();

	return (
		<div className={styles.buttonSuperContainer}>
			<div>
				<button
					onClick={() => {
						navigate("/login");
					}}
				>
					Login
				</button>
			</div>
			<div
				onClick={() => {
					navigate("/signup");
				}}
			>
				<button> Sign Up</button>
			</div>
		</div>
	);
}

export default Welcome;
