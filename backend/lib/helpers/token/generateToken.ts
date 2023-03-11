import config from "config";
import { User } from "../../models/User";
import jwt, { Secret } from "jsonwebtoken";

export const generateToken = (user: User) => {
  try {
    const payload = { userID: user._id, roles: user.isAdmin };
    const key = config.get<Secret>("ACCESS_TOKEN_PRIVATE_KEY") || "";
    if (key === null || key === "") {
      return Promise.reject("Something wrong with token key");
    }
    const accessToken = jwt.sign(payload, key, { expiresIn: "3d" });
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
