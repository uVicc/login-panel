const LocalStrategy = require('passport-local').Strategy;
const dbConnect = require('./dbConnect');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const [row] = await dbConnect.execute("SELECT * FROM usuarios WHERE email = ? and password = SHA2(?,256)", [email, password]);
        if(!row[0]) {
            return done(null, false, {message: "No user with that email."});
        }


    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }), 
    authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}