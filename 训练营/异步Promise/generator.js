function * foo(){
  console.log('start')
  yield 'foo'
}
const generator = foo()
const result = generator.next()
console.log(result)