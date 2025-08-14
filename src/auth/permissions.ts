import type { User, UserRole } from "user"

type PermissionCheck<Key extends PermissionResource> = boolean | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

type PermissionResource = keyof Permissions;
type PermissionActions<Resource extends keyof Permissions> = Permissions[Resource]["action"];

type RolesWithPermissions = {
  [R in UserRole]: Partial<{
    [Resource in PermissionResource]: Partial<{
      [Action in PermissionActions<Resource>]: PermissionCheck<Resource>
    }> & {
      '*'?: PermissionCheck<Resource>
    }
  }> & {
    '*'?: boolean
  }
}

/**
 * This type as to be structured like this :
 * {
 *   <RESOURCE_NAME>: {
 *     action: <ACTION_NAME>,
 *     dataType: <DATA_TYPE>
 *   }
 * }
 * RESOURCE_NAME string : whatever you want depending on your domains
 * ACTION_NAME string : actions names ex : "view", "delete", "create"
 * DATA_TYPE any : whatever you need to specify for a resource (for example authorId for a Post)
 */
type Permissions = {
  posts: {
    action: "view" | "edit" | "delete",
    dataType: { id: string, authorId: string }
  },
  comments: {
    action: "view" | "delete",
    dataType: { id: string, postId: string, authorId: string }
  }
}

/**
 * This constant stores all role-based permissions.
 * structure is like this :
 * {
 *   <ROLE_NAME>: {
 *     <RESOURCE_NAME>: {
 *       <ACTION_NAME>: <PERMISSION_CHECK>
 *       '*': <PERMISSION_CHECK>
 *     }
 *     '*': true|false
 *   }
 * }
 * ROLE_NAME is defined in database (UserRoleEnum)
 * RESOURCE_NAME is defined in Permissions type above (each key is a resource)
 *               it can be a wildcard to cover all resources (default rights for unconfigured resources))
 * ACTION_NAME is defined in Permissions type above (key action for each resource)
 *             is can be a wildcard to cover all actions (default rights for unconfigured actions)
 */
const ROLES = {
  ADMIN: {
    '*': true
  },
  USER: {
    posts: {
      edit: (user, post) => user.id === post.authorId,
      delete: (user, post) => user.id === post.authorId,
      '*': true
    },
    comments: {
      view: true,
      '*': false
    },
  },
  GUEST: {
    '*': false
  }
} as const satisfies RolesWithPermissions


/**
 * Test if a user has permission to perform an action on a resource
 * @param user user to test
 * @param resource
 * @param action
 * @param data
 * @returns true if user can do it false otherwise
 */
export function can<Resource extends PermissionResource>(
  user: User,
  resource: Resource,
  action: PermissionActions<Resource>,
  data?: Permissions[Resource]["dataType"]
): boolean {
  const { role } = user;

  if (!(role in ROLES)) {
    return false;
  }

  const permissions = ROLES[role] as Record<string, unknown>;
  let resourcePremissions: Record<string, PermissionCheck<Resource>> | undefined;

  if (resource in permissions) {
    // In this case, resource is configured in roles
    resourcePremissions = permissions[resource] as Record<string, PermissionCheck<Resource>>;
  } else if ('*' in permissions) {
    // We have a wildcard for all resources we return it directly (normally it's a boolean)
    return permissions['*'] as boolean;
  } else {
    return false;
  }

  let permission: PermissionCheck<Resource> | undefined;

  if (action in resourcePremissions) {
    // We found action for this specific resource
    permission = resourcePremissions[action];
  } else if ('*' in permissions) {
    // We have a wildcard for all actions
    permission = resourcePremissions['*'];
  } else {
    return false;
  }

  if (typeof permission === "boolean") {
    return permission;
  }

  return data != null && permission(user, data);
}
