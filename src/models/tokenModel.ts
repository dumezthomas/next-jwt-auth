import { Schema, model, models } from "mongoose";

export enum emailTypeList {
  emailVerification = "emailVerification",
  resetPassword = "resetPassword",
}

const schema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailType: {
      type: String,
      enum: Object.values(emailTypeList),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TokenModel = models.Token || model<IToken>("Token", schema);

export default TokenModel;
