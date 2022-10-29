import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthStatus } from "../../redux/auth-selector";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { Formik, Field, Form } from "formik";
import {
  addTaskThunkCreator,
  deleteTaskThunkCreator,
  getAllPrioritiesThunkCreator,
  getAllStatusesThunkCreator,
  getAllTasksThunkCreator,
  updateTaskThunkCreator,
} from "../../redux/task-reducers";
import {
  getPriorities,
  getStatuses,
  getTasks,
} from "../../redux/task-selector";
import { useEffect } from "react";
import { useState } from "react";

const TaskForm = (props) => {
  const paramId = props.isUpdateForm ? props.taskId : props.userId;
  return (
    <>
      <Formik
        initialValues={{ ...props.initialValues }}
        onSubmit={(values) => {
          props.onAddTask(
            paramId,
            values.description,
            values.startDate,
            values.endDate,
            values.status,
            values.priority
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="login-form">
              <div className="login-input-wrapper">
                <label htmlFor="taskText">Задача</label>
                <Field
                  className="login-input"
                  placeholder="taskText"
                  name="description"
                  component="input"
                />
                {errors.taskText && touched.taskText && (
                  <div className="error">{errors.taskText}</div>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="startDate">Начало</label>
                <Field
                  type="date"
                  className="login-input"
                  name="startDate"
                  component="input"
                />
                {errors.startDate && touched.startDate && (
                  <div className="error">{errors.startDate}</div>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="endDate">Окончание</label>
                <Field
                  type="date"
                  className="login-input"
                  name="endDate"
                  component="input"
                />
                {errors.endDate && touched.endDate && (
                  <div className="error">{errors.endDate}</div>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="status">Статус</label>
                <Field as="select" name="status">
                  {props.statuses.map((status) => {
                    return (
                      <option value={status.id}>{status.statusName}</option>
                    );
                  })}
                </Field>
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="priority">Приоритет</label>
                <Field as="select" name="priority">
                  {props.priorities.map((priority) => {
                    return (
                      <option value={priority.id}>
                        {priority.priorityName}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <button type="submit">
                {props.isUpdateForm ? "сохранить изменения" : "Добавить задачу"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const Task = (props) => {
  const { id, description, startDate, endDate, statusId, priorityId } =
    props.task;
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      <div>{`${props.index + 1}. ${description}`}</div>
      {startDate ? <div>{startDate}</div> : null}
      {endDate ? <div>{endDate}</div> : null}
      {statusId ? <div>{statusId}</div> : null}
      {priorityId ? <div>{priorityId}</div> : null}
      {isUpdate ? (
        <>
          <TaskForm
            taskId={id}
            userId={props.userId}
            onAddTask={props.onAddTask}
            statuses={props.statuses}
            priorities={props.priorities}
            isUpdateForm={true}
            initialValues={{ ...props.task }}
          />
          <button onClick={() => setIsUpdate(false)}>Скрыть</button>
        </>
      ) : (
        <button onClick={() => setIsUpdate(true)}>Редактировать</button>
      )}
      <button onClick={() => props.onDelete(id)}>Удалить задачу</button>
    </>
  );
};

export const TaskList = (props) => {
  const location = useParams();
  useEffect(() => {
    props.getAllTasksThunkCreator(location.userId);
    props.getAllStatusesThunkCreator();
    props.getAllPrioritiesThunkCreator();
  }, []);
  console.log(props.statuses);

  return (
    <>
      {props.tasks.map((task, index) => {
        return (
          <Task
            userId={location.userId}
            task={task}
            index={index}
            onDelete={props.deleteTaskThunkCreator}
            onAddTask={props.updateTaskThunkCreator}
            statuses={props.statuses}
            priorities={props.priorities}
          />
        );
      })}
      <TaskForm
        userId={location.userId}
        onAddTask={props.addTaskThunkCreator}
        statuses={props.statuses}
        priorities={props.priorities}
        isUpdateForm={false}
      />
      <div>{`taskList ${location.userId}`}</div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Выйти
      </button>
    </>
  );
};

let mapStateToProps = (state) => ({
  isAuth: getAuthStatus(state),
  tasks: getTasks(state),
  statuses: getStatuses(state),
  priorities: getPriorities(state),
});

export default compose(
  connect(mapStateToProps, {
    addTaskThunkCreator,
    getAllTasksThunkCreator,
    deleteTaskThunkCreator,
    getAllStatusesThunkCreator,
    getAllPrioritiesThunkCreator,
    updateTaskThunkCreator,
  }),
  WithAuthRedirect
)(TaskList);
