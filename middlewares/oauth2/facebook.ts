// import { passport } from "./passport";

// export const middlewareFacebookAuth = (req, res, next) => {
//   if (req.query?.callbackURL) {
//     return passport.authenticate("facebook", {
//       callbackURL: req.query.callbackURL,
//       session: false,
//     })(req, res, next);
//   }
//   return passport.authenticate("facebook", { session: false })(req, res, next);
// };

// export const middlewareFacebookRequest = (req, res, next) => {
//   if (req.query?.callbackURL) {
//     return passport.authenticate("facebook", {
//       callbackURL: req.query.callbackURL,
//       scope: ["public_profile", "email"],
//     })(req, res, next);
//     return passport.authenticate("facebook", {
//       callbackURL: req.query.callbackURL,
//       scope: ["public_profile", "email"],
//     })(req, res, next);
//   }
//   return passport.authenticate("facebook", {
//     scope: ["public_profile", "email"],
//   })(req, res, next);
// };
