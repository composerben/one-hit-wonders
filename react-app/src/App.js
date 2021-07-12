import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import KitList from "./components/KitList/KitList";
import User from "./components/User/User";
import KitPage from "./components/KitPage/KitPage";
import KitForm from "./components/KitForm/KitForm";
import DrumMachine from "./components/DrumMachine/DrumMachine";
import SplashPage from "./components/SplashPage/SplashPage";
import EditKitForm from "./components/EditKitForm/EditKitForm";
import EditSampleForm from "./components/EditSampleForm/EditSampleForm";

import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/kits" exact={true}>
          <KitList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/kits/:kitId" exact={true}>
          <KitPage setLoaded={setLoaded}/>
        </Route>
        <Route path="/new-kit" exact={true}>
          <KitForm />
        </Route>
        <Route path="/hit-stuff" exact={true}>
          <DrumMachine />
        </Route>
        <Route path="/edit-kit/:id" exact={true}>
          <EditKitForm />
        </Route>
        <Route path="/edit-sample/:id" exact={true}>
          <EditSampleForm />
        </Route>
        <h1>404: Not Found</h1>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
