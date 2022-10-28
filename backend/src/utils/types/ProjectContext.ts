import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export interface ProjectContext {
	req: Request;
	res: Response;
	prisma: PrismaClient;
	payload?: { userId: string };
}
