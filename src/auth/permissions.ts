type Subject = {
  id: number,
  name: string,
  roles: Role[]
}

type Role = "admin" | "user";


type PermissionCheck<Key extends keyof Permissions> = boolean | ((user: Subject, data: Permissions[Key]["dataType"]) => boolean)


type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}

type Permissions = {
  posts: {
    action: "view" | "delete",
    dataType: string
  },
  toto: {
    action: "view",
    dataType: "lkjlkj"
  }
}

const ROLES = {
  admin: {
    posts: {
      view: true,
    },
    toto: {
      view: true
    }
  },
  user: {
    posts: {
      view: true
    },
    toto: {
      view: true
    }
  }

} as const satisfies RolesWithPermissions


export function can<Resource extends keyof Permissions>(
  subject: Subject,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
): boolean {
  return subject.roles.some(role => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
    if (permission == null) {
      return false;
    }

    if (typeof permission === "boolean") {
      return permission;
    }

    return data != null && permission(subject, data);
  });
}
