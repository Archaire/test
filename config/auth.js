const passport = require("passport")
const LocalStrategy = require("passport-local")
const crypto = require("crypto")

const strategy = new LocalStrategy(function verify(username, password, cb) {
	if (username == "admin" && password == "admin") {
		return cb(null, username)
	} else {
		return cb(null, false)
	}
})

passport.use(strategy);

exports.protected = (req, res, next) => {
	const isAuth = req.isAuthenticated()
	if (!isAuth) {
		res.status(401).redirect("/login")
	}
	req.session.isAuth = isAuth // Test
	return next()
}

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});
