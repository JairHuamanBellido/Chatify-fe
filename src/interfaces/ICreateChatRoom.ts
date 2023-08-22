import { Admin } from "../API";

export interface ICreateChatRoom {
  readonly name: string;
  readonly description: string;
  admin: Admin;
}
