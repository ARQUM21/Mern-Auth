import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String, enum: ["local", "google"] },
    googleId: { type: String },
    picture: { type: String },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },

  },
  { timestamps: true }
);

// Auto set provider before save
userSchema.pre("save", function(next) {
  if (this.googleId) this.provider = "google";
  else if (this.password) this.provider = "local";
  next();
});

const userModel = mongoose.models.user || mongoose.model("users", userSchema);
export default userModel;
