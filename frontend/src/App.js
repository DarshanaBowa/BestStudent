
import './App.css';
// import CounterClass from './components/CounterClass';
// import CounterFunction from './components/CounterFunction';
// import CounterFunction from './components/CounterFunction';
import Header from './components/Header';
import AddStudent from './components/AddStudent';
import AllStudents from './components/AllStudents';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import StudentDetails from './components/StudentDetails';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
   
    <Router>
    <div>
      <Header></Header>
      <Routes>
      <Route path="/" exact Component={AllStudents}/>
      <Route path="/view/:id" exact Component={StudentDetails}/>
      <Route path ="/add" exact Component ={AddStudent}/>
      <Route path ="/update/:id" exact Component ={UpdateStudent}/>
     
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
