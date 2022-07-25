import React, { useContext, useEffect } from "react";
import { collection, getFirestore, where , query, getDocs, doc} from "firebase/firestore";
import { LoginContext } from "./context/UserContext";


function Data() {
    // initialise firestore
  const db = getFirestore();

  const {users } = useContext(LoginContext);
  
  

  const [usertodos, setUserTodos] = React.useState([]);
  const [userdesc, setUserDesc] = React.useState([]);

  useEffect(() => {
    const userData = async () => {
      const q = query(collection(db, "todos"), where("user", "==", users));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const docdata = doc.data();
      setUserTodos([...usertodos,docdata.todo]);
      setUserDesc([...userdesc,docdata.description]);
      console.log(userdesc);
      
    });
  } 
  userData(); },[]) 

  
  
    
  
    

  return (
    <>
      {usertodos.map((todo)=>{ 
      
        <div  style={{ marginTop: "100px" }}>
        <table className="table"> 
          <thead className="float-start">
            <tr >
              <th scope="col">Titles { todo}</th>  
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="float-start" scope="row">{ userdesc}</td>

              {/* <td>@twitter</td> */}
            </tr>
          </tbody>
        </table>
      </div>
     })}
            
    </>
  );
}

export default Data;
