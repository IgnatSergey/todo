import { Formik, Field, Form } from "formik";
import { validateTaskDescription } from "../../сommon/validator/validator";
import cn from "classname";

export const TaskForm = (props) => {
  const paramId = props.isUpdateForm ? props.taskId : props.userId;
  const formClassNames = cn("task-form-wrapper", {
    "task-form-wrapper--update": props.isUpdateForm,
  });
  const errorTask = props.errorTask.find((errorTask) => {
    return errorTask.taskId === props.taskId;
  });
  return (
    <>
      <Formik
        initialValues={{
          ...props.initialValues,
        }}
        onSubmit={(values, actions) => {
          if (!values.endDate) {
            values.endDate = null;
          }
          if (!values.startDate) {
            values.startDate = null;
          }
          props
            .onAddTask(
              paramId,
              values.description,
              values.startDate,
              values.endDate,
              values.statusId,
              values.priorityId
            )
            .then(() => {
              if (!props.isUpdateForm) {
                actions.resetForm({
                  values: {
                    description: "",
                    startDate: "",
                    endDate: "",
                    statusId: "",
                    priorityId: "",
                  },
                });
              }
            });
        }}
      >
        {({ errors, touched, handleReset }) => (
          <Form>
            <div className="task-form">
              <div className={formClassNames}>
                <div className="task-form__input-wrapper task-form__input-description-wrapper">
                  <label htmlFor="description">Задача:</label>
                  <Field
                    className="input task__form-input-description"
                    name="description"
                    component="textarea"
                    id="description"
                    validate={validateTaskDescription}
                  />
                  {errors.description && touched.description && (
                    <div className="input__error-message">{errors.description}</div>
                  )}
                </div>
                <div className="task-form__input-wrapper">
                  <label htmlFor="startDateForm">Начало: </label>
                  <Field
                    type="date"
                    className="input"
                    name="startDate"
                    component="input"
                    id="startDateForm"
                  />
                  {errors.startDate && touched.startDate && (
                    <div className="input__error-message">{errors.startDate}</div>
                  )}
                </div>
                <div className="task-form__input-wrapper">
                  <label htmlFor="endDateForm">Окончание: </label>
                  <Field
                    type="date"
                    className="input"
                    name="endDate"
                    component="input"
                    id="endDateForm"
                  />
                  {errors.endDate && touched.endDate && (
                    <div className="input__error-message">{errors.endDate}</div>
                  )}
                </div>
                <div className="task-form__input-wrapper">
                  <label htmlFor="status">Статус: </label>
                  <Field
                    className="input"
                    as="select"
                    name="statusId"
                    id="status"
                  >
                    {props.statuses.map((status, index) => {
                      return (
                        <option key={index} value={status.id}>
                          {status.statusName}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className="task-form__input-wrapper">
                  <label htmlFor="priority">Приоритет: </label>
                  <Field
                    className="input"
                    as="select"
                    name="priorityId"
                    id="priority"
                  >
                    {props.priorities.map((priority, index) => {
                      return (
                        <option key={index} value={priority.id}>
                          {priority.priorityName}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                {props.isUpdateForm && (
                  <div className="button-save-wrapper">
                    <button type="submit" className="button button-save-task">
                      Сохранить
                    </button>
                  </div>
                )}
                {errorTask && <p className="input__error-message">{errorTask.error}</p>}
              </div>
              {!props.isUpdateForm && (
                <button type="submit" className="button button-add-task">
                  <span className="button-add-task-text"> Добавить задачу</span>
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
