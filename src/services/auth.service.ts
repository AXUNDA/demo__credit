import db from "../db/database";
import * as argon2 from "argon2";
import CustomError from "../errors/custom_error";
import jwtService from "./jwt.service";
import walletService from "./wallet.service";
import uuid from "uuid-random";

type userDetails = {
  email: string;
  password: string;
};

export default {
  async createUser(body: userDetails) {
    try {
      const hash = await argon2.hash(body.password);

      const response = await db("users").insert({
        email: body.email.toLowerCase(),
        password: hash,
        user_id: uuid(),
      });
      if (response.length > 0) {
        const user = await this.getUser({ email: body.email });
        const wallet = await walletService.createWallet(user.user_id);
        delete user.password;
        delete wallet.user_id;

        const token = await jwtService.sign(user);

        return {
          token,
          user,
          wallet,
        };
      }
    } catch (error: any) {
      if (error.code == "ER_DUP_ENTRY") {
        throw new CustomError("user already exists", 409);
      } else {
        throw new CustomError("An internal server error occurred", 500);
      }
    }
  },

  async login(body: userDetails) {
    const user = await this.getUser({ email: body.email });

    const status = await argon2.verify(user.password, body.password);

    if (status === true) {
      delete user.password;
      const token = await jwtService.sign(user);
      const wallet = await walletService.getWallet(user.user_id);
      return { token, wallet };
    } else {
      throw new CustomError("invalid credentials", 400);
    }
  },

  async getUser(query: any) {
    const data = await db("users").select("*").from("users").where(query);

    if (data.length > 0) {
      const user = data[0];
      return user;
    } else {
      throw new CustomError("user not found", 404);
    }
  },
};
