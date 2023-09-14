import { User } from '../user/user.model'

export interface Session {
    token: string
    expiration: number
    token_type: string
    user: User
}
