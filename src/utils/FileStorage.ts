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

const writeCache = (cache) => fs.writeFileSync(
  CACHE_FILE,
  JSON.stringify(cache),
  { encoding: `utf-8` }
)

const writeValue = (key, value?) => {
  const data = readCache()
  if(typeof value === `undefined`){
    delete data[key]
    return writeCache(data)
  }
  return writeCache({
    ...data,
    [key]: value
  })
}

const fileStorage = buildStorage({
  find (key) { return readKey(key) },
  remove (key) { return writeValue(key) },
  set (key, value) { return writeValue(key, value) }
})

export default fileStorage