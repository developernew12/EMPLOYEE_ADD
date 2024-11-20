import styles from "./EmployeeList.module.css";
import { useState } from "react";
const EmployeeList = (props) => {
   
    const [searchQuery,setSearchQuery] = useState("");

    const filteredEmployees = props.employees.filter((employee) => {
     const searchLower = searchQuery.toLowerCase();
     return(
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.age.toString().includes(searchLower)||
      (employee.email && employee.email.toLowerCase().includes(searchLower))
     );
    });
    
    return (
        <>
            <h1 className={styles.header}>EmployeeList</h1>
            <input type="text" 
            placeholder="Search by name,age, or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
                marginBottom: "10px",
                padding: "7px",
                width: "90%",
              }}
            />
            {
                filteredEmployees.map((data, index) => (
                    <div key={index} style={{
                        padding: '10px',
                        boxShadow: '2px 4px 4px grey'
                    }} className={styles.main}>
                        {data.first_name} {data.last_name} - {data.age} years old
                        {data.email && <span> -- {data.email}</span>}
                        <button  style={{
                            marginLeft: '10px',
                            padding: '7px'
                        }} onClick={() => props.dispatch({type:'ADD_TO_TEAM_LIST',payload: data})}>Add</button>
                    </div>
                ))
            }
        </>
    );
};
export default EmployeeList;