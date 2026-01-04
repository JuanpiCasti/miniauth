import { Elysia } from 'elysia'
import db from './db/db'
const app = new Elysia().get('/', () => 'Hello Elysia').listen(8000)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
console.log(db)
