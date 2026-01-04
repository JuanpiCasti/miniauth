import { CreateProjectBody, CreateProjectResponse } from '@miniauth/schemas'
import * as jose from 'jose'
import type { Project, ProjectDto } from '@miniauth/schemas'
import { ProjectRepository } from './repository'
import { calculateJwkThumbprint, JWK } from 'jose'

export async function createProject(
  params: CreateProjectBody
): Promise<CreateProjectResponse> {
  const { publicKey, privateKey } = await jose.generateKeyPair('PS256', {
    extractable: true
  })

  const [publicKeyJwk, privateKeyJwk] = await Promise.all([
    jose.exportJWK(publicKey),
    jose.exportJWK(privateKey)
  ])

  const project: Project = {
    userId: params.userId,
    name: params.name,
    privateKey: privateKeyJwk,
    publicKey: publicKeyJwk,
    clientId: '12345',
    clientSecret: '12345',
    expirationMins: params.expirationMins
  }

  return await ProjectRepository.save(project)
}

export async function findAll(userId: number): Promise<ProjectDto[]> {
  const projects = await ProjectRepository.findAll(userId)

  return projects.map(({ privateKey, publicKey, ...projectDto }) => projectDto)
}

export async function signToken(
  sub: string,
  clientId: string,
  clientSecret: string
) {
  const project = await ProjectRepository.findByClientIdAndSecret(
    clientId,
    clientSecret
  )
  if (!project) {
    return null
  }
  const privateKey = await jose.importJWK(project.privateKey, 'PS256')

  return {
    token: await new jose.SignJWT({ sub: sub })
      .setProtectedHeader({
        alg: 'PS256',
        kid: await getKeyThumbprint(project.publicKey)
      })
      .setIssuedAt()
      .setIssuer(process.env.ISSUER!)
      .setAudience(project.name)
      .setExpirationTime(`${project.expirationMins}m`)
      .sign(privateKey)
  }
}

export async function getJwks(clientId: string) {
  const keys: JWK[] = await ProjectRepository.findPublicKeysByClientId(clientId)
  const keysWithKid = await Promise.all(
    keys.map(async (key) => {
      return {
        ...key,
        kid: await getKeyThumbprint(key)
      }
    })
  )
  return { keys: keysWithKid }
}

export async function getKeyThumbprint(jwk: JWK) {
  return calculateJwkThumbprint(jwk, 'sha256')
}
