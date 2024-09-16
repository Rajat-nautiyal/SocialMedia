import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setProfileUser, setMode } from "../../state/index.jsx";
import { useMediaQuery } from "@react-hook/media-query";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoLogoGithub } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import "../../pages/home/home.css";
import { Search } from "../../component/search.jsx";
import {
  setMessagePageBool,
  setNavClickValue,
  setNotifyPageBool,
} from "../../state/index.jsx";
import NotifySound from "../../../public/assets/notification.mp3";
import { socketHook } from "../../hooks/socketHook.jsx";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [settings, setSettings] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const lastChat = useSelector((state) => state.userSlice.lastMessage);
  const userId = useSelector((state) => state.userSlice.user._id);
  const mode = useSelector((state) => state.userSlice.mode);
  const messagePageBool = useSelector(
    (state) => state.userSlice.messagePageBool
  );
  const messagePageRef = useRef(messagePageBool); // Ref to store the latest value of messagePageBool
  const notifyPageBool = useSelector((state) => state.userSlice.notifyPageBool);
  const navClickValue = useSelector((state) => state.userSlice.navClickValue);
  const notifications = useSelector((state) => state.userSlice.notifications);
  // console.log(notifications)
  const Count = notifications.filter((n) => n.read === false);
  const notifyCount = Count.length;
  const socket = socketHook();

  const [darkMode, setDarkMode] = useState(null);
  const clickGit = () => {
    window.open(`https://github.com/Rajat-nautiyal`);
  };
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem("darkMode", JSON.parse(newMode));
    const getMode = JSON.parse(localStorage.getItem("darkMode"));
    dispatch(setMode(getMode));
    setDarkMode(getMode);
  };

  const handleClick = () => {
    if (notifyPageBool === true) {
      dispatch(setNotifyPageBool(!notifyPageBool));
    }
    dispatch(setProfileUser(null));
    dispatch(setNavClickValue("home"));
    navigate("/");
  };
  const handleClickUsers = () => {
    dispatch(setNavClickValue("users"));
    navigate("/users");
  };
  const handleClickNotify = () => {
    if (messagePageBool === true) {
      dispatch(setMessagePageBool(!messagePageBool));
    }
    if (notifyPageBool === true) {
      dispatch(setNotifyPageBool(!notifyPageBool));
    }
    dispatch(setNotifyPageBool(!notifyPageBool));
  };
  const handleClickMessage = () => {
    dispatch(setMessagePageBool(!messagePageBool));
    setNewMessage(null);
    // setLastMessage(null)
    if (notifyPageBool === true) {
      dispatch(setNotifyPageBool(!notifyPageBool));
    }
  };
  useEffect(() => {
    messagePageRef.current = messagePageBool;
  }, [messagePageBool]); //messagePageBool wasn't updating immediately in navabr

  const handleLogout = async () => {
    try {
      await fetch("https://server-side-delta.vercel.app/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      dispatch(setLogout());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.on("new-message", (data) => {
      if (data.message && data.senderId && data.receiverId === userId) {
        // Play sound if the message page is not open
        if (!messagePageRef.current) {
          const messageSound = new Audio(NotifySound);
          messageSound.play();
        }
        setNewMessage(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const getMode = JSON.parse(localStorage.getItem("darkMode"));
    dispatch(setMode(getMode));
    setDarkMode(getMode);
    setTimeout(() => {
      setLastMessage(lastChat.filter((c) => c.read === false) ? true : false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="top-header" id={mode ? "darkTopheader" : ""}>
        <div className="flex flex-row w-9/12 sticky top-0 ml-1">
          <div className="nameNsearch">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex flex-row text-[30px] items-center max-md:text-[26px]"
            >
              <IoShareSocialOutline className="text-white text-[35px] h-8 w-8 pr-[1px] bg-blue-700 rounded-full mr-1" />
              <div className="font-roboto">SocialEra</div>
            </div>
            <div className="text-[18px] w-auto max-md:overflow-hidden max-md:rounded-full">
              <Search />
            </div>
          </div>
          <div className="navHeader scrollbar-hide">
            <div
              className="flex justify-center gap-[6%] max-md:gap-0 w-[100%] text-[25px] 
              overflow-y-hidden scrollbar-hide  max-md:justify-center 
              max-md:items-center max-md:bg-black max-md:bg-opacity-90 max-md:w-auto 
              max-md:rounded-full max-md:py-2 max-md:mx-2 max-md:z-10 max-md:px-2"
            >
              <div
                className={`hover:bg-gray-300 max-md:ml-1 max-md:hover:bg-black cursor-pointer py-2 px-8 max-md:px-6 transition-all 
                rounded-lg max-tl:px-4`}
                id={
                  navClickValue == "home" && !mode
                    ? "home"
                    : navClickValue == "home" && mode
                    ? "darkHome"
                    : null
                }
                onClick={handleClick}
              >
                <RiHome2Line
                  className={
                    mode && navClickValue === "home"
                      ? `text-primary-Default`
                      : ``
                  }
                />
              </div>
              <div
                className="hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all max-md:px-6
              rounded-lg max-tl:px-4"
                id={
                  navClickValue == "users" && !mode
                    ? "users"
                    : navClickValue == "users" && mode
                    ? "darkUsers"
                    : null
                }
                onClick={handleClickUsers}
              >
                <FaUsers
                  className={
                    mode && navClickValue === "users"
                      ? `text-primary-Default`
                      : ``
                  }
                />
              </div>
              <div
                onClick={handleClickNotify}
                id={
                  notifyPageBool && !mode
                    ? "notify"
                    : notifyPageBool && mode
                    ? "darkNotify"
                    : null
                }
                className="relative hover:bg-gray-300 max-tl:px-4 max-md:px-6 cursor-pointer py-2 px-8 transition-all rounded-lg overflow-hidden"
              >
                {notifyCount !== 0 ? (
                  <div
                    className="absolute top-0 right-3 max-tl:right-1 flex items-center justify-center h-5 w-5
                 text-[14px] font-semibold text-white rounded-full bg-red-600"
                  >
                    {notifyCount}
                  </div>
                ) : null}
                <MdOutlineNotificationsActive
                  className={`${
                    mode && notifyPageBool ? "text-primary-Default" : ""
                  } text-[24px]`}
                />
              </div>
              <div
                onClick={handleClickMessage}
                className="relative hover:bg-gray-300 max-md:mr-1 max-tl:px-4 max-md:px-6 cursor-pointer py-2 px-8 transition-all rounded-lg"
                id={
                  messagePageBool && !mode
                    ? "chat"
                    : messagePageBool && mode
                    ? "darkChat"
                    : null
                }
              >
                {(newMessage?.message || lastMessage) && (
                  <div className="absolute top-0 right-5 max-tl:right-0 h-4 w-4 max-md:right-3 flex items-center justify-center">
                    <GoDotFill className="absolute text-red-500 text-[22px]  animate-ping" />
                    <GoDotFill className="text-red-500 text-[22px]" />
                  </div>
                )}
                <AiOutlineMessage
                  className={
                    mode && messagePageBool ? `text-primary-Default` : ``
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {!isMobile ? (
          <div className="flex flex-row items-center w-[20%] justify-around text-[25px]">
            <div
              onClick={toggleDarkMode}
              className="hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg"
            >
              {mode ? (
                <MdLightMode className="text-customGray" />
              ) : (
                <MdDarkMode />
              )}
            </div>
            <div
              onClick={handleLogout}
              className="hover:bg-gray-300 cursor-pointer py-2 px-8 
          transition-all rounded-lg"
            >
              <IoIosLogOut />
            </div>
            <div
              className="hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all 
          rounded-lg"
              onClick={clickGit}
            >
              <IoLogoGithub />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <IoIosSettings
              className="text-[27px] text-slate-500"
              onClick={() => setSettings(!settings)}
            />
            <div
              className="hover:bg-gray-300 text-[26px] cursor-pointer ml-3 transition-all 
          rounded-lg"
              onClick={clickGit}
            >
              <IoLogoGithub />
            </div>
            {settings ? (
              <div
                className="absolute top-[50px] right-2 flex flex-col items-center 
            text-[25px] rounded-xl bg-secondary-darkThree text-white"
              >
                <div
                  onClick={toggleDarkMode}
                  className="hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg"
                >
                  {mode ? (
                    <MdLightMode className="text-customGray" />
                  ) : (
                    <MdDarkMode />
                  )}
                </div>
                <div
                  onClick={handleLogout}
                  className="hover:bg-gray-300 cursor-pointer py-2 px-8 
            transition-all rounded-lg"
                >
                  <IoIosLogOut />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};
