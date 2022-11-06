export const TermDefenition = (props) => {
  return props.defenition && props.defenition !== "нет" ? (
    <div className="term-wrapper">
      <dt className="term"><b>{`${props.term}: `}</b></dt>
      <dd className="term__tefenition">{`${props.defenition}`}</dd>
    </div>
  ) : null;
};
