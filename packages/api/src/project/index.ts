import { Elysia, t } from 'elysia'
import { createProjectBody, createProjectResponse } from '@miniauth/schemas'
import { createProject, findAll, getJwks, signToken } from './service'

export const projects = new Elysia()
  .group('/projects', (app) => {
    return app
      .post(
        '',
        async ({ body }) => {
          return await createProject(body)
        },
        {
          body: createProjectBody,
          response: createProjectResponse
        }
      )
      .get(
        '',
        async ({ query: { user_id } }) => {
          return await findAll(user_id)
        },
        {
          query: t.Object({
            user_id: t.Number()
          })
        }
      )
  })
  .post(
    '/sign',
    async ({ body: { sub, client_id, client_secret }, status }) => {
      const jwt = await signToken(sub, client_id, client_secret)
      if (!jwt) {
        return status(404, {
          error: 'Unknown client identification.'
        })
      }
      return jwt
    },
    {
      body: t.Object({
        sub: t.String(),
        client_id: t.String(),
        client_secret: t.String()
      })
    }
  )
  .get(
    '/keystore',
    async ({ query: { client_id } }) => {
      return getJwks(client_id)
    },
    {
      query: t.Object({
        client_id: t.String()
      })
    }
  )
