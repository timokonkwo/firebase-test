import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

//   console.log(auth?.currentUser?.email)

	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
      console.error(err)
    }
	};

  const signInWithGoogle = async () => {
    try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
      console.error(err)
    }
  }

  const logOut = async () => {
    try {
			await signOut(auth);
		} catch (err) {
      console.error(err)
    }
  }


	return (
		<div>
			<input
				type="email"
				placeholder="Email..."
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={logOut}>Logout</button>
		</div>
	);
};

export default Auth;
