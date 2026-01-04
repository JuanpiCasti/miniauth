import { SQL } from 'bun'
import { schema } from '@miniauth/schemas'
const pg = new SQL(process.env.DATABASE_CONNECTION_STRING)
export default pg
const asdf = schema.parse('asdf')
