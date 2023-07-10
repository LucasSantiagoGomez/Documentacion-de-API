const checkLogin = (req, res, next) => {
	if (!req.session.user) return res.redirect("/");
	next();
  }
  
  const checkLogged = (req, res, next) => {
	if (req.session.user) return res.redirect("/home");
	next();
  }
  
  export { checkLogged, checkLogin };