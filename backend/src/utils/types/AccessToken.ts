import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AccessToken {
	@Field()
	accessToken: string;
}
