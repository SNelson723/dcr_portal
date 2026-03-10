import { createElement } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { NavLink, useNavigate } from "react-router";

import { resetAppState } from "../../features/appSlice";
import {
  setIsOpen,
  resetNavState,
  setLastRoute,
  // setLogoutHover,
} from "../../features/navSlice";
import { resetTSState } from "../../features/tsSlice";
import { resetUserState } from "../../features/userSlice";

import { HomeIcon, UserIcon, CalendarIcon, CheckBadgeIcon } from "@heroicons/react/16/solid";
import { navItems, type Navigation } from "../../features";
import SignOutIcon from "../../icons/SignOutIcon";

const iconMap: Record<string, React.ComponentType<any>> = {
  home: HomeIcon,
  user: UserIcon,
  calendar: CalendarIcon,
  admin: CheckBadgeIcon,
};

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const ref = useRef<HTMLDivElement>(null);
  const nav = useAppSelector((state) => state.nav);
  const user = useAppSelector((state) => state.user);
  // const [itemHover, setItemHover] = useState<Navigation[]>(navItems);

  // CSS/Styles
  // const styleObj = () => {
  //   if (nav.isOpen) {
  //     return { zIndex: 1000 };
  //   }
  //   return {};
  // };

  // const slidingStyle =
  //   "data-[open=true]:w-[145px] md:data-[open=true]:w-[200px] data-[open=false]:w-0 md:data-[open=false]:w-12 transition-all duration-300 data-[open=true]:shadow-[0px_2px_4px_rgba(0,0,0,0.2)] data-[open=false]:shadow-[0px_3px_3px_rgba(0,0,0,0.2)]";

  const slidingStyle = "w-36 shadow-[0px_5px_4px_rgba(0,0,0,0.2)]";
  // handlers
  // const handleHover = (itemName: string, isHovering: boolean, idx: number) => {
  //   setItemHover((prev) =>
  //     prev.map((navItem) =>
  //       navItem.name === itemName ? { ...navItem, isHovering } : navItem,
  //     ),
  //   );

  //   // Find the mouse position to adjust the tooltip if needed in the future
  //   const mousePosition = { x: 0, y: 0 };
  //   document.addEventListener(
  //     "mousemove",
  //     (e) => {
  //       mousePosition.x = e.clientX;
  //       mousePosition.y = e.clientY;
  //     },
  //     { once: true },
  //   );
  //   const tooltip = document.getElementById(`tooltip-${idx}`);
  //   tooltip!.style.left = `${mousePosition.x}px`;
  //   tooltip!.style.top = `${mousePosition.y}px`;
  // };

  // const handleBottomNavHover = (isHovering: boolean, idx: number) => {
  //   dispatch(setLogoutHover(isHovering));

  //   // Find the mouse position to adjust the tooltip if needed in the future
  //   const mousePosition = { x: 0, y: 0 };
  //   document.addEventListener(
  //     "mousemove",
  //     (e) => {
  //       mousePosition.x = e.clientX;
  //       mousePosition.y = e.clientY;
  //     },
  //     { once: true },
  //   );
  //   const tooltip = document.getElementById(`tooltip-${idx}`);
  //   tooltip!.style.left = `${mousePosition.x}px`;
  //   tooltip!.style.top = `${mousePosition.y}px`;
  // };

  // const handleiFrameClick = () => {
  //   dispatch(setIsOpen(false));
  // };

  const handleNavClick = (item: Navigation) => {
    dispatch(setLastRoute(item.href));
    dispatch(setIsOpen(false));
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(resetAppState());
    dispatch(resetNavState());
    dispatch(resetTSState());
    dispatch(resetUserState());
  };

  // const itemHovering = (name: string) => {
  //   const item = itemHover.find((item) => item.name === name);
  //   return item ? item.isHovering : false;
  // };

  const adminCheck = (adminOnly: boolean) => {
    if (adminOnly && !user.isAdmin) {
      return false;
    } 
    return true;
  };

  return (
    <div
      // ref={ref}
      data-testid="nav-bar"
      data-open={true}
      className={`bg-bkg absolute top-12 left-0 min-h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] flex flex-col justify-between border-t ${slidingStyle}`}
      // style={styleObj()}
    >
      {/* using this to close the nav when clicking outside if it is open. User events are disabled in the Outlet when nav is open */}
      {/* {nav.isOpen && (
        <div
          id="fixed-frame"
          onClick={handleiFrameClick}
          className="fixed inset-0 z-40 top-12 left-48 transition-all duration-300"
          style={{ cursor: "default" }}
        />
      )} */}

      <div>
        {navItems.map((item: Navigation, i) => (
          <NavLink
            key={i}
            data-testid={`nav-${item.href}`}
            to={item.href}
            draggable={false}
            className={({ isActive }) =>
              `${isActive ? "text-indigo-500" : ""} ${adminCheck(item.adminOnly) ? "relative transition-all duration-200" : "hidden"}`
            }
            onClick={() => handleNavClick(item)}
            // onMouseEnter={() => handleHover(item.name, true, i)}
            // onMouseLeave={() => handleHover(item.name, false, i)}
          >
            <div className="flex w-full items-center md:pl-2 py-2 gap-2 hover:bg-indigo-200 transition-all duration-100">
              <div className="flex-shrink-0 flex items-center justify-center">
                {createElement(iconMap[item.iconKey], { className: "h-7 w-7" })}
              </div>
              <div
              // className={`font-medium text-sm ${
              //   nav.isOpen
              //     ? "w-full opacity-100"
              //     : "w-0 opacity-0 pointer-events-none"
              // } transition-all duration-200 text-nowrap`}
              >
                {item.name}
              </div>
            </div>
            {/* <div
              id={`tooltip-${i}`}
              className={`${
                itemHovering(item.name) && !nav.isOpen
                  ? "absolute text-nowrap text-sm shadow-[1px_2px_2px] shadow-content/30 left-12 h-full flex justify-center items-center bg-indigo-200 font-medium min-w-32 x-2 rounded-r-lg transition-all duration-200"
                  : "hidden"
              }`}
              style={{ zIndex: 9999 }}
            >
              {item.name}
            </div> */}
          </NavLink>
        ))}
      </div>
      <div className="select-none cursor-pointer">
        <div
          data-testid="signout-btn"
          className="flex w-full items-center pl-2 py-2 gap-3 hover:bg-indigo-200 transition-all duration-200 relative"
          onClick={handleLogout}
          // onMouseEnter={() => handleBottomNavHover(true, navItems.length + 1)}
          // onMouseLeave={() => handleBottomNavHover(false, navItems.length + 1)}
        >
          <div className="flex-shrink-0 flex items-center justify-center">
            <SignOutIcon className="h-7 w-7" />
          </div>
          <div
          // className={`font-medium text-sm ${
          //   nav.isOpen
          //     ? "w-full opacity-100"
          //     : "w-0 opacity-0 pointer-events-none"
          // } transition-all duration-200 text-nowrap`}
          >
            Sign Out
          </div>
          <div
            id={`tooltip-${navItems.length + 1}`}
            className={`${
              nav.logoutHover && !nav.isOpen
                ? "absolute text-nowrap text-sm shadow-[1px_2px_2px] shadow-content/30 left-12 h-full flex justify-center items-center bg-indigo-200 font-medium min-w-32 x-2 rounded-r-lg transition-all duration-200"
                : "hidden"
            }`}
            style={{ zIndex: 2500 }}
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
