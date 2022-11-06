import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import cn from "classname";
import { useEffect } from "react";
import Login from "./components/login/Login";
import TaskList from "./components/taskList/TaskList";
import Header from "./components/header/Header";
import { Preloader } from "./components/сommon/preloader/Preloader";
import { checkAuthThunkCreator } from "./redux/app-reducer";
import { changeFilter } from "./redux/task-reducers";
import { getInitializedStatus } from "./redux/app-selector";
import { getAuthStatus, getMyUserId } from "./redux/auth-selector";

const App = (props) => {
  let location = useLocation();
  useEffect(() => {
    props.checkAuthThunkCreator();
    const queryString = location.search;
    if (queryString) {
      props.changeFilter(
        Object.fromEntries(new URLSearchParams(queryString).entries())
      );
    }
  }, []);

  const contentClassNames = cn("app-container", {
    "content-container": props.isAuth,
  });

  return props.initialized ? (
    <>
      <div className="header-wrapper container">
        <Header />
      </div>
      <div className="content-wrapper container ">
        <div className={contentClassNames}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/task/${props.userId}`} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/task/:userId" element={<TaskList />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <Preloader />
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: getInitializedStatus(state),
    userId: getMyUserId(state),
    isAuth: getAuthStatus(state),
  };
};

export default connect(mapStateToProps, {
  checkAuthThunkCreator,
  changeFilter,
})(App);
