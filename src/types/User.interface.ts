export interface UserMetadataI {
  username: string
  email: string
  first_name: string
  last_name?: string
  avatar_url?: string
}

export interface UpdateUserDataI {
  display_name: string
  username: string
  phone: string
}

export interface UserI {
  avatar: string | null
  bio: string | null
  created_at: string | null
  display_name: string | null
  email: string
  id: string
  is_first_login: boolean | null
  linkedin: string | null
  phone: string | null
  twitter: string | null
  username: string | null
  website: string | null
}
