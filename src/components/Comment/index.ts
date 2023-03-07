export interface IComment {
  _id: string,
  content: string,
  create_time: string,
  create_user: string,
  is_read: boolean,
  page_id?: string,
  page_title?: string,
  reply_content: string,
  reply_user: string,
  to_user: string
}
