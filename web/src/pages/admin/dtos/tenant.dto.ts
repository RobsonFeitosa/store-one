export interface ITenantDTO {
  id: string
  name: string
  slug: string
  active: boolean
  created_at: Date
  updated_at: Date
}

export interface ICreateTenantDTO {
  name: string
  slug: string
}
