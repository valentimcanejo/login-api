// import { NextResponse } from "next/server";
// import * as admin from "firebase-admin";
// import { signInWithCustomToken } from "firebase/auth";
// import { auth } from "@/firebase/initFirebase";
// import serviceAcc from "../../../../serviceAccountKey.json";

// const result = JSON.stringify(serviceAcc);

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(JSON.parse(result)),
//   });
// }

// export async function GET(request: Request) {
//   const customToken = await admin.auth().createCustomToken("uid", {
//     email: "valentim.canejo@hotmail.com",
//   });

//   //const token = await signInWithCustomToken(auth, customToken);

//   return NextResponse.json({ customToken });
// }
