export const sessionStore = {
  getToken: () => localStorage.getItem('calofit.token'),
  clear: () => localStorage.removeItem('calofit.token'),
}
