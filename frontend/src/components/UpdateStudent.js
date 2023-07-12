import React, {useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

export default function UpdateStudent(){

    let navigate = useNavigate();
  let { id } = useParams();
  let [name,setName] = useState("")
  let [age,setAge] = useState("")
  let [gender,setGender] = useState("")

  const data = {
    name:name,
    age: age,
    gender:gender
  }

   //loading existing data to form
   useEffect(() =>{
        loadStudent();
    },[])

    function loadStudent(){
      axios.get(`http://localhost:8070/student/get/${id}`).then((res) =>{
          setName(res.data.user.name);
          setAge(res.data.user.age);
          setGender(res.data.user.gender);
      }).catch((err) =>{
          alert(err);
      })
  }

    function onSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8070/student/update/${id}`,data)
          .then((res) => {
            console.log(res.data);
            navigate('/');
            alert("Student updated successfully");
          })
          .catch((err) => {
            alert(err);
          });
      };

    return(

        <div className="container">

            <br></br>
            <h3 style={{color: "blue"}}>Update Student</h3>
            <br></br>  
    
    <form onSubmit={onSubmit}>
  <div className="mb-3">
    <label for="name" className="form-label">Student Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Student Name" value={name}
    onChange={(e)=>{
           
           setName(e.target.value);
    }}/>
    </div>

    <div class="mb-3">
    <label for="age" className="form-label">Student age</label>
    <input type="text" className="form-control" id="age" placeholder="Enter Student Age" value={age}
      onChange={(e)=>{
           
        setAge(e.target.value);
    }}/>
    </div>
  
    <div clas="mb-3">
    <label for="gender" className="form-label">Student Gender</label>
    <input type="text" className="form-control" id="gender" placeholder="Enter Student Gender" value={gender}
       onChange={(e)=>{
           
        setGender(e.target.value);
    }}/>
    </div>
  <br></br>
  <button type="submit" className="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i> &nbsp;Update</button>
</form>
<br></br>
    <a href="/"><button className="btn btn-success"><i className="fas fa-arrow-left"></i>&nbsp;Go Back</button></a>
</div>
  
    )
}

