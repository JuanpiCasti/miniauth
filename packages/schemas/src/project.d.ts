import type { JWK } from "jose";
export type Project = {
    id: number;
    user_id: number;
    name: string;
    private_key_jwk: JWK;
    public_key_jwk: JWK;
};
//# sourceMappingURL=project.d.ts.map