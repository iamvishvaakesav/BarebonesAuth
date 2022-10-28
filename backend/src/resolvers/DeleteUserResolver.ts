import { ProjectContext } from "src/utils/types/ProjectContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class DeleteUserResolver {
	@Mutation()
	async deleteUser(
		@Arg("userId") userId: string,
		@Ctx() { prisma }: ProjectContext
	): Promise<Boolean> {
		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return false;
		}

		// found the user to delete

		const task = await prisma.user.delete({ where: { id: userId } });

		if (task) return true;

		return false;
	}
}
