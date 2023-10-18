export const stringToHex = (str) => {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    const hexValue = charCode.toString(16)
    hex += hexValue.padStart(2, '0')
  }
  return hex
}

export const hexToString = (hex) => {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = parseInt(hex.substr(i, 2), 16)
    str += String.fromCharCode(charCode)
  }
  return str
}