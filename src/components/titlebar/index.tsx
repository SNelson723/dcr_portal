import logo from "../../assets/dcr-logo.png";
// import { setIsOpen } from "../../features/navSlice";
// import { useAppSelector, useAppDispatch } from "../../hooks";

const TitleBar = () => {
  // const dispatch = useAppDispatch();
  // const isOpen = useAppSelector((state) => state.nav.isOpen);

  // const toggleNav = () => {
  //   dispatch(setIsOpen(!isOpen));
  // };

  return (
    <div
      data-testid="title-bar"
      className="h-12 w-36 absolute cursor-default select-none bg-bkg"
      // className="h-12 w-full cursor-default select-none bg-bkg"
    >
      <div
        data-testid="logo-area"
        className={` flex items-center shadow-[0px_0px_4px_rgba(0,0,0,0.2)] cursor-default`}
        // className={`w-[202px] flex items-center shadow shadow-content/10 border-r cursor-pointer hover:bg-indigo-200 transition-all duration-300`}
        // onClick={toggleNav}
      >
        <img src={logo} alt="Logo" className="h-8 w-24 m-2 inline-block" />
        {/* <div className="font-medium text-center w-[44%]">Menu</div> */}
      </div>
    </div>
  );
};

export default TitleBar;
