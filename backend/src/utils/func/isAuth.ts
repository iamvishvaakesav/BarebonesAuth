import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { ProjectContext } from "../types/ProjectContext";

// bearer token val
// example : bearer asodkad9231023dadajdaksm

export const isAuth: MiddlewareFn<ProjectContext> = ({ context }, next) => {
	// gets the authorization header form the incoming  request
	const authorization = context.req.headers["authorization"];

	if (!authorization) {
		throw new Error("Not authenticated");
	}

	try {
		// try spliting the auth in space

		const token = authorization.split(" ")[1]; // splits it on space and returns the second valaue i.e the token
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		// the payload is whatever you have asked jsonwebtoken to store locally and in case it's the user id
		context.payload = payload as any;
	} catch (error) {
		console.log(error);
		throw new Error("Not authenticated");
	}

	// after try catch if valid token was passed and payload was retrevied, we can store it in project context
	return next();
};
