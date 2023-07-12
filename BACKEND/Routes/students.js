const router = require("express").Router();
const { response } = require("express");
let Student = require ("../Models/student");
const { get } = require("mongoose");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({

        name,
        age,
        gender
    })

    newStudent.save().then(()=>{
        res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })

} )

router.route("/").get((req,res)=>{

    Student.find().then((students)=>{
        res.json(students)
    }).catch((error)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req, res) =>{
    const userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

     await Student.findByIdAndUpdate(userId, updateStudent)
    .then((updateStudent) => {
        res.status(200).send({status: "User updated", user: updateStudent})
    }).catch((err)=> {
      console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
})
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(()=> {
     res.status(200).send({status: "User deleted"});
    }).catch((err)=> {
     console.log(err.message);
     res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res)=> {
    const userId = req.params.id;
    await Student.findById(userId)
    .then((user)=> {
     res.status(200).send({status: "User fetched", user: user})
    }).catch(()=>{
        // console.log(err.message);
        res.status(500).send({status:"Error with get user", error:err.message});
    })
})


module.exports = router;