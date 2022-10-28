import { hash } from "argon2";
import { PrismaContext } from "src/utils/types/PrismaContext";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

// Creats a new user and returns true / false.
@Resolver()
export class SigninResolver {
	@Mutation(() => Boolean)
	async createUser(
		@Arg("firstName") firstName: string,
		@Arg("lastName") lastName: string,
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { prisma }: PrismaContext
	): Promise<boolean> {
		try {
			console.log(firstName);
			const hashedPassword = await hash(password);
			await prisma.user.create({
				data: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: hashedPassword,
				},
			});

			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
