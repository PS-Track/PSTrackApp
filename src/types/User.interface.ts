export interface UserMetadataI {
  username: string
  email: string
  first_name: string
  last_name?: string
  avatar_url?: string
}

export interface UserI {
  id: string
  display_name?: string
  username: string
  email: string
  phone?: string
  avatar?: string
  bio?: string
  linkedin?: string
  twitter?: string
  website?: string
  is_suspended: boolean
  group_id?: string
}
