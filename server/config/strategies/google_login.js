import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
        user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
        isAccountVerified: true
      });
      await user.save();
      } else {
      // Existing user picture updated
      user.picture = profile.photos[0].value;
      await user.save(); 
      }


        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
