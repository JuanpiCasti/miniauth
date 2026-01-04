import type { JWK } from 'jose'
import { t } from 'elysia'

export type Project = {
  id?: number
  userId: number
  name: string
  privateKey: JWK
  publicKey: JWK
  clientId: string
  clientSecret: string
  expirationMins: number
}

export type ProjectDto = Omit<Project, 'privateKey' | 'publicKey'>

export const createProjectBody = t.Object({
  userId: t.Number(),
  name: t.String({
    minLength: 3,
    maxLength: 50
  }),
  expirationMins: t.Number()
})

export type CreateProjectBody = typeof createProjectBody.static

export const createProjectResponse = t.Object({
  id: t.String()
})

export type CreateProjectResponse = typeof createProjectResponse.static
