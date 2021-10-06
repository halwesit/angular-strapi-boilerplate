export interface User {
  id: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: Role
  todos: Todo[]
}

export interface Role {
  id: string
  name: string
  description: string
  type: string
  permissions: string[]
  users: string[]
  created_by: string
  updated_by: string
}

export interface Todo {
  id: string
  title: string
  content: string
  user: string
  done: boolean
  created_by: string
  updated_by: string
}
