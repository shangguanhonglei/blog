// @flow
export const add = function(a:number,b:number):number {
  return a * b
}
export const isTrue = function(a:boolean): boolean {
  return isTrue === true
}
export const test = function(a:number):number {
  return a+1
}
test(3)
export default {
  add,
  isTrue
}