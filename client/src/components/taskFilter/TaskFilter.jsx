import { Formik, Field, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskFilter = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="task-filter__wrapper">
      <Formik
        initialValues={{ ...props.filter }}
        onSubmit={(values) => {
          let queryString = new URLSearchParams(values).toString();
          navigate(`${location.pathname}?${queryString}`);
          props.getTasks(props.userId, queryString);
        }}
      >
        {({ handleSubmit }) => (
          <Form className="task-filter" onChange={() => handleSubmit()}>
            <div className="filter__block">
              <p className="filter__block-header">
                <b>Приоритет</b>
              </p>
              {props.priorities.map((priority, index) => {
                return (
                  <div key={index} className="filter__input-wrapper">
                    <Field
                      className="visually-hidden filter__input-checkbox"
                      name="priorities"
                      type="checkbox"
                      id={`${priority.id}_${priority.statusName}`}
                      value={String(priority.id)}
                    />
                    <label
                      className="filter__checkbox-label"
                      htmlFor={`${priority.id}_${priority.statusName}`}
                    >
                      {priority.priorityName}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="filter__block">
              <p className="filter__block-header">
                <b>Статус</b>
              </p>
              {props.statuses.map((status, index) => {
                return (
                  <div key={index} className="filter__input-wrapper">
                    <Field
                      className="visually-hidden filter__input-checkbox"
                      name="statuses"
                      type="checkbox"
                      id={`${status.id}_${status.statusName}`}
                      value={String(status.id)}
                    />
                    <label
                      className="filter__checkbox-label"
                      htmlFor={`${status.id}_${status.statusName}`}
                    >
                      {status.statusName}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="filter__block">
              <p className="filter__block-header">
                <b>Период</b>
              </p>
              <div className="filter__input-date-wrapper">
                <label className="filter__input-label" htmlFor="startDate">
                  с -
                </label>
                <Field
                  className="input filter__input-date"
                  type="date"
                  name="startDate"
                  id="startDate"
                  element="input"
                />
              </div>
              <div className="filter__input-date-wrapper">
                <label className="filter__input-label" htmlFor="endDate">
                  по -
                </label>
                <Field
                  className="input filter__input-date"
                  type="date"
                  name="endDate"
                  id="endDate"
                  element="input"
                />
              </div>
            </div>
            <div className="filter__block filter__block-sorting">
              <Field
                className="filter__sorting-select"
                as="select"
                name="sorting"
              >
                <option value="adding">В порядке добаления</option>
                <option value="high">Сначала важные</option>
                <option value="low">Сначала неважные</option>
                <option value="startEarly">Раньше начнутся</option>
                <option value="startLater">Позже начнутся</option>
                <option value="endEarly">Раньше закончатся</option>
                <option value="endtLater">Позже закончатся</option>
              </Field>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
