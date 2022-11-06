import { TermDefenition } from "../../сommon/termDefenition/TermDefenition";
import { useState } from "react";
import cn from "classname";
import { TaskForm } from "../taskForm/TaskForm";

export const Task = (props) => {
    const { id, description, startDate, endDate, statusName, priorityName } =
      props.task;
    const [isUpdate, setIsUpdate] = useState(false);
    const buttonUpdateClassNames = cn("button", "button-update-task", {
      "button-update-task--hide": isUpdate,
    });
    return (
      <li className="task">
        <div className="task__description-wrapper">
          <h3 className="task__header">{`${
            props.index + 1
          }. ${description}`}</h3>
          <dd className="task__description">
            <TermDefenition term={"Начало"} defenition={startDate} />
            <TermDefenition term={"Окончание"} defenition={endDate} />
            <TermDefenition term={"Статус"} defenition={statusName} />
            <TermDefenition term={"Приоритет"} defenition={priorityName} />
          </dd>
        </div>
        {isUpdate && (
          <div className="task__edit-form">
            <TaskForm
              taskId={id}
              userId={props.userId}
              onAddTask={props.onAddTask}
              statuses={props.statuses}
              priorities={props.priorities}
              isUpdateForm={true}
              initialValues={{ ...props.task }}
              errorTask={props.errorTask}
            />
          </div>
        )}
        <button
          className={buttonUpdateClassNames}
          onClick={() => {
            setIsUpdate(!isUpdate);
            props.deleteErrorTask(id);
          }}
        >
          {isUpdate ? "Скрыть" : "Редактировать"}
        </button>
        <button
          className="button button-delete-task"
          onClick={() => props.onDelete(id)}
        ></button>
      </li>
    );
  };