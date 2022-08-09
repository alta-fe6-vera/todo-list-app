import React from "react";
import { Link } from "react-router-dom";

import { FaCalendarAlt } from "react-icons/fa";
import teaList from "../assets/tea_list_white.png";

const CustomHeader = (props) => {
  return (
    <nav className="sticky top-0 w-full flex justify-around px-2 py-2.5 bg-[#29660C] text-white">
      <Link to="/" className="flex">
        <img src={teaList} alt="Tea List" className="w-12"></img>
        <p className="font-bold self-center text-xl">Tea List</p>
      </Link>
      <div className="flex self-center font-semibold text-md">
        <Link to="/" className="mr-4 flex">
          <FaCalendarAlt className="self-center mr-1 text-white" />
          <p className="self-center">HOME</p>
        </Link>
        <label className="relative ml-4 flex">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex item-center">
            <svg className="h-4 w-4 fill-gray-50" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="placeholder:italic dark:text-black placeholder:text-neutral-500 bg-gray-100 w-full border border-neutral-400 focus:outline-none focus:border-neutral-500 focus:ring-neutral-500 py-1 pl-4 pr-2"
            placeholder="Search Todo.."
            type="text"
            name="search"
            onKeyDown={props.onKeyDown}
          />
        </label>
      </div>
    </nav>
  );
};

export { CustomHeader };
