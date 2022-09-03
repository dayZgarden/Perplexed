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
import add from "../assets/add.svg";
import compete from "../assets/compete.svg";
import question from "../assets/question.svg";
import lottie from "lottie-web";
import brain from "../assets/brain.json";
import wheel from "../assets/wheel.svg";
import friends from "../assets/friends.json";
import wheelArrow from "../assets/wheelArrow.svg";
import readyArrow from "../assets/readyArrow.svg";
import cards from "../assets/cards.svg";
import rank from "../assets/rank.svg";
import trophy from "../assets/trophy.svg";
import arrow1 from "../assets/arrow1.svg";
import arrow2 from "../assets/arrow2.svg";
import arrow3 from "../assets/arrow3.svg";
import triviagames from "../assets/triviagames.svg";
import bigprizes from "../assets/bigprizes.svg";
import orangeTriangle from "../assets/orangetriangle.svg";
import purpleTriangle from "../assets/purpleTriangle.svg";
import yellowTriangle from "../assets/yellowTriangle.svg";
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
      lottie.loadAnimation({
        container: friendsRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets7.lottiefiles.com/packages/lf20_0qQqQq.json",
        animationData: friends,
      });
    }
    setX(x + 1);
  });

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
  const friendsRef = useRef(null);

  return (
    <div className="h-full relative w-full group overflow-scroll scrollbar-hide bg-[#FFD9C6]">
      {!loading && (
        <div className="h-full w-full  mt-36 lg:mt-0 sm:mt-24">
          {!create && !exist && (
            <div className="font-Bebas max-w-[1280px] mx-auto flex flex-col justify-between h-screen relative">
              <span className="absolute w-[277px] height-[259px] left-[500px] top-[140px]">
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
                    <button
                      onClick={() => setCreate(true)}
                      className="bg-[#c084fc] translate-y-[35%] max-w-[232px] rounded-md w-full text-[32px] border-4  h-full py-2 border-black shadow-cool2"
                    >
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

          {!create && !exist && (
            <>
              <div className="mt-[132px] max-w-[1280px] w-[60%] mx-auto bg-black text-white font-Bebas text-[36px] border-4 border-black p-6 rounded-md flex items-center justify-center">
                32 Genres | 500,000 Questions | 300 Active Players
              </div>

              <section className="h-[100vh] relative max-w-[1280px] mx-auto my-[132px]">
                <div>
                  <h1 className="bg-white w-[50%] mx-auto text-center border-4 border-black p-4 rounded-md rotate-[-1deg] shadow-cool2 font-Bebas text-[64px]">
                    Awarding Growth
                  </h1>
                  <h2 className="mt-10 w-[60%] mx-auto text-center text-[24px] font-Inria">
                    Our goal is to educate players and provide awards for growth
                    through our platform. Start playing, rank up, and win.
                  </h2>
                </div>
                <div className="cards flex justify-between mt-20">
                  <div className="card flex flex-col items-center relative rotate-[-5deg] max-w-[364px] rounded-md h-[464px] w-full bg-[#c084Fc] border-4 border-black shadow-cool2">
                    <img className="mt-20 scale-125" src={cards} alt="" />
                    <span className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold ">1</span>
                    <p className="leading-[48px] text-[40px] font-Bebas w-[70%] mt-12 text-center">Create an Account & Start Playing.</p>
                  </div>
                  <div className="card flex flex-col items-center relative max-w-[364px] translate-y-[8%] rounded-md h-[464px] w-full bg-[#fb923c] border-4 border-black shadow-cool2">
                    <img className="mt-20 scale-125" src={rank} alt="" />
                    <span className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold ">2</span>
                    <p className="leading-[48px] text-[40px] font-Bebas w-[80%] mt-10 text-center">Play quizzes, learn, and rank up.</p>
                  </div>
                  <div className="card flex flex-col items-center relative max-w-[364px] rotate-[4deg] rounded-md h-[464px] w-full bg-[#fde047] border-4 border-black shadow-cool2">
                    <img className="mt-20 scale-125 rotate-[-4deg]" src={trophy} alt="" />
                    <span className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold ">3</span>
                    <p className="leading-[48px] text-[40px] font-Bebas w-[80%] mt-12 text-center">Gain points, spin the wheel & win big.</p>
                  </div>
                </div>
                <img className="absolute top-[-20px] rotate-[-10deg] left-[-60px] scale-100" src={arrow1} alt="" />
                <img className="absolute bottom-[60px] left-[210px] z-50" src={arrow2} alt="" />
                <img className="absolute top-[265px] right-[240px] rotate-[-5deg]" src={arrow3} alt="" />
                <img className="absolute top-[100px] right-[-45px] opacity-80" src={triviagames} alt="" />
              </section>

              <div className="w-[60%] max-w-[1280px] mx-auto border-t-[6px] border-black mb-[132px]"></div>

              <section className="h-[100vh] max-w-[1280px] mx-auto relative">
              <img className="absolute top-[100px] left-[-45px] opacity-80" src={bigprizes} alt="" />
              <img className="absolute top-[180px] animate-spin left-[350px] " src={orangeTriangle} alt="" />
              <img className="absolute bottom-[140px] left-[500px] animate-spin delay-100 " src={yellowTriangle} alt="" />
              <img className="absolute top-[140px] right-[150px] animate-spin" src={purpleTriangle} alt="" />
                <h1 className="bg-white w-[50%] mx-auto text-center border-4 border-black p-4 rounded-md rotate-[1.5deg] shadow-cool2 font-Bebas text-[64px]">
                  Compete With Friends
                </h1>
                <div className="mt-28 flex">
                  <div className="flex flex-col w-[45%]">
                    <h1 className="font-Bebas text-[52px]  leading-[58px] w-[100%]">
                      Collect coins through trivia and then spin the wheel to
                      win big.
                    </h1>
                    <ul className="mt-8 space-y-8 flex flex-col h-[320px] justify-between">
                      <li className="flex items-center">
                      <figure className="bg-[#c084fc] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img
                            className="p-1"
                            src={question}
                            alt=""
                          />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Find out what you know
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[19px]">
                            After creating an account, start playing free trivia
                            quizzes to start learning.
                          </h2>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <figure className="bg-[#fde047] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img
                            className="p-1"
                            src={add}
                            alt=""
                          />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Find out what you know
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[19px]">
                            After creating an account, start playing free trivia
                            quizzes to start learning.
                          </h2>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <figure className="bg-[#fb923c] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img
                            className="p-1"
                            src={compete}
                            alt=""
                          />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Find out what you know
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[19px]">
                            After creating an account, start playing free trivia
                            quizzes to start learning.
                          </h2>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <figure
                    className="w-[50%] translate-y-[-5%] rotate-[6deg] scale-125"
                    ref={friendsRef}
                  ></figure>
                </div>
              </section>

              <section className="h-[100vh] max-w-[1280px] mx-auto relative">
              <img className="absolute top-[150px] right-[15px] opacity-80" src={bigprizes} alt="" />

                <h1 className="bg-white w-[40%] mx-auto text-center border-4 border-black p-4 rounded-md rotate-[-1deg] shadow-cool2 font-Bebas text-[64px]">
                  How to win
                </h1>
                <div className="mt-24 flex justify-between items-center">
                  <img className="w-[48%] max-h-[550px]" src={wheel} alt="" />
                  <div className="w-[48%] relative h-[550px] flex flex-col translate-y-[6%]">
                    <h1 className="font-Bebas text-[52px]  leading-[58px] w-[100%]">
                      Collect coins through trivia and then spin the wheel to
                      win big.
                    </h1>
                    <p className="font-Inria mt-2 w-[80%] text-[42px] leading-[58px]">
                      Correct answers for quizzes award coins. Higher
                      difficulties and winning a head2head offers more.
                    </p>
                    <button
                      onClick={() => setCreate(true)}
                      className="bg-[#c084fc] mt-2 font-Bebas translate-y-[35%] max-w-[232px] rounded-md w-full text-[32px] px-1 border-4 py-2 border-black shadow-cool2"
                    >
                      spin the wheel
                    </button>
                    <img
                      className="absolute bottom-[86px] right-[160px]"
                      src={wheelArrow}
                      alt=""
                    />
                  </div>
                </div>
              </section>

              <div className="w-[60%] max-w-[1280px] mx-auto border-t-[6px] border-black mb-[132px]"></div>

              <div className="bg-white relative rounded-md border-black border-4 shadow-cool2 h-[340px] w-[48%] mx-auto mb-[260px] flex flex-col items-center justify-center space-y-4">
                <h1 className="leading-[115px] text-[96px] font-Bebas">
                  Are you ready?
                </h1>
                <div className="flex items-center justify-center space-x-4">
                  <p className="text-[36px] leading-[43px] w-[45%] font-Bebas">
                    join perplexed today to be apart of the next big thing
                  </p>
                  <button
                    onClick={() => setCreate(true)}
                    className="bg-[#c084fc] rotate-[-1deg] mt-2 font-Bebas rounded-md w-[35%] h-[90%] text-[32px] px-1 border-4 py-2 border-black shadow-cool2"
                  >
                    compete now
                  </button>
                  <img
                    className="absolute top-[80px] right-[130px]"
                    src={readyArrow}
                    alt=""
                  />
                </div>
              </div>

              <nav className="font-Bebas max-w-[1400px] mx-auto w-full h-[96px] translate-x-[-50%] left-1/2 absolute bottom-[2px] text-[36px] flex justify-between  text-white">
                <h1 className="h-full text-black flex items-center px-8 underline">
                  Perplexed
                </h1>
                <ul className="h-full flex items-center text-black justify-evenly max-w-[500px] w-full">
                  <li className="px-4">Home</li>
                  <li className="px-4">Services</li>
                  <li className="px-4">People</li>
                  <li className="px-4">Hit us up</li>
                </ul>
              </nav>

              <span className="absolute bottom-0 w-full h-[10px] bg-black"></span>
            </>
          )}

          {(create || exist) && (
            <div className=" bg-gradient-to-r from-black via-slate-900 to-black h-screen">
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
