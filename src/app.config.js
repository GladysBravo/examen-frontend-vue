
export const APIENDPOINT = 'http://localhost:4000/public'

export const getHeader = function () {  
  const tokenData = JSON.parse(window.localStorage.getItem('gbravo'))
  console.log(`tokenn>=> ${tokenData}`)
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer' + tokenData.access_token
  }
  return headers
}
