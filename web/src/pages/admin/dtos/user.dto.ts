export interface IUpdateRegister {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

export interface IUserDTO {
  id?: string
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

export interface IUserLoggedDTO {
  id: string
  name: string
  email: string
  settings: {
    avatar: string | null
    level: number
    actived: boolean
    created_at: string
    updated_at: string
    avatar_url: null | string
  }
}

