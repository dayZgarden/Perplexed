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
import comp from '../../public/comp.jpeg'
import friends from "../assets/friends.json";
import readyArrow from "../assets/readyArrow.svg";
import cards from "../assets/cards.svg";
import rank from "../assets/rank.svg";
import trophy from "../assets/trophy.svg";
import arrow1 from "../assets/arrow1.svg";
import arrow2 from "../assets/arrow2.svg";
import arrow3 from "../assets/arrow3.svg";
import triviagames from "../assets/triviagames.svg";
import bigprizes from "../assets/bigprizes.svg";
import community from "../../public/community.svg";
import { FiMenu } from "react-icons/fi";
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
    <div className="h-full relative w-full  overflow-scroll scrollbar-hide bg-[#FFD9C6]">
      {!loading && (
        <div className="h-full w-full">
          {!create && !exist && (
            <div className="font-Bebas max-w-[1280px] w-[95%] mx-auto flex flex-col justify-between h-screen relative">
              <span className="absolute w-[328px] h-[245px] right-[200px] top-[620px]">
                <img src={blob2} alt="" />
              </span>
              <nav className="w-full h-[96px] text-[36px] flex justify-between  text-white">
                <h1 className="bg-black h-full flex items-center px-8 underline hover:bg-white hover:text-black transition-all duration-300">
                  Perplexed
                </h1>
                <ul className="h-full hidden md:flex items-center text-black justify-evenly max-w-[500px] w-full">
                  <li className="px-4 group relative">
                    <a href="">Home</a>
                    <span className="absolute opacity-0 group-hover:opacity-100 -left-6 group-hover:left-0 transition-all duration-[300ms] bottom-1 w-full border-b-2 border-black height-[10px] z-50"></span>
                  </li>
                  <li className="px-4 group relative">
                    <a href="">About</a>
                    <span className="absolute opacity-0 group-hover:opacity-100 -left-6 group-hover:left-0 transition-all duration-[300ms] bottom-1 w-full border-b-2 border-black height-[10px] z-50"></span>
                  </li>
                  <li className="px-4 group relative">
                    <a href="">Contact</a>
                    <span className="absolute opacity-0 group-hover:opacity-100 -left-6 group-hover:left-0 transition-all duration-[300ms] bottom-1 w-full border-b-2 border-black height-[10px] z-50"></span>
                  </li>
                  <li className="px-4 group relative">
                    <a href="">Account</a>
                    <span className="absolute opacity-0 group-hover:opacity-100 -left-6 group-hover:left-0 transition-all duration-[300ms] bottom-1 w-full border-b-2 border-black height-[10px] z-50"></span>
                  </li>
                </ul>
                <FiMenu className="h-16 w-16 translate-x-[10%] translate-y-[10%] text-black inline md:hidden" />
              </nav>
              <div className="flex items-center">
                <div className="z-50">
                  <div className="relative z">
                    <h1 className="text-[10vw] sm:text-[64px] md:text-[76px] xl:text-[84px] w-full  max-w-[832px] leading-none lg:leading-[80px] xl:leading-[101px] z-50">
                      Show off your knowledge and win awards. really.
                    </h1>
                    <span className="absolute max-w-[277px] max-height-[259px] w-full h-full right-0 top-0 z-[-1]">
                        <img src={blob1} alt="" />
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <img className="w-[150px] h-[150px] " src={line} alt="" />
                    <button
                      onClick={() => setCreate(true)}
                      className="bg-[#c084fc] mt-4 w-[40%] hover:tracking-wide  transition-all duration-300 hover:max-w-[260px] translate-y-[35%] max-w-[232px] rounded-md sm:w-full text-[32px] border-4  h-full py-2 border-black shadow-cool2"
                    >
                      Compete now
                    </button>
                  </div>
                </div>
                <figure
                  className="w-[48%] md:inline hidden max-h-[400px]  h-full translate-y-[-10%]"
                  ref={brainRef}
                ></figure>
              </div>
              <div className="flex  justify-between h-[400px]">
                <p className="font-Inria text-[18px] hidden md:inline  lg:text-[32px] lg:border-b-4 border-black lg:max-w-[480px] w-[80%] mx-auto lg:mx-0 lg:w-full h-[90%] leading-[43px] z-50">
                  If you are looking for a fun way to test your knowledge, you
                  have come to the right place. Perplexed is a platform where you
                  can compete with your friends and other people to hone your skills and win awards.
                </p>
                <div className="border-r-4 border-black hidden md:inline h-[90%]"></div>
                <div className="cards z-50 flex space-x-10 pl-6 mx-auto sm:mx-0">
                  <div className="card1  hover:scale-110 transition-all duration-300 cursor-default w-[260px] h-[310px] bg-white shadow-cool2 border-4 border-black rounded-md">
                    <h1 className="font-Bebas flex items-center  text-[20px] bg-[#fb923c] h-[15%] border-b-4 border-black ">
                      <span className="ml-4">News</span>
                    </h1>
                    <div className="p-4 space-y-2 flex flex-col justify-center">
                      <h2 className="font-Inria font-light text-[18px] flex items-center">
                        <FiClock className="mr-1 w-6 h-6" /> 05/22/2021
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
                  <div className="card1 hidden sm:inline hover:scale-110 transition-all duration-300 cursor-default w-[260px] h-[310px] bg-white shadow-cool2 border-4 border-black rounded-md">
                    <h1 className="font-Bebas flex items-center  text-[20px] bg-[#fde047] h-[15%] border-b-4 border-black ">
                      <span className="ml-4">News</span>
                    </h1>
                    <div className="p-4 space-y-2 flex flex-col justify-center">
                      <h2 className="font-Inria font-light text-[18px] flex items-center">
                        <FiClock className="mr-1 w-6 h-6" /> 11/11/2021
                      </h2>
                      <h1 className="leading-[29px] text-[24px] font-Bebas">
                        Perplexed team awards $2,500 in prize money.
                      </h1>
                      <p className="font-Inria font-bold">
                        A woman from Richmond Virginia strikes big with a $2,500 cash payout.
                         <br />{" "}
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
              <div className="mt-[132px] max-w-[1280px] w-[80%]  xl:w-[60%]  mx-auto bg-black text-white font-Bebas text-[20px] md:text-[28px] lg:text-[36px] border-4 border-black p-6 rounded-md flex items-center justify-center">
                32 Genres | 500,000 Questions | 300 Active Players
              </div>

              <section className="h-[100vh] relative max-w-[1280px] mx-auto my-[132px]">
                <div>
                  <h1 className="w-[70%] lg:w-[40%] mx-auto text-center border-4 border-b-0 border-black p-4 font-Bebas text-[52px]">
                    Awarding Growth
                  </h1>
                  <h2 className="mt-10 w-[60%] mx-auto text-center text-[24px] font-Inria">
                    Our goal is to educate players and provide awards for growth
                    through our platform. Start playing, rank up, and win.
                  </h2>
                </div>
                <div className="cards flex flex-col  lg:flex-row items-center justify-center space-x-20 mt-20">
                  <div className="card transition-all duration-300 cursor-default flex flex-col items-center relative rotate-[-2deg] max-w-[324px] rounded-md h-[404px] w-full bg-[#c084Fc] border-4 border-black shadow-cool2">
                    <img className="mt-20" src={cards} alt="" />
                    <span
                      className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold "
                    >
                      1
                    </span>
                    <p className="leading-[38px] text-[32px] font-Bebas w-[70%] mt-12 text-center">
                      Create an Account & Start Playing.
                    </p>
                  </div>
                  <div className="card rotate-[-2deg] transition-all duration-300 cursor-default mt-6 lg:mt-0 flex flex-col items-center relative max-w-[324px] translate-y-[8%] rounded-md h-[404px] w-full bg-[#fb923c] border-4 border-black shadow-cool2">
                    <img className="mt-20" src={rank} alt="" />
                    <span
                      className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold "
                    >
                      2
                    </span>
                    <p className="leading-[38px] text-[32px] font-Bebas w-[80%] mt-10 text-center">
                      Play quizzes, learn, and rank up.
                    </p>
                  </div>
                  <div className="card rotate-[-2deg] transition-all duration-300 cursor-default mt-28 lg:mt-0 flex flex-col items-center relative max-w-[324px] rounded-md h-[404px] w-full bg-[#fde047] border-4 border-black shadow-cool2">
                    <img
                      className="mt-20 rotate-[-5deg]"
                      src={trophy}
                      alt=""
                    />
                    <span
                      className="absolute top-[-30px] right-[-10px] bg-white rounded-md shadow-cool2 border-4 border-black max-w-[90px] w-full h-[100px]
                     flex justify-center items-center text-[80px] font-bold "
                    >
                      3
                    </span>
                    <p className="leading-[38px] text-[32px] font-Bebas w-[80%] mt-12 text-center">
                      Gain points, spin the wheel & win big.
                    </p>
                  </div>
                </div>
                <img
                  className="absolute opacity-0 md:opacity-100 top-[20%] left-[-5%] lg:top-[-20px] rotate-[-50deg] lg:rotate-[-10deg] lg:left-[-60px] scale-100"
                  src={arrow1}
                  alt=""
                />
              </section>

              <div className="md:w-[60%] w-[80%] mt-[1250px] sm:mt-[1150px] md:mt-[1000px] lg:mt-0 max-w-[1280px] mx-auto border-t-[6px] border-black mb-[132px]"></div>

              <section className="h-[100vh] max-w-[1280px] mx-auto relative">
                <h1 className=" w-[70%] lg:w-[40%] mx-auto text-center border-4 border-b-0 border-black p-4 font-Bebas text-[52px]">
                  Compete With Friends
                </h1>
                <div className="mt-28 flex flex-col-reverse  lg:flex-row">
                  <div className="flex flex-col w-[90%] lg:w-[45%] mx-auto mt-12 lg:mx-0 lg:mt-0">
                    <h1 className=" font-Bebas text-[52px]  leading-[58px] w-[100%]">
                      Compete against friends in head to head trivia games. 
                    </h1>
                    <ul className="mt-8 space-y-8 flex flex-col h-[320px] justify-between">
                      <li className="flex items-center">
                        <figure className="bg-[#c084fc] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img className="p-1" src={question} alt="" />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Find out what you know
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[25px]">
                            After creating an account, start playing free trivia
                            quizzes to start learning.
                          </h2>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <figure className="bg-[#fde047] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img className="p-1" src={add} alt="" />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Connect with friends
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[25px]">
                            Add your friends and family then freely compete against each other.
                          </h2>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <figure className="bg-[#fb923c] flex items-center justify-center scale-110 rounded-md shadow-cool2 border-4 border-black aspect-square w-[80px] h-[80px]">
                          <img className="p-1" src={compete} alt="" />
                        </figure>
                        <div className="flex flex-col ml-8">
                          <h1 className="text-[40px] font-Bebas leading-[43px]">
                            Start competing
                          </h1>
                          <h2 className="font-Inria w-[70%] text-[24px] leading-[25px]">
                            Compete against people all over the world in head to head trivia games. 
                          </h2>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <figure
                    className="lg:w-[40%] w-[70%] ml-12 mt-24 flex justify-center items-center " 
                  >
                    <img className="rounded-tl-[80px] rounded-br-[80px] shadow-cool2 border-4 border-black" src={comp} alt="" />
                  </figure>
                </div>
              </section>

              <section className="h-[100vh] mt-[640px] sm:mt-[400px] lg:mt-0 max-w-[1280px] mx-auto relative">

                <h1 className="w-[70%] lg:w-[40%] mx-auto text-center border-4 border-b-0 border-black p-4 font-Bebas text-[52px]">
                  How to win
                </h1>
                <div className="mt-24 flex flex-col  lg:flex-row justify-between items-center">
                  <img className="w-[80%] lg:w-[48%] max-h-[550px]" src={wheel} alt="" />
                  <div className="w-[80%] lg:w-[48%] relative h-[550px] flex flex-col translate-y-[6%]">
                    <h1 className="font-Bebas text-[52px]  leading-[58px] w-[100%]">
                      Collect coins through trivia and then spin the wheel to
                      win big.
                    </h1>
                    <p className="font-Inria mt-2 lg:w-[80%] text-[42px] leading-[58px]">
                      Correct answers for quizzes award coins. Higher
                      difficulties and winning a head2head offers more.
                    </p>
                    <div className="relative lg:max-w-[232px] rounded-md w-[60%] lg:w-full">
                      <button
                        onClick={() => setCreate(true)}
                        className="bg-[#c084fc]  mt-2 font-Bebas translate-y-[35%] lg:max-w-[232px] rounded-md w-[100%] lg:w-full text-[32px] px-1 border-4 py-2 border-black shadow-cool2"
                      >
                      spin the wheel
                    </button>
                    {/* <img
                      className="absolute opacity-0 sm:opacity-100 sm:right-[-65%] md:right-[-50%] lg:right-[-85%]  top-0"
                      src={wheelArrow}
                      alt=""
                    /> */}

                    </div>
                  </div>
                </div>
              </section>

              <div className="md:w-[60%] w-[80%] mt-[560px] lg:mt-0 mx-auto border-t-[6px] border-black mb-[132px]"></div>

              <div className="bg-white mt-20 lg:mt-0 relative rounded-md border-black border-4 shadow-cool2 h-[400px] md:h-[340px] w-[80%] lg:w-[48%] mx-auto mb-[260px] flex flex-col items-center justify-center space-y-4">
                <h1 className="leading-[115px] text-[50px] sm:text-[70px] lg:text-[80px]  xl:text-[96px] font-Bebas">
                  Are you ready?
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center space-x-4">
                  <p className="text-[24px] lg:text-[36px] leading-[43px] w-[70%] md:w-[45%] font-Bebas">
                    join perplexed today to be apart of the next big thing
                  </p>
                  <div className="relative w-[80%] md:w-[35%] h-[90%]">

                  <button
                    onClick={() => setCreate(true)}
                    className="bg-[#c084fc] rotate-[-1deg] mt-2 font-Bebas rounded-md w-full h-[100%] text-[32px] px-1 border-4 py-2 border-black shadow-cool2"
                  >
                    compete now
                  </button>
                  <img
                    className="absolute opacity-0 lg:opacity-100 top-[-100px] right-0"
                    src={readyArrow}
                    alt=""
                  />
                  </div>
                </div>
              </div>

              <nav className="font-Bebas max-w-[1400px] mx-auto w-full h-[96px] translate-x-[-50%] left-1/2 absolute bottom-[2px] text-[36px] flex justify-between  text-white">
                <h1 className="h-full mx-auto md:mx-0 text-black flex items-center px-8 underline">
                  Perplexed
                </h1>
                <ul className="h-full hidden md:flex items-center text-black justify-evenly max-w-[500px] w-full">
                  <li className="px-4  ">Home</li>
                  <li className="px-4  ">Services</li>
                  <li className="px-4  ">People</li>
                </ul>
              </nav>

              <span className="absolute bottom-0 w-full h-[20px] bg-black"></span>
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
