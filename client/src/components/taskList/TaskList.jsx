import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { TaskFilter } from "../taskFilter/TaskFilter";
import { Preloader } from "../сommon/preloader/Preloader";
import {
  addTaskThunkCreator,
  changeFilter,
  deleteErrorTask,
  deleteTaskThunkCreator,
  getAllPrioritiesThunkCreator,
  getAllStatusesThunkCreator,
  getAllTasksThunkCreator,
  setErrorTask,
  updateTaskThunkCreator,
} from "../../redux/task-reducers";
import {
  getErrorGetTasks,
  getErrorTask,
  getFetchingStatus,
  getFilter,
  getPriorities,
  getStatuses,
  getTasks,
} from "../../redux/task-selector";
import { getAuthStatus } from "../../redux/auth-selector";
import { Task } from "./task/Task";
import { TaskForm } from "./taskForm/TaskForm";

export const TaskList = (props) => {
  const location = useParams();

  useEffect(() => {
    let queryString = new URLSearchParams(props.filter).toString();
    props.getAllTasksThunkCreator(location.userId, queryString);
    props.getAllStatusesThunkCreator();
    props.getAllPrioritiesThunkCreator();
  }, []);

  return (
    <>
      <TaskFilter
        priorities={props.priorities}
        statuses={props.statuses}
        filter={props.filter}
        changeFilter={props.changeFilter}
        getTasks={props.getAllTasksThunkCreator}
        userId={location.userId}
      />
      {props.isFetching ? (
        <Preloader />
      ) : (
        <ul className="task-list">
          {props.tasks.length === 0 ? (
            <p className="task-list__message-not-tasks">Задач нет</p>
          ) : (
            props.tasks.map((task, index) => {
              return (
                <Task
                  userId={location.userId}
                  task={task}
                  index={index}
                  onDelete={props.deleteTaskThunkCreator}
                  onAddTask={props.updateTaskThunkCreator}
                  statuses={props.statuses}
                  priorities={props.priorities}
                  key={task.id}
                  errorTask={props.errorTask}
                  setErrorTask={props.setErrorTask}
                  deleteErrorTask={props.deleteErrorTask}
                />
              );
            })
          )}
          <TaskForm
            taskId={0}
            userId={location.userId}
            onAddTask={props.addTaskThunkCreator}
            statuses={props.statuses}
            priorities={props.priorities}
            isUpdateForm={false}
            errorTask={props.errorTask}
          />
        </ul>
      )}
    </>
  );
};

let mapStateToProps = (state) => ({
  isAuth: getAuthStatus(state),
  tasks: getTasks(state),
  statuses: getStatuses(state),
  priorities: getPriorities(state),
  filter: getFilter(state),
  isFetching: getFetchingStatus(state),
  errorTask: getErrorTask(state),
  errorGetTasks: getErrorGetTasks(state),
});

export default compose(
  connect(mapStateToProps, {
    addTaskThunkCreator,
    getAllTasksThunkCreator,
    deleteTaskThunkCreator,
    getAllStatusesThunkCreator,
    getAllPrioritiesThunkCreator,
    updateTaskThunkCreator,
    changeFilter,
    setErrorTask,
    deleteErrorTask,
  }),
  WithAuthRedirect
)(TaskList);
