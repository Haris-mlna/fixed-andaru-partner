"use client";

import * as React from "react";
import WaveSVG from "../components/ui/wave/wave";
import Image from "next/image";
import logo from "../assets/icons/logo-landscape.png";
import { motion } from "framer-motion";
import { handleLogin } from "./page.service";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/user/user-context";
import Swal from "sweetalert2";

const Landing = () => {
  const { setUser, user } = useUser();
  const navigate = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [messages, setMessages] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  React.useEffect(() => {
    const emailLocal = localStorage.getItem("use");
    const passwordLocal = localStorage.getItem("pass");
    const localRemember = localStorage.getItem("rem");

    if (emailLocal && passwordLocal) {
      setEmail(emailLocal);
      setPassword(passwordLocal);
      // Convert string to boolean
      setRemember(localRemember === "true");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailLocal = localStorage.getItem("use");
    const passwordLocal = localStorage.getItem("pass");
    const localRemember = localStorage.getItem("rem");

    if (remember) {
      localStorage.setItem("use", email);
      localStorage.setItem("pass", password);
      localStorage.setItem("rem", remember);
    } else {
      localStorage.removeItem("use");
      localStorage.removeItem("pass");
      localStorage.removeItem("rem");
    }

    handleLogin({
      email,
      password,
      setLoading,
      setUser,
      setMessages,
      navigate,
    }).then((res) => {
      if (res === "ok") {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          text: "Selamat datang di bisnis partner!",
          width: 350,
          timerProgressBar: true,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleInput = (e, setValue) => {
    const { value } = e.target;

    setValue(value);
  };

  return (
    <div className="w-full relative overflow-hidden h-screen max-h-screen flex items-center justify-center flex-col gap-1 bg-gradient-to-br from-primary to-slate-950">
      <motion.div
        initial={{
          translateY: 40,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6 }}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className=" w-80 z-50 min-h-96 mb-20 overflow-hidden bg-white rounded-lg shadow-md px-4 py-4 flex flex-col gap-1"
        >
          <div className="py-4">
            <div className="w-full h-14 mb-4">
              <Image
                src={logo}
                className="h-full object-contain w-auto"
                alt="LOGO"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-slate-400">
                Username
              </label>
              <input
                type="text"
                className="w-full h-10 rounded border border-slate-200 placeholder-outfit px-2 text-sm outline-none"
                placeholder="Masukan username..."
                value={email}
                onChange={(e) => {
                  handleInput(e, setEmail);
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-slate-400">
                Password
              </label>
              <input
                type="password"
                className="w-full h-10 rounded border border-slate-200 placeholder-outfit px-2 text-sm outline-none"
                placeholder="Masukan password..."
                value={password}
                onChange={(e) => {
                  handleInput(e, setPassword);
                }}
              />
            </div>
          </div>
          <div>
            {messages && (
              <div
                className={`w-full rounded p-2 
								${messages?.error === "warning" && "bg-yellow-100 border border-yellow-200"}
								${messages?.error === "danger" && "bg-red-100 border border-red-500"}
								`}
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMessages(null);
                    }}
                    className={` z-20 absolute top-0 right-0`}
                  >
                    <FontAwesomeIcon icon={faXmark} width={10} />
                  </button>
                </div>
                <div>
                  <p
                    className={`m-0 p-0 text-sm 
										${messages?.error === "warning" && "text-yellow-400"}
										${messages?.error === "danger" && "text-red-700"}
										`}
                  >
                    {messages?.text}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex py-2 items-center justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id=""
                checked={remember}
                onChange={() => {
                  setRemember(!remember);
                }}
              />
              <label htmlFor="" className="text-sm text-slate-400">
                Ingat saya
              </label>
            </div>
            <div
              onClick={() => {
                // console.log(user);
              }}
              className="text-sm text-slate-400 cursor-pointer"
            >
              Lupa password?
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center items-center h-10 transition-all ease-in-out duration-300 rounded bg-gradient-to-br from-indigo-900 to-indigo-600 text-white text-sm shadow-md hover:shadow-lg hover:bg-gradient-to-br hover:from-indigo-800 hover:to-indigo-500"
          >
            {loading ? (
              <>
                <CircularProgress sx={{ color: "white" }} size={20} />
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </motion.div>
      <WaveSVG />
    </div>
  );
};

export default Landing;
