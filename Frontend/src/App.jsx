import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Body from "./pages/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Registration from "./components/Registration";
import DashBoard from "./components/DashBoard";
import AddSweet from "./components/AddSweet";
import UpdateSweet from "./components/UpdateSweet";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<DashBoard />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/registration" element={<Registration />}></Route>
              <Route path="/add/sweet" element={<AddSweet />}></Route>
              <Route
                path="/update/sweets/:sweetId/:sweetName"
                element={<UpdateSweet />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
