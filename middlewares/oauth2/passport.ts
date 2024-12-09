// import passport from "passport";
// import LocalStrategy from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   done(null, {});
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.OAUTH2_GOOGLE_CALLBACK_URL,
//       proxy: true,
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       return cb(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       profileFields: ["id", "emails", "displayName", "photos"],
//       callbackURL: process.env.OAUTH2_FACEBOOK_CALLBACK_URL,
//       graphAPIVersion: "v16.0",
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       return cb(null, profile);
//     }
//   )
// );

// // passport.use(
// //   new LocalStrategy(
// //     {
// //       usernameField: "email",
// //     },
// //     async (email, password, done) => {
// //       try {
// //         const user = await userModel.findOne({ email: email.toLowerCase() });

// //         if (!user) {
// //           return done(null, false, { messages: "Invalid email" });
// //         }

// //         if (user.authType !== "local") {
// //           return done(null, false, {
// //             messages: `You have signed up with ${user.authType}, please log in with your ${user.authType}`,
// //           });
// //         }

// //         const isCorrectPassword = await userModel.comparePassword(password);

// //         if (!isCorrectPassword) {
// //           return done(null, false, { messages: "Invalid password" });
// //         }

// //         done(null, user);
// //       } catch (error) {
// //         done(error, false);
// //       }
// //     }
// //   )
// // );

// export { passport };
