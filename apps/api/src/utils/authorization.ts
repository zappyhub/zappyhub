import { AuthUser } from "@/interfaces/IUser";


export function canDeleteUser(currentUser: AuthUser, _targetUserId?: string): boolean {
  return currentUser.role === "ADMIN";
}

//
export function canUpdateUser(
  currentUser: AuthUser,
  targetUserId: string,
): boolean {
  return currentUser.role === "ADMIN" || currentUser.id === targetUserId;
}


export function canGetAllUsers(currentUser: AuthUser): boolean {
  return currentUser.role === "ADMIN";
}

export function canViewUser(currentUser: AuthUser, targetUserId: string): boolean {
  return currentUser.role === "ADMIN" || currentUser.id === targetUserId
}
