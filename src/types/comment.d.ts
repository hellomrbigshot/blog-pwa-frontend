import { StringifyOptions } from "querystring";

export interface IComment {
  _id: string,
  is_read: boolean,
  to_user: string,
  reply_user: string,
  reply_content: string,
  content: string,
  create_user: string,
  page_id: string,
  page_title: string,
  create_time: string,
  title?: string
}
