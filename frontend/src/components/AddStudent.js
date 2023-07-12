import React, {useState} from "react";
import axios from "axios";

export default function AddStudent(){

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");

    function sendData(e){
        e.preventDefault();
       
        const newStudent = {
            name,
            age,
            gender
        }
        
        axios.post("http://localhost:8070/student/add",newStudent).then(()=>{
          alert("Student Added")
          setName("");
          setAge("");
          setGender("");

        }).catch((err)=>{
          alert(err)
        })
    }

    return(

      <div className="container">
            <br></br>
            <h3 style={{color: "blue"}}>Add New Student</h3>
            <br></br>  
        <form onSubmit={sendData}>
  <div className="mb-3">
    <label for="name" className="form-label">Student Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Student Name" 
    onChange={(e)=>{
           
           setName(e.target.value);
    }}/>
    </div>

    <div class="mb-3">
    <label for="age" className="form-label">Student age</label>
    <input type="text" className="form-control" id="age" placeholder="Enter Student Age"
      onChange={(e)=>{
           
        setAge(e.target.value);
    }}/>
    </div>
  
    <div clas="mb-3">
    <label for="gender" className="form-label">Student Gender</label>
    <input type="text" className="form-control" id="gender" placeholder="Enter Student Gender"
       onChange={(e)=>{
           
        setGender(e.target.value);
    }}/>
    </div>
  <br></br>
  <button type="submit" className="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> &nbsp;Submit</button>
</form>
</div>
    )
}
