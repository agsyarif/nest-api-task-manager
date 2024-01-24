export const url_linkqu = "https://gateway-dev.linkqu.id/linkqu-partner"
export const headers = {
  'client-id': process.env.CLIENT_ID ?? "testing",
  'client-secret': process.env.CLIENT_SECRET ?? "123",
}
export const path_va_permata = "/transaction/create/vapermata"
export const path_va_other_bank = "/transaction/create/va"
export const path_va_dedicated = "/transaction/create/vadedicated/add"
export const path_va_dedicated_update = "/transaction/create/vadedicated/update"