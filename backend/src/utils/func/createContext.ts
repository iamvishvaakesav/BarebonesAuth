import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function createContext(
	req: Request,
	res: Response,
	prisma: PrismaClient
) {
	return {
		req,
		res,
		prisma,
	};
}
