import { type InferSelectModel, type InferEnum } from 'drizzle-orm'
import { userRoleEnum, usersTable } from '@db/tables/users-table';


export type UserRole = InferEnum<typeof userRoleEnum>;
export type User = InferSelectModel<typeof usersTable>;



