import { sign } from "jsonwebtoken";
import { User } from "../../entities/User";
export const createAccessToken = (user: User | null) => {
	if (!user) return "";
	return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "15m",
	});
};

export const createRefreshToken = (user: User | null) => {
	if (!user) return "";
	return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "3d",
	});
};
