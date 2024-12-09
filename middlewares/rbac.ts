import { AuthFailureError } from "../core/error.response";
import rbac from "./role";
import RoleService from "../services/role.service";

export const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      rbac.setGrants(
        await RoleService.getAll({
          userId: 6996,
        })
      );
      const rol_name = req.query.role;
      const permission = rbac.can(rol_name)[action](resource);
      if (!permission.granted) {
        throw new AuthFailureError("You dont have enough premisstion");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
