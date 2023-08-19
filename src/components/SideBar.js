import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="w-1/4 bg-black p-4 shadow-lg">
      <ul className="flex flex-col gap-y-64">
        <li className="mb-2 text-3xl">
          <a
            href="/"
            className={
              location.pathname === "/"
                ? "text-blue-600 hover:underline "
                : "text-white"
            }
          >
            Contact
          </a>
        </li>
        <li className="text-3xl whitespace-normal">
          <a
            href="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "text-blue-600 hover:underline "
                : "text-white"
            }
          >
            Dashboard
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
