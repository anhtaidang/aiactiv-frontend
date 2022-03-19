import React from "react";
import { Switch, withRouter } from "react-router-dom";
import "~/assets/scss/App.scss";
import Test from "~/containers/Test";

const App = () => {
  return (
    <div className="wrapper">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Test />
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default withRouter(App);
