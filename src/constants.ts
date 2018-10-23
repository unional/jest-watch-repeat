export const ENTER = String.fromCharCode(0x0D)
export const ESC = String.fromCharCode(0x1B)

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export function isDigit(value: string) {
  return DIGITS.indexOf(value) >= 0
}
