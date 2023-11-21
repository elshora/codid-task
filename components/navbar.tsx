import { Menu } from "lucide-react";

const Navbar = async () => {
  return (
    <header className="bg-light-500 p-4 text-dark shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Menu />
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        <div className="flex items-center">
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
