import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'jspdf-autotable';
import jsPDF from 'jspdf' //to generate pdf

export default function AllStudents(){

    const [students, setStudents] = useState([]);
    let navigate = useNavigate();
    
    const [searchText, setSearchText] = useState('');

    //print PDF......

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Student Report";
        const headers = [
          [
            "Name",
            "Age",
            "Gender",
          ],
        ];
    
        const d = students.map((elt) => [
          elt.name,
          elt.age,
          elt.gender,
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: d,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`Student.pdf`);
      };

    //End of print PDF...

    useEffect(()=> {
        
        getStudents();
  
      
  
      }, [])

      function getStudents() {
        axios.get("http://localhost:8070/student/").then((res) => {
      
        setStudents(res.data);
        navigate("/"); 

        }).catch((err)=> {
            alert(err.message);
        })
      }

    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            getStudents();
        }
        else{      
            const filteredData = students.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setStudents(filteredData);
        }
    }

     //Delete a task
    function studentDelete(id){

        axios.delete(`http://localhost:8070/student/delete/${id}`).then(() =>{
            alert('Are you confirm to delete student??');
            getStudents();
        }).catch((err) =>{
            alert(err);
        })
    }
    
    
    return(
        <div className="container">
      <br></br>
          <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <h3 style={{color: "blue"}}>Our Students</h3>
          </div>
          <div className="col-lg-1 mt-2 mb-2"><i class="fa-solid fa-magnifying-glass"></i></div>
          <div className="col-lg-2 mt-2 mb-2">
          <input type="search" className="form-control"  placeholder="Search.."onChange={ e => handlesearchArea(e.target.value)}/>
          </div>
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={exportPDF}><i class="fa-sharp fa-solid fa-file-pdf"></i> &nbsp;Generate PDF</button>
          <br></br>
        

        <div>
          <table class="table" celled>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        
                       {students.map((student,index) => (
                            <tr key={student._id}>
                            <td>{index+1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>
                            <a href={`/view/${student._id}`}> <button type="submit" className="btn btn-primary" style={{color:'white'}}><i class="fa-solid fa-eye"></i> &nbsp;View</button></a>
                            &nbsp;
                            <a href={`/update/${student._id}`}> <button type="submit" className="btn btn-warning" ><i class="fa-solid fa-pen-to-square"></i> &nbsp;Update</button></a>
                            &nbsp;
                            <button type="submit" className="btn btn-danger" onClick={() => studentDelete(student._id)} ><i class="fa-solid fa-trash"></i> &nbsp;Delete</button></td>
                            </tr> 
                         ))
                       
                        }
                    </tbody>
                </table>
                <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}><i class="fa-solid fa-plus"></i> Add New Student</a></button>
                </div>
                </div>
    )
                    }            
                    
                    
                
                    
    
                    
