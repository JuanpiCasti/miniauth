import { SQL } from 'bun'
const pg = new SQL(process.env.DATABASE_CONNECTION_STRING!)

export default pg
