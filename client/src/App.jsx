import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getInitializedStatus } from "./redux/app-selector";
import { getMyUserId } from "./redux/auth-selector";
import { useEffect } from "react";
import { checkAuthThunkCreator } from "./redux/app-reducer";
import Login from "./components/login/Login";
import TaskList from "./components/taskList/TaskList";

const App = (props) => {
  console.log("sdadadadads")
  useEffect(() => {
    props.checkAuthThunkCreator();
  }, []);

  return props.initialized ? (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={`/task/${props.userId}`} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task/:userId" element={<TaskList />} />
      </Routes>
    </div>
  ) : (
    <div>Loader...</div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: getInitializedStatus(state),
    userId: getMyUserId(state),
  };
};

export default connect(mapStateToProps, { checkAuthThunkCreator })(App);
