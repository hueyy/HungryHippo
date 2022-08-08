import fs from 'fs'
import { buildStorage } from "axios-cache-interceptor"

const CACHE_FILE = `cache.json`

const readCache = () => {
  if(!fs.existsSync(CACHE_FILE)){
    return {}
  }
  return JSON.parse(fs.readFileSync(CACHE_FILE, `utf8`))
}

const readKey = (key) => {
  const data = readCache()
  return data[key]
}

const writeCache = (cache) => {
  if(!fs.existsSync(CACHE_FILE)){
    return fs.writeFileSync(CACHE_FILE, cache)
  }
}

const writeValue = (key, value?) => {
  if(!fs.existsSync(CACHE_FILE)){
    return writeCache(JSON.stringify({ [key]: value }))
  }
  const data = readCache()
  return writeCache({
    ...data,
    [key]: value
  })
}

const fileStorage = buildStorage({
  find: (key) => readKey(key),
  remove: (key) => writeValue(key),
  set: (key, value) => writeValue(key, value),
})

export default fileStorage