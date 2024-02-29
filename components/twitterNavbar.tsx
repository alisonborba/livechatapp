"use client";

import React from "react";
import {
  FaHome,
  FaHashtag,
  FaRegBell,
  FaRegEnvelope,
  FaRegBookmark,
  FaRegListAlt,
  FaUserAlt,
  FaEllipsisH,
} from "react-icons/fa";
import { VscTwitter } from "react-icons/vsc";

import { signOut } from "next-auth/react";

function TwitterNavbar() {
  return (
    <div className="flex flex-col justify-between m-4 -mb-16">
      <button
        onClick={() => signOut()}
        className="cursor-pointer bg-white rounded-full border border-gray-200 text-gray-800 px-4 py-2 flex items-center space-x-2 hover:bg-gray-200 w-20"
      >
        {/* <img
          className="h-8 w-8 rounded-full"
          src="https://xsgames.co/randomusers/avatar.php?g=male"
          alt="User profile"
        /> */}
        <span>Logout</span>
      </button>
    </div>
  );
}

const NavItem = ({ icon, label }) => (
  <div className="mb-2 hover:bg-gray-200 rounded-full py-2 px-4 flex items-center space-x-2">
    {icon}
    <span>{label}</span>
  </div>
);

export default TwitterNavbar;
