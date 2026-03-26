import type { LoginSettings } from '../shared/settings'
import { getAccountInfo } from '../shared/account'

console.log('[CRXJS] Hello world from content script!')

async function fillLoginForm() {
  const ispSelect = document.querySelector<HTMLSelectElement>('select[name="ISP_select"]')
  if (!ispSelect) {
    console.warn('ISP select not found')
    return
  }

  const usernameInput = document.querySelector<HTMLInputElement>('input[name="DDDDD"][type="text"]')
  if (!usernameInput) {
    console.warn('Username input not found')
    return
  }

  const passwordInput = document.querySelector<HTMLInputElement>('input[name="upass"][type="password"]')
  if (!passwordInput) {
    console.warn('Password input not found')
    return
  }

  const loginButton = document.querySelector<HTMLInputElement>('input[type="submit"][name="0MKKey"]')
  if (!loginButton) {
    console.warn('Login button not found')
    return
  }

  const accountInfo: LoginSettings | null = await getAccountInfo()
  console.log('[accountInfo:]', accountInfo)
  if (!accountInfo) {
    console.error('Failed to get account info')
    return
  }
  if (!accountInfo.username || !accountInfo.password) {
    console.warn('Username or password is empty, skip auto login')
    return
  }

  ispSelect.value = accountInfo.isp
  ispSelect.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[ISP] has been selected')

  usernameInput.value = accountInfo.username
  usernameInput.dispatchEvent(new Event('input', { bubbles: true }))
  usernameInput.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[Username] has been filled')

  passwordInput.value = accountInfo.password
  passwordInput.dispatchEvent(new Event('input', { bubbles: true }))
  passwordInput.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[Password] has been filled')

  loginButton.click()
  console.log('[Login] ready')
}

setTimeout(fillLoginForm, 1500)
