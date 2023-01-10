import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotPage from "./components/SpotPage";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotInformation from "./components/SpotInformation";
import EditSpotForm from "./components/EditSpotForm";
import CreateReviewForm from "./components/CreateReviewForm";
import EditReviewForm from "./components/EditReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotPage />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route exact path="/spots/:spotId/reviews/create">
            <CreateReviewForm />
          </Route>
          <Route exact path="/spots/:spotId/reviews/:reviewId/edit">
            <EditReviewForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotInformation />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
