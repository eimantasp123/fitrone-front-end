import { useContext, useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import { formatDate } from "../../utils/formatDate";
import authContext from "../../context/AuthContext";
import { MdSearch } from "react-icons/md";
import ImageWithSkeleton from "../common/ImageWithSkeleton";
import { NavLink } from "react-router-dom";

export default function TrainerHeader() {
  const [todayDate, setTodayDate] = useState("");
  const { user } = useContext(authContext);

  useEffect(() => {
    const today = new Date();
    setTodayDate(formatDate(today));
  }, []);

  return (
    <header className="flex min-h-20  border-b-[1px] border-gray-200 bg-secondary md:bg-background justify-between items-center gap-10  ">
      {/* Search Icon for Small Screens */}
      <div className="flex w-full justify-center max-w-[25%] min-w-[50px] md:hidden">
        <MdSearch className="text-accent1 text-2xl cursor-pointer" />
      </div>

      {/* Welcome Text */}
      <div className="w-[20%] pl-8 hidden whitespace-nowrap md:block min-h-[40px] ">
        Wellcome, <span className="font-medium">{user.firstName}</span>
        <div className="text-[14px]">{todayDate}</div>
      </div>

      {/* Logo in Center */}
      <div className="text-center w-full max-w-[50%] min-w-[50px] md:hidden">
        <span className="font-bold text-xl text-white">LOGO</span>
      </div>

      {/* Search Input for Medium and Larger Screens */}

      <SearchInput className="flex-grow hidden md:block" />

      {/* User Profile */}
      <NavLink
        to="/profile"
        className="w-full max-w-[25%] min-w-[50px] md:min-w-[80px]  md:max-w-[10%] xl:min-w-[250px] xl:max-w-[20%] flex items-center px-4 py-4 transition-colors duration-200 ease-in-out xl:pr-8  cursor-pointer justify-center "
      >
        <ImageWithSkeleton src={user.profileImage} className="" alt={user.fullName} size="40px" />
        <div className="hidden xl:block ml-4 whitespace-nowrap">
          <div className="font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500 mt-[-2px]">{user.email}</div>
        </div>
      </NavLink>
    </header>
  );
}
