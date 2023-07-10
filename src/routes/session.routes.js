import { Router } from "express";
import userModel from "../dao/models/users.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    return res
      .status(201)
      .send({ status: "success", message: "User registered" });
  }
);

router.post("/login", passport.authenticate("login"), async (req, res) => {
  if (!req.user)
  
 
    return res.status(401).send({ status: "error", error: "Unauthorized" });
  
   
  req.user.email === "adminCoder@coder.com"
    ? (req.user.role = "admin")
    : (req.user.role = "user");

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role,
  };
  res.send({ status: "success", message: "Logged In", payload: req.user });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    
    req.user.email === "adminCoder@coder.com"
      ? (req.user.role = "admin")
      : (req.user.role = "user");

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };

    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
});

router.put("/restore", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", error: "User does not exist" });
    }

    const hashedPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashedPassword });

    return res.send({
      status: "success",
      message: "Successfully updated password",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;