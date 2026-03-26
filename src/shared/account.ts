import { LoginSettings } from './settings'
import { DEFAULT_SETTINGS, STORAGE_KEY } from './settings'


export async function saveAccountInfo(settings: LoginSettings): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) {
    console.warn('chrome.storage.local is not available, skip saving account info')
    return
  }

  await chrome.storage.local.set({
    [STORAGE_KEY]: settings,
  })
}

export async function getAccountInfo(): Promise<LoginSettings | null> {
  try {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) {
      console.warn('chrome.storage.local is not available, fallback to default settings')
      return { ...DEFAULT_SETTINGS }
    }

    const result = await chrome.storage.local.get(STORAGE_KEY)
    const saved = result[STORAGE_KEY] as Partial<LoginSettings> | undefined

    return {
      username: typeof saved?.username === 'string'
        ? saved.username
        : DEFAULT_SETTINGS.username,
      password: typeof saved?.password === 'string'
        ? saved.password
        : DEFAULT_SETTINGS.password,
      isp: typeof saved?.isp === 'string'
        ? saved.isp
        : DEFAULT_SETTINGS.isp,
    }
  } catch (error) {
    console.error('Failed to get account info:', error)
    return null
  }
}
