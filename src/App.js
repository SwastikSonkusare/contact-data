import "leaflet/dist/leaflet.css";
import "./index.css";

import SideBar from "./components/SideBar";

const App = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <SideBar />
      {children}
    </div>
  );
};

export default App;
