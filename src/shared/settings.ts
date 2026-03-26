export type LoginSettings = {
  username: string
  password: string
  isp: string
}

export const DEFAULT_SETTINGS: LoginSettings = {
  username: '',
  password: '',
  isp: '@cmcc',
}

export const STORAGE_KEY = 'login_settings'