import axios from 'axios'
import { setupCache } from "axios-cache-interceptor"
import fileStorage from '../../utils/FileStorage'

const Request = setupCache(
  axios.create({
    timeout: 10_000,
  }),
  {
    interpretHeader: false,
    methods: [`get`, `post`],
    storage: fileStorage,
    ttl: 4 * 60 * 60 * 1000, // 4 hours
  }
)

export default Request