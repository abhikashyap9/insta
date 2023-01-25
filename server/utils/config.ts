require('dotenv').config()
let PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI

if (!PORT) throw new Error('Please set PORT environment variable.')
if (!MONGODB_URI) throw new Error('Please set MONGODB_URI or MONGODB_URI_TEST environment variable.')

export default { MONGODB_URI, PORT }
