const MEMORY_CACHE = Object.create(null)
const UNDEFINED = void 0 
const QUOTA_EXCEEDED_ERR_CODE = 22
const STORE_PREFIX = '__nova_cache__'

const Store = (...args) => {
  let [isSession, name, value, prefix, useMemory] = [false]
  if (typeof args[0] === 'boolean') {
    isSession = args[0]
    args.shift()
  }
  name = args[0]
  value = args[1]
  prefix = args[2] === UNDEFINED ? STORE_PREFIX : args[2]
  useMemory = args[3] === UNDEFINED ? true : args[3]

  const Storage = isSession ? window.sessionStorage : window.localStorage
  
  if (!name || !(typeof name === 'string')) {
    throw new Error('缓存名称必须是一个字符串')
  }

  const CACHE_KEY = prefix && typeof prefix === 'string' ? (prefix + name) : name

  // delete
  if (value === null) {
    useMemory && (delete MEMORY_CACHE[CACHE_KEY])
    return Storage.removeItem(CACHE_KEY)
  }
  
  // set
  if (value !== UNDEFINED) {
    useMemory && (MEMORY_CACHE[CACHE_KEY] = value)
    let res 
    try {
      res = Storage.setItem(CACHE_KEY, JSON.stringify(value)) 
    } catch (error) {
      // 溢出
      if (error.code === QUOTA_EXCEEDED_ERR_CODE) {
        throw ({
          code : QUOTA_EXCEEDED_ERR_CODE,
          message: 'storage range overflow'
        })
      }
    }
    return res
  }
  
  // get
  if (useMemory && MEMORY_CACHE[CACHE_KEY] !== UNDEFINED) {
    return MEMORY_CACHE[CACHE_KEY]
  }
  let _value = UNDEFINED
  try {
    _value = JSON.parse(Storage.getItem(CACHE_KEY))
  } catch (e) {
    // todo 
  }

  return _value
}

export default Store