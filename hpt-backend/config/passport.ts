import passport from 'passport';
import * as passportLocal from 'passport-local';
import mongoose from 'mongoose';
import { User } from '../src/db/models/user';

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy((username: string, password: string, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user || !user.validatePassword(password))
                return done(null, false, { message: 'Incorrect username or password' });
            return done(null, user);
        }).catch((err) => console.log(err));
    })
);
