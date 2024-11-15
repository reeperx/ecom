import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Tiktok from "next-auth/providers/tiktok"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Tiktok],
  secret: "FP6c8Qp66vKjQkl9Xk0c6LQZYLumPEwAxG02CGBnH7w=",
  //secret: process.env.AUTH_SECRET as string,
})