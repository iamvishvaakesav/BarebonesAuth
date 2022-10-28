import { Arg, Ctx, Resolver, Query } from "type-graphql";
// import { hash } from "argon2";
import { User } from "../entities/User";
import { PrismaContext } from "src/utils/types/PrismaContext";
import "reflect-metadata";

@Resolver()
export class FindUserResolver {
	@Query(() => User, { nullable: true })
	async findUser(
		@Arg("firstName") firstName: string,
		@Ctx() { prisma }: PrismaContext
	): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: {
				firstName,
			},
		});
		return user;
	}
}
