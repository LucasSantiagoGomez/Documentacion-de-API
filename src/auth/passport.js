import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/users.js";
import config from "../config.js";

import { createHash, isValidPassword } from "../utils.js";

const { clientID, clientSecret, callbackUrl } = config;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;

          const userExists = await userModel.findOne({ email: username });

          if (userExists) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done(`Error trying to create user: ${error}`);
        }
      }
    )
  );

  passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email" },
			async (username, password, done) => {
				try {
					const user = await userModel.findOne({ email: username });
					if (!user) return done(null, false);

					if (!isValidPassword(user, password)) return done(null, false);

					return done(null, user);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
        //   console.log(profile._json);
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };

            let result = await userModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;