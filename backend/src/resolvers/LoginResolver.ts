import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { verify } from "argon2";
import { AccessToken } from "../utils/types/AccessToken";
import { createAccessToken, createRefreshToken } from "../utils/func/auth";
import { ProjectContext } from "src/utils/types/ProjectContext";
// import { GraphQLError } from 'graphql';
@Resolver()
export class LoginResolver {
	@Mutation(() => AccessToken)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { prisma, res }: ProjectContext
	): Promise<AccessToken> {
		// check if user exists
		console.log(email, password);
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (!user) {
			throw new Error("Invalid User, Please signup");
		}
		const valid = await verify(user.password, password);
		if (!valid) {
			throw new Error("Password Invalid");
		}
		// the user logged in successully
		res.cookie("hid", createRefreshToken(user), { httpOnly: true });
		const accessToken = createAccessToken(user);
		return {
			accessToken,
		};
	}
}
