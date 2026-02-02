import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string, 
    verifyCode: string
) {
    try {
        await resend.emails.send({
            from: 'himanshujangra368@gmail.com',
            to: email,
            subject: 'Whisperbox message | Verification code',
            react: VerificationEmail({
                username: username,
                otp: verifyCode
            }),
        });
        return {
            success: true,
            message: "Verification email send successfully"
        }
    } catch (emailError) {
        // console.error("Error sending verification email", emailError);
        return {
            success: false, 
            message: "Failed to send verification email"
        };
    }
}