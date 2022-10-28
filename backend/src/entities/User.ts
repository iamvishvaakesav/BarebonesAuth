import { Field, ObjectType } from "type-graphql";
import "reflect-metadata";
@ObjectType()
export class User {
	@Field()
	id: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	email: string;

	password: string;
}
