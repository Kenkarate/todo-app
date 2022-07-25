import {  addDoc, collection, doc, getFirestore } from "firebase/firestore";
import React, { useContext } from "react";
import { LoginContext } from "../context/UserContext";
import Data from "../Data";
import Select from "./Select";


function ToDo() {
// states and functions
  const [todo, setTodo] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [docRefId, setDocRefId] = React.useState({});

  // context
  const { users,userPresent} = useContext(LoginContext);
  
  // database reference
  const db = getFirestore();
  
// event handler for todo
  const handleChange = async (e) => {
    e.preventDefault();
    // refrence todos collection
    const uid = users;
    console.log(users);
    const data = {
      "user": users,
      "todo": todo,
      "description": desc,
      "completed": false,
      "favorite": false,
      "deleted": false,
      "online":userPresent,
      
    }
    
    // Adding the document and assigning the returned document reference to a variable
    const docRef = await addDoc((collection(db, "todos")), data)
    setDocRefId(docRef.id);
    console.log("Document added with ID: ", docRefId);
    console.log(uid);
  }

 
  return ( 
    <>
      <div className="mt-5">
        <div className=" float-start pe-5 text-center" style={{ width: "45%" }}>
          <div>
            <img
              style={{ width: "60px" }}
              src="./images/logo.jpg"
              alt="logo"
            ></img>
          </div>

          <div style={{ marginTop: "80px", marginLeft: "250px" }}>
            <h1>Todo</h1>
            <h3>{users ? `Welcome-${users}` : "Login To Add"}</h3>
            <p>{users ? "Enter your todo Title and descriptions" : ""}</p>
          </div>
          <div
            style={{ marginTop: "50px", marginLeft: "250px", width: "50%" }}
            className="text-center"
          >
            <input onChange={(e)=>{setTodo(e.target.value)}} style={{ width: "240px" }} type="text" placeholder="Title" />
            <br />
            <input
              onChange={(e)=>{setDesc(e.target.value)}}
              style={{ marginTop: "20px", width: "240px" }}
              type="text"
              placeholder="Description"
            />
            <br />
            <button
              style={{ width: "150px", marginTop: "20px" }}
              className="btn btn-success rounded-0 "
              onClick={handleChange}
            >
              Add
            </button>
          </div>
        </div>
        <div
          className="float-start me-5 border-start p-3 text-center"
          style={{ height: "80vh", width: "50%" }}
        >
          <div className="float-start">TODO LIST</div>
          <br />
          <br />
          <div className="mt-3 ">
            
            {/* Search input */}

            <div className="  " style={{width:"55%",float:"left"}}>
              <div className="col-md-5" >
                <div className="input-group " >
                  <input
                    
                    className="w-25 form-control border-end-0 border"
                    type="search"
                    placeholder="Search"
                    id="example-search-input"
                  />
                  <span className="input-group-append">
                    <button
                      className="btn btn-outline-secondary bg-grey border-start-0 border-bottom-0 border ms-n5"
                      type="button"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="float-end " style={{ width:"40%" ,float: "left" }}>
                  <Select />
                </div>
           <Data/>         
        </div>
      </div>
    </>
  );
}

export default ToDo;
