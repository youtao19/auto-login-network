console.log('[CRXJS] Hello world from content script!')

function fillLoginForm() {
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

  ispSelect.value = '@cmcc'
  ispSelect.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[ISP] has been selected')

  usernameInput.value = '2306404055'
  usernameInput.dispatchEvent(new Event('input', { bubbles: true }))
  usernameInput.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[Username] has been filled')

  passwordInput.value = 'Wyt@1219'
  passwordInput.dispatchEvent(new Event('input', { bubbles: true }))
  passwordInput.dispatchEvent(new Event('change', { bubbles: true }))
  console.log('[Password] has been filled')

  loginButton.click()
  console.log('[Login] ready')
}

setTimeout(fillLoginForm, 1500)