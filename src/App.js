import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
// import ChatExample from "./pages/main/ChatExample/Chat";
import Chat from "./pages/main/Chat/Chat.jsx";
// import Counter from "./pages/main/Counter/CounterFunctional";
import Register from "./pages/auth/Register/Register";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const newSocket = io.connect("http://localhost:3003", {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connect Socket Client !");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute
            restricted={true}
            path="/login"
            exact
            component={Login}
          />
          <PublicRoute
            restricted={true}
            path="/register"
            exact
            component={Register}
          />
          <PrivateRoute restricted={true} path="/" exact component={Chat} />
          {/* <PrivateRoute
            socket={socket}
            path="/chat"
            exact
            component={ChatExample}
          /> */}
          {/* <PrivateRoute path="/counter" exact component={Counter} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
