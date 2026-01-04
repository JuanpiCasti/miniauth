import { Elysia } from 'elysia'
import db from './db/db'
import { projects } from './project'
import { fromTypes, openapi } from '@elysiajs/openapi'

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes()
    })
  )
  .use(projects)
  .get('/', () => 'Hello Elysia')
  .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
console.log(db)
