import { DecodedUser } from "./types";

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' && obj !== null && 'email' in obj && 'role' in obj && 'userId' in obj && 'firstName' in obj && 
    'lastName' in obj && 'isBlocked' in obj
  )
}