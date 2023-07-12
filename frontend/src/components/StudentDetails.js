import React, {useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import bestf from '../bestf.jpg';


export default function StudentDetails(){

    const {id} = useParams();
    let [student,setStudent] = useState();

    useEffect(()=>{
        displayStudent();
    },[])

    function displayStudent(){
            
        axios.get(`http://localhost:8070/student/get/${id}`).then((res)=> {
            setStudent(res.data.user)
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        
        <div className="container">
            <br></br>
            <h3 style={{color: "blue"}}>Student Details</h3>
            <br></br>
            <div className="row">
            <div className="col-lg-5 mt-2 mb-2">
            {console.log(student)}
            {(student) && (
                 <div className=" w-[500px] h-[500px] flex px-6 py-4 border border-black">
                 <div className="w-5/12 flex flex-col space-y-4">
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Name : {student.name}</h5>
                   <br></br>
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Age : {student.age}</h5>
                   <br></br>
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Gender : {student.gender}</h5>
                 </div>
                </div>
         )}
            </div>
            <div className="col-lg-5 mt-2 mb-2">
                 <img src={bestf} height='387px' width='400px'></img>
            </div>
            </div>
            <br></br>
            <a href="/"><button className="btn btn-success"><i className="fas fa-arrow-left"></i>&nbsp;Go Back</button></a>
            </div>
    )
}