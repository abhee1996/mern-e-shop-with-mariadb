import logo from "./logo.svg";
import "./App.css";
import { Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Register from "./components/Register";

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <div className="App-body">
                <header class="p-3  border-bottom">
                  <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                      <a
                        href="/"
                        class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
                      >
                        <svg
                          class="bi me-2"
                          width="40"
                          height="32"
                          role="img"
                          aria-label="Bootstrap"
                        ></svg>
                      </a>

                      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li onClick={() => navigate("/home")}>
                          <a href="#" class="nav-link px-2 link-info">
                            Home
                          </a>
                        </li>
                        <li onClick={() => navigate("/posts")}>
                          <a href="#" class="nav-link px-2 link-info">
                            Posts
                          </a>
                        </li>
                        <li onClick={() => navigate("/login")}>
                          <a href="#" class="nav-link px-2 link-info">
                            Login
                          </a>
                        </li>
                        <li onClick={() => navigate("/register")}>
                          <a href="#" class="nav-link px-2 link-info">
                            Register
                          </a>
                        </li>
                      </ul>

                      <div class="dropdown text-end">
                        <a
                          href="#"
                          class="d-block link-dark text-decoration-none dropdown-toggle"
                          id="dropdownUser1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src="https://github.com/mdo.png"
                            alt="mdo"
                            width="32"
                            height="32"
                            class="rounded-circle"
                          />
                        </a>
                        <ul
                          class="dropdown-menu text-small"
                          aria-labelledby="dropdownUser1"
                        >
                          <li>
                            <a class="dropdown-item" href="#">
                              Settings
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Profile
                            </a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Sign out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </header>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome to my <code style={{ color: "purple" }}>Blog</code>
                </p>
              </div>
            </>
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
