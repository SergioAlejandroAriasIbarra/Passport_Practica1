const passport = require('passport');
const User = require('../models/User');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: "908677471417-3msueoor7evdu2bqce3fm355bonrdejb.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);

            User.find(profile.id) ? 
            done(null, profile) : 
            User.create({ googleId: profile.id, email: profile.emails, imageUrl: profile.photos }).then(user => done(null, user));
        }
    )
);
passport.serializeUser(
    function (user, done) {
        done(null, user.id);
    });

passport.deserializeUser(
    function (id, done) {
        return done(null, id);
    });

