import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { loginUserMutation } from "../graphql/LoginUserMutation";

function Login() {
	const [login, { data, error }] = useMutation(loginUserMutation);
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");

	function handleValueChange(setterFuncation, e) {
		setterFuncation(e.target.value);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(email, password);
		await login({
			variables: {
				email,
				password,
			},
		});

		console.log(data, error);
	}

	return (
		<div>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div className="formControl">
					<h2>Email</h2>
					<input
						type="email"
						onChange={(e) => {
							handleValueChange(setEmail, e);
						}}
					/>
				</div>
				<div className="formControl">
					<h2>Password</h2>
					<input
						type="password"
						onChange={(e) => {
							handleValueChange(setPassowrd, e);
						}}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
export default Login;
