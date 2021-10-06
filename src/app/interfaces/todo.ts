export interface Todo {
  id: string
  title: string
  content: string
  user: User
  done: boolean
}

export interface User {
  id: string
  username: string
  email: string
  provider: string
  password: string
  resetPasswordToken: string
  confirmationToken: string
  confirmed: boolean
  blocked: boolean
  role: string
  todos: string[]
  created_by: string
  updated_by: string
}
