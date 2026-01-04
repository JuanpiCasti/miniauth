import { Project } from '@miniauth/schemas'
import db from '../db/db'
import { JWK } from 'jose'

export abstract class ProjectRepository {
  static async save({
    userId,
    name,
    privateKey,
    publicKey,
    clientId,
    clientSecret,
    expirationMins
  }: Project): Promise<{ id: string }> {
    const [createdProject] = await db`
      INSERT INTO projects (user_id, name, private_key, public_key, client_id, client_secret, expiration_mins)
        VALUES (${userId}, ${name}, ${privateKey}, ${publicKey}, ${clientId}, ${clientSecret}, ${expirationMins})
      RETURNING id
    `
    const { id } = createdProject

    return { id }
  }

  static async findAll(userId: number): Promise<Project[]> {
    const rows: DbProject[] = await db`
      SELECT *
      FROM projects
      WHERE user_id = ${userId}
    `
    return rows.map(mapToProject)
  }

  static async findByClientIdAndSecret(
    clientId: string,
    clientSecret: string
  ): Promise<Project | null> {
    const rows = await db`
    SELECT * FROM projects 
    WHERE client_id = ${clientId} AND client_secret = ${clientSecret}
    `
    const projects = rows.map(mapToProject)
    if (projects) {
      return projects[0]
    } else {
      return null
    }
  }

  static async findPublicKeysByClientId(clientId: string): Promise<JWK[]> {
    const projects: DbProject[] = await db`
      SELECT public_key
      FROM projects
      WHERE client_id = ${clientId}
    `
    return projects.map((p) => p.public_key)
  }
}

type DbProject = {
  id?: number
  user_id: number
  name: string
  private_key: JWK
  public_key: JWK
  client_id: string
  client_secret: string
  expiration_mins: number
}

const mapToProject = (row: DbProject): Project => ({
  id: row.id,
  userId: row.user_id,
  name: row.name,
  privateKey: row.private_key,
  publicKey: row.public_key,
  clientId: row.client_id,
  clientSecret: row.client_secret,
  expirationMins: row.expiration_mins
})
