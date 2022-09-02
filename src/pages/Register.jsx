import React from "react";
import fire from "../firebase/fire";
import { useEffect, useState, useRef } from "react";
import auth from "../firebase/fire";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import logout from "../utils/logout";
import line from "../assets/line.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import lottie from "lottie-web";
import brain from "../assets/brain.json";
import { FiClock } from "react-icons/fi";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  let check = false;
  const [x, setX] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      console.log(auth);
      setUser(user);
      console.log(user?.uid);
    });
  }, []);

  const [email, setEmail] = useState("");
  const [create, setCreate] = useState(false);
  const [exist, setExist] = useState(false);
  const [user, setUser] = useState({});
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  async function newUser() {
    if (name.length <= 12 && password.length >= 8) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).catch(
          (err) => console.log(err)
        );
        await sendEmailVerification(auth.currentUser).catch((err) =>
          console.log(err)
        );
        await updateProfile(auth.currentUser, { displayName: name }).catch(
          (err) => console.log(err)
        );
      } catch (err) {
        console.log(err);
      }
      console.log(auth.currentUser);
    } else {
      alert("Long Name and/or Weak Password");
    }
  }

  // useEffect(() => {
  //     if(user?.uid){
  //         navigate('/options')
  //     }
  // })

  useEffect(() => {
    if (x === 0) {
      lottie.loadAnimation({
        container: brainRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets7.lottiefiles.com/packages/lf20_0qQqQq.json",
        animationData: brain,
      });
    }
    setX(x + 1);
  }, );

  useEffect(() => {
    if (user && (exist || create)) {
      setLoading(true);
      console.log(user);
      setTimeout(() => {
        navigate("/options");
      }, 2000);
    }
  }, [exist, user, create]);

  function login() {
    console.log("in login");
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // Signed in
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
    setEmail("");
    setPassword("");
    setReady(true);
  }

  function back() {
    setExist(false);
    setCreate(false);
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (create) {
          newUser();
        }
        if (exist) {
          login();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  const brainRef = useRef(null);

  return (
    <div className=" group bg-[#FFD9C6]">
      {!loading && (
        <div className="h-full w-full max-w-[1280px] mx-auto mt-36 lg:mt-0 sm:mt-24">
          {!create && !exist && (
            <div className="font-Bebas flex flex-col justify-between h-screen relative">
              <span
                className="absolute w-[277px] height-[259px] left-[500px] top-[140px]"
              >
                <img src={blob1} alt="" />
              </span>
              <span className="absolute w-[328px] h-[245px] right-[200px] top-[620px]">
                <img src={blob2} alt="" />
              </span>
              <nav className="w-full h-[96px] text-[36px] flex justify-between  text-white">
                <h1 className="bg-black h-full flex items-center px-8 underline">
                  Perplexed
                </h1>
                <ul className="h-full flex items-center text-black justify-evenly max-w-[500px] w-full">
                  <li className="px-4">Home</li>
                  <li className="px-4">Services</li>
                  <li className="px-4">People</li>
                  <li className="px-4">Hit us up</li>
                </ul>
              </nav>
              <div className="flex items-center">
                <div className="z-50">
                  <h1 className="text-[84px]  max-w-[832px] leading-[101px] z-50">
                    Show off your knowledge and win awards. really.
                  </h1>
                  <div className="flex space-x-4">
                    <img className="w-[150px] h-[150px] " src={line} alt="" />
                    <button onClick={() => setCreate(true)} className="bg-[#c084fc] translate-y-[35%] max-w-[232px] rounded-md w-full text-[32px] border-4  h-full py-2 border-black shadow-cool2">
                      Compete now
                    </button>
                  </div>
                </div>
                <figure
                  className="w-[48%] h-full translate-y-[-10%]"
                  ref={brainRef}
                ></figure>
              </div>
              <div className="flex  justify-between h-[400px]">
                <p className="font-Inria text-[36px] max-w-[440px] w-full h-[90%] leading-[43px] z-50">
                  The award winning trivia platform, Perplexed, gave the man
                  $1,000 for winning The award winning trivia platform,
                  Perplexed, gave the man $1,000 for winning The award winning
                  trivia platform, Perplexed, gave the man $1,000 for winning
                </p>
                <div className="border-r-4 border-black  h-full"></div>
                <div className="cards z-50 flex space-x-10">
                  <div className="card1 w-[260px] h-[310px] bg-white shadow-cool2 border-4 border-black rounded-md">
                    <h1 className="font-Bebas flex items-center  text-[20px] bg-[#fb923c] h-[15%] border-b-4 border-black ">
                      <span className="ml-4">News</span>
                    </h1>
                    <div className="p-4 space-y-2 flex flex-col justify-center">
                      <h2 className="font-Inria font-light text-[18px] flex items-center">
                        <FiClock className="mr-1 w-6 h-6" /> 11/11/2022
                      </h2>
                      <h1 className="leading-[29px] text-[24px] font-Bebas">
                        Man from Kentucky wins $1,000 in Prize Money
                      </h1>
                      <p className="font-Inria font-bold">
                        The award winning trivia platform, Perplexed, gave the
                        man $1,000 for winning. <br />{" "}
                        <span className="text-[#001aff]">Read more</span>
                      </p>
                    </div>
                  </div>
                  <div className="card1 w-[260px] h-[310px] bg-white shadow-cool2 border-4 border-black rounded-md">
                    <h1 className="font-Bebas flex items-center  text-[20px] bg-[#fde047] h-[15%] border-b-4 border-black ">
                      <span className="ml-4">News</span>
                    </h1>
                    <div className="p-4 space-y-2 flex flex-col justify-center">
                      <h2 className="font-Inria font-light text-[18px] flex items-center">
                        <FiClock className="mr-1 w-6 h-6" /> 11/11/2022
                      </h2>
                      <h1 className="leading-[29px] text-[24px] font-Bebas">
                        Man from Kentucky wins $1,000 in Prize Money
                      </h1>
                      <p className="font-Inria font-bold">
                        The award winning trivia platform, Perplexed, gave the
                        man $1,000 for winning. <br />{" "}
                        <span className="text-[#001aff]">Read more</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(create || exist) && (
            <div className=" bg-gradient-to-r from-black via-slate-900 to-black h-screen max-w-[1800px] w-full">
            <div className=" relative flex flex-col items-center justify-center max-w-1200px w-[90%] mx-auto bg-gray-100 shadow-cool border-2 border-gray-900 rounded-[12%] h-[70%] translate-y-[20%]">
              <form
                action=""
                className="group flex flex-col items-center justify-center mt-12 lg:mt-0"
              >
                {!exist && (
                  <div className="-left-[50px] delay-250 duration-[1s] group-hover:left-3 scale-0 group-hover:scale-100 w-[55%] sm:w-[70%] md:w-[80%] overflow-hidden text-center tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[32px] sm:text-[42px] md:text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 ">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="text-white outline-none brightness-200 focus:outline-[0%] placeholder:text-white placeholder:opacity-[15%]  bg-transparent"
                      required
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                )}
                <div className="-left-[50px] delay-[.35s] duration-[1s] group-hover:left-3 scale-0 group-hover:scale-100 w-[55%] sm:w-[70%] md:w-[80%] text-center overflow-hidden tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[32px] sm:text-[42px] md:text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 ">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-white focus:outline-none placeholder:text-white placeholder:opacity-[15%]  bg-transparent"
                    required
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="-bottom-20 delay-[.35s] duration-1000 group-hover:bottom-3 scale-0 group-hover:scale-100 w-[55%] sm:w-[70%] md:w-[80%] text-center overflow-hidden tracking-wider bg-transparent text-white brightness-0 font-extrabold text-[32px] sm:text-[42px] md:text-[58px] border-4 border-gray-900 shadow-cool mb-8 p-4 ">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-white focus:outline-none bg-transparent placeholder:text-white placeholder:opacity-[15%]"
                    required
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </form>
              <button
                onClick={back}
                className="hover:scale-[105%] active:scale-100 
                        transition-all duration-300 cursor-pointer absolute top-12 left-12 w-16 h-16 text-center text-black 9-8"
              >
                <ArrowLeftIcon />
              </button>
              <div className="flex items-center w-full justify-center">
                {user?.email?.length > 0 && (
                  <button
                    className="font-bold text-center break-words z-50
                        hover:scale-[103%] cursor-pointer bg-purple-400 transiton-all duration-300
                        w-[40%] rounded-[11%] text-[28px] text-gray-900 border-2 py-6 px-4 border-gray-900 overflow-hidden shadow-cool active:shadow-lg m-4"
                    onClick={logout}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="h-screen bg-gradient-to-r from-black via-slate-900 to-black w-full relative flex items-center justify-center">
          <div className="relative  h-44 w-44 animate-spin  rounded-full bg-gradient-to-r from-pink-600 via-indigo-600 to bg-green-600">
            <div className="absolute top-[50%] left-[50%] rounded-full -translate-x-1/2 -translate-y-1/2 transform w-40 h-40 bg-slate-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}
