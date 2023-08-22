import { Admin } from "../API";

export interface IChatRoom {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly admin: Admin;
}
