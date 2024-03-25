// import { signInWithGooglePopup } from "../firebase.js";
// const SignIn = () => {
//   const logGoogleUser = async () => {
//     const response = await signInWithGooglePopup();
//     console.log(response);
//   };
//   return (
//     <div>
//       <button onClick={logGoogleUser}>Sign In With Google</button>
//     </div>
//   );
// };
// export default SignIn;



import React from 'react'; 
import {auth , provider} from '../firebase.js'; 

const SignIn = () => { 

	// Sign in with google 
	const signin = () => { 
		auth.signInWithPopup(provider).catch(alert); 
	} 
	
	return ( 
		<div> 
			<center> 
				<button style={{"marginTop" : "200px"}} 
				onClick={signin}>Sign In with Google</button> 
			</center> 
		</div> 
	); 
} 

export default SignIn;
