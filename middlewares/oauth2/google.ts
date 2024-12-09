// import { passport } from "./passport";

// export const middlewareGoogleAuth = (req, res, next) => {
//   if (req.query?.callbackURL) {
//     return passport.authenticate("google", {
//       callbackURL: req.query.callbackURL,
//       session: false,
//     })(req, res, next);
//   }
//   return passport.authenticate("google", { session: false })(req, res, next);
// };

// export const middlewareGoogleRequest = (req, res, next) => {
//   if (req.query?.callbackURL) {
//     return passport.authenticate("google", {
//       callbackURL: req.query.callbackURL,
//       scope: ["profile", "email"],
//     })(req, res, next);
//   }
//   return passport.authenticate("google", { scope: ["profile", "email"] })(
//     req,
//     res,
//     next
//   );
// };
