import HeaderEnd from "./components/HeaderEnd";
import HeaderMiddle from "./components/HeaderMiddle";
import HeaderStart from "./components/HeaderStart";

const Header = () => {
  return (
    <header className="z-10 py-2">
      <div className="container flex items-center gap-4">
        <HeaderStart />
        <HeaderMiddle />
        <HeaderEnd />
      </div>
    </header>
  );
};

export default Header;
