import { AuthRequestUser } from "../modules/auth/misc/auth.types";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthRequestUser;
    }
  }
}