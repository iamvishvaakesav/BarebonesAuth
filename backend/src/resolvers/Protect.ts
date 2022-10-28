import { isAuth } from "../utils/func/isAuth";
import { ProjectContext } from "../utils/types/ProjectContext";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class Protect {
	@Query(() => String)
	@UseMiddleware(isAuth)
	sayHi(@Ctx() context: ProjectContext): String {
		return `your user id is ${context.payload?.userId}`;
	}
}
