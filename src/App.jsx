import { useState,useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmployeeList from "./EmployeeList/EmployeeList";
import TeamList from "./TeamList/TeamList";
import employeesJSON from "./static/employees.json";
import { jsPDF } from "jspdf";

function App() {
  
  console.log(employeesJSON);
  const reducerFn = (state,action) => {
     
    //  console.log("function called",state,action.payload);
     
    if(action.type === "ADD_TO_TEAM_LIST"){
      // console.log("add btn clicked");
     
      //pushed thge new object into the teamlist array of sate
      const stateCopy = {...state};
      const isAlreadyAdded = stateCopy.teamList.some(
        (member) => member.id === action.payload.id
      );
  
      if (isAlreadyAdded) {
        alert("This employee is already in the team!");
        return state; // Return the current state unchanged
      }
      const teamListCopy = [...stateCopy.teamList];
      teamListCopy.push(action.payload);
      stateCopy.teamList = teamListCopy;
      
      return stateCopy;
      // stateCopy.teamList.push(action.payload);
      //  const updatedData = {
      //   ...state,
      //   teamList: [...state.teamList,action.payload]
      //  }

    }else if(action.type ==='CALCULATE_AVERAGE'){
      const avgAge = (state.teamList.reduce((pv,cv) => pv + cv.age,0) / state.teamList.length).toFixed(2);
      const stateCopy = {
        ...state
      }
      stateCopy.averageAge = avgAge;
      return stateCopy;
    } else if(action.type === 'REMOVE_FROM_TEAM_LIST'){
      const stateCopy = {...state};
      const updatedTeamList = stateCopy.teamList.filter(
        (member) => member.id !== action.payload.id
      );
      stateCopy.teamList = updatedTeamList;
      return stateCopy;
    } else if (action.type === 'SORT_BY_AGE'){
       const stateCopy = {...state};
       const sortedTeamList = [...stateCopy.teamList].sort((a,b) => a.age - b.age);
       stateCopy.teamList = sortedTeamList;
       return stateCopy;

    }
    else if(action.type === 'DOWNLOAD_TEAM_LIST_PDF'){
      const doc = new jsPDF();
      state.teamList.forEach((employee,index) => {
       
        const yOffset = 10 + index * 50;
        doc.text(`Employee ID: ${employee.id}`, 10, yOffset);
        doc.text(`Name: ${employee.first_name} ${employee.last_name}`, 10, yOffset + 10);
        doc.text(`Age: ${employee.age}`, 10, yOffset + 20);
        doc.text(`Email: ${employee.email || "N/A"}`, 10, yOffset + 30);
      });
      doc.save("team_list.pdf");
      return state;
    } 
    else{
       return state;
    }
    // if (action.action === "ADD_TO_TEAM_LIST") {
    //     return{
    //       ...state,
    //       teamList: [...state.teamList,action.payload]
    //     }
    // } else if (action.action === "REMOVE_FROM_TEAM_LIST") {
    // } else if (action.action === "CALCULATE_AVERAGE") {
    // } else if (action.action === "SORT_BY_AGE") {
    // } else {
    // }
  };
 
  const inItState = {
    EmployeeList: employeesJSON, 
    teamList: [],
    averageAge: 0,
  };
  const [state,dispatch] = useReducer(reducerFn,inItState);

  // const state = ;
  
  // const onAddClick = () => {
  //   console.log("Add Clicked");
  // };
  // const onRemoveClick = () => {
  //   console.log("remove Clicked");
  // };
  // const calculateAverageAgeClick = () => {
  //   console.log("remove Clicked");
  // };
  // const sortByAgeClick = () => {
  //   console.log("remove Clicked");
  // };


 
  return (
    <>
      <h1
      style={{
        textDecoration:"underline"
      }}
      >EMPLOYEE-APP</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div
          style={{
            border: "5px solid white",
            padding: "10px",
            borderRadius:"5px",
            boxShadow: "-7px -1px 10px white",
            marginRight:"20px"
          }}
        >
          <EmployeeList
            dispatch={dispatch}
            employees={state.EmployeeList}
            // onAddClick={onAddClick}
          />
        </div>
        <div
          style={{
            border: "5px solid white",
            padding: "10px",
            borderRadius:"5px",
            boxShadow: "-7px -1px 10px white",
          }}
        >
          <TeamList
            dispatch={dispatch}
            employees={state.teamList}
            // calculateAverageAgeClick={calculateAverageAgeClick}
            // sortByAgeClick={sortByAgeClick}
            averageAge={state.averageAge}
            // onRemoveClick={onRemoveClick}
          />
        </div>
      </div>
    </>
  );
}

export default App;
