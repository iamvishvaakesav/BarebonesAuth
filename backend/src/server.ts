// .env
import "dotenv/config";
// GQL
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";

const app = express();
// prisma stuffs
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import cors from "cors";

// type-gql

import { buildSchema } from "type-graphql";

import "reflect-metadata";
import { FindUserResolver } from "./resolvers/FindUserResolver";
import { SigninResolver } from "./resolvers/SigninResolver";
import { LoginResolver } from "./resolvers/LoginResolver";
import { createContext } from "../src/utils/func/createContext";
import { Protect } from "./resolvers/Protect";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessToken } from "./utils/func/auth";
// main function

async function main() {
	app.use(cookieParser());
	app.use(
		cors({
			origin: [
				"http://localhost:3000",
				"https://studio.apollographql.com",
				"http://localhost:2404/graphql",
			],
			credentials: true,
		})
	);

	app.get("/", (_req: Request, res: Response) => {
		res.send("Hi from server");
	});

	app.post("/refresh", async (req, res) => {
		const refreshToken = req.cookies.hid;

		if (!refreshToken) {
			res.send({ ok: false, accessToken: "" });
		}

		let payload: any = null;
		try {
			payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
		} catch (err) {
			console.log(err);
			res.send({ ok: false, accessToken: "" });
		}
		// now I have the refresh token's content and it's valid I can refresh the access token

		const user = await prisma.user.findFirst({ where: { id: payload.userId } });
		if (!user) {
			res.send({ ok: false, accessToken: "" });
		}

		res.send({
			ok: true,
			accessToken: createAccessToken(user),
		});

		res.end();
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [FindUserResolver, SigninResolver, LoginResolver, Protect],
		}),
		context: ({ req, res }) => createContext(req, res, prisma),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(2404, () => {
		console.log("Server is up at 2404");
	});
}

main()
	.catch((e) => {
		console.log(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
