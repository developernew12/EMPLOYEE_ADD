import styles from "./TeamList.module.css";

const TeamList = (props) => {
 

  return (
    <>
      <h1
        style={{
          color: "#BFECFF",
        }}
      >
        TeamList
      </h1>
      <div>
        {props.employees.map((data, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              boxShadow: "2px 4px 4px grey",
            }}
          >
            {data.first_name} {data.last_name} - {data.age} years old
            <button
              style={{
                marginLeft: "10px",
                padding: "7px",
              }}
              onClick={() =>
                props.dispatch(
                  { type: "REMOVE_FROM_TEAM_LIST", payload: data },
                  data
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
        <p>Average Age : {props.averageAge}</p>
        <button
          onClick={() =>
            props.dispatch({ type: "CALCULATE_AVERAGE", payload: {} })
          }
         >
          Calculate Average Age
        </button>
        <button
          onClick={() => props.dispatch({ type: "SORT_BY_AGE", payload: {} })}
        >
          Sort by Age
        </button>
        <button
          onClick={() => props.dispatch({ type: "DOWNLOAD_TEAM_LIST_PDF", payload: {} })}
        >
          Download Team List PDF
        </button>
      </div>
    </>
  );
};
export default TeamList;
