export interface IPage {
  _id: string,
  tags: Array<string>,
  title: string,
  content: string,
  create_user: string,
  create_time: string,
  update_time: string,
  status: string,
  secret: boolean,
  showMore?: boolean
}
