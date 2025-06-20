// controllers/verifyEmailController.ts
import OTPModel from "../models/verificationCode.model.js";
import sendOTP  from "../utils/sendOtp.js";
import userModel from "../models/user.model.js";
import VerificatoinCodeModel from "../models/verificationCode.model.js";
import VerificatoinCodeType from "../constants/verificationCodetype.js";

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

export const sendOTPToEmail = async (req:any, res:any) => {
  const { email , userId} = req.body;
  const code = generateOTP();

  await VerificatoinCodeModel.findOneAndDelete({ email });

  await VerificatoinCodeModel.create({
    userId: userId,
    code: code,
    type: VerificatoinCodeType.EmailVerification,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    attemptsLeft: 3
  });

  await sendOTP(email, code);

  res.json({ message: "OTP sent to email" });
};

export const verifyOTP = async (req:any, res:any) => {
  const { email, code } = req.body;
  const record = await VerificatoinCodeModel.findOne({ email });

  if (!record || record.attemptsLeft >= 3) {
    return res.status(400).json({ message: "OTP expired or too many attempts" });
  }

  if (record.code !== code) {
    record.attemptsLeft += 1;
    await record.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }


  await userModel.updateOne({ email }, { verified: true });
  await OTPModel.deleteOne({ email });

  res.json({ message: "Email verified successfully" });
};
