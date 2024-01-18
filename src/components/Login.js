import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { checkvalidate } from "../utils/Validate";



const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errormessage, seterrormessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();
  const handleLoginButton = () => {
    const message = checkvalidate(email.current.value, password.current.value);


    seterrormessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName, } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              seterrormessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + "-" +errorMessage);
        });
        
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleIsSignForm = () => {
    setisSignInForm(!isSignInForm);
  }

  return (
    <div className="pb-[49%]">
      <div className="absolute">
        <img
          className="w-screen object-cover h-screen "
          src="https://img.freepik.com/free-photo/top-view-frame-with-food-copy-space_23-2148247893.jpg"
          alt="background"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="  w-[28%] absolute p-12 my-16 mx-auto right-0 left-0 bg-black bg-opacity-80 text-white rounded-lg drop-shadow-2xl">
          <div className=" font-bold text-4xl text-center">
            {/* <img className="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_8IV5P_JLEuGc93SICB2yhlZxEUrNV6cYA&usqp=CAU"/> */}
            <h1 className=" font-bold py-4 text-3xl">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
          </div>

          <div className="">
            
            {!isSignInForm && (
            <div>
              <div className="text-xl">Full Name</div>
            <input
              ref={name}
              className="p-4 my-4 w-full bg-zinc-800 rounded-lg text-white"
              type="text"
              placeholder="Full name"
            />
              </div>
            )}
            <div className=" text-xl">Email</div>
            <input
              ref={email}
              className="p-4 my-4 w-full bg-zinc-800 rounded-lg text-white"
              type="text"
              placeholder="Email"
            />

            <div className=" text-xl">Password</div>
            <input
              ref={password}
              className="p-4 my-4 w-full bg-zinc-800 rounded-lg text-white"
              type="Password"
              placeholder="Password"
            />
          </div>
          <p className="text-gray-600 py-2 text-lg font-bold">
            {errormessage}
          </p>
          <button
            className="bg-purple-800 p-4 my-2 w-full rounded-lg text-xl text-white font-semibold "
            onClick={handleLoginButton}
          >
            { toggleIsSignForm ? "Sign In" : "Sign Up"}
        </button>
        
          <p className="cursor-pointer">
            <div className="font-semibold my-2 " onClick={toggleIsSignForm}>{isSignInForm
              ? "New User? Sign Up Now"
              : "Already Registered? Sign In now"
            }</div>
          </p>
      </form>
    </div>
  );
};

export default Login;
