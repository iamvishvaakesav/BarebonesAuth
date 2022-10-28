import { gql } from "@apollo/client";

export const CreateUser = gql`
	mutation CreateUser(
		$password: String!
		$email: String!
		$lastName: String!
		$firstName: String!
	) {
		createUser(
			password: $password
			email: $email
			lastName: $lastName
			firstName: $firstName
		)
	}
`;
