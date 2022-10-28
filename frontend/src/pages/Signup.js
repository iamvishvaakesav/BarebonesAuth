import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CreateUser } from "../graphql/CreateUser";

function Signup() {
	const navigate = useNavigate();
	const [createUser] = useMutation(CreateUser);
	//local state for user object
	const [user, setUser] = useState({});

	//use it to push to server and update db
	async function handleSubmit(e) {
		e.preventDefault();
		await createUser({
			variables: {
				password: user.password,
				email: user.email,
				lastName: user.lastName,
				firstName: user.firstName,
			},
		});

		console.log(user);
		navigate("/");
	}

	//gets and stores the value in local state
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	// add validation

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="formControls">
					<h2>First Name</h2>
					<input
						type="text"
						name="firstName"
						style={{ border: "2px solid black" }}
						onChange={handleChange}
					></input>
				</div>
				<div className="formControls">
					<h2>Last Name</h2>
					<input
						type="text"
						name="lastName"
						style={{ border: "2px solid black" }}
						onChange={handleChange}
					></input>
				</div>
				<div className="formControls">
					<h2>Email</h2>
					<input
						type="email"
						name="email"
						style={{ border: "2px solid black" }}
						onChange={handleChange}
					></input>
				</div>
				<div className="formControls">
					<h2>Let's set a password</h2>
					<input
						type="password"
						name="password"
						style={{ border: "2px solid black" }}
						onChange={handleChange}
					></input>
				</div>
				<button type="submit"> Sign In</button>
			</form>
		</div>
	);
}

export default Signup;
