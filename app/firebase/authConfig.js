// useGoogleAuth.ts
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebaseConfig"; // adjust path if needed

export function useGoogleAuth() {
    // Generate a redirect URI for Expo
  const redirectUri = AuthSession.makeRedirectUri({
  // useProxy is no longer required, default works in Expo Go
  native: 'com.dplayerz.lifeappproject://redirect', // optional for standalone
});
console.log('Redirect URI:', redirectUri);


  // Create the Google Auth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "562091604190-17ipeu72g0ftoa6sqltnjl5hnhasog73.apps.googleusercontent.com",
    iosClientId: "562091604190-17ipeu72g0ftoa6sqltnjl5hnhasog73.apps.googleusercontent.com",
    androidClientId: "562091604190-17ipeu72g0ftoa6sqltnjl5hnhasog73.apps.googleusercontent.com",
    webClientId: "562091604190-17ipeu72g0ftoa6sqltnjl5hnhasog73.apps.googleusercontent.com",
    redirectUri,
  });

  // Handle the response and sign in with Firebase
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log("Google login successful!");
        })
        .catch((err) => {
          console.error("Firebase login error:", err);
        });
    }
  }, [response]);

  return { request, response, promptAsync };
}
