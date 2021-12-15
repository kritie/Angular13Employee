const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// SECRET FOR JWT
let secret = 'some_secret'; // a secret key is set here

app.get("/api/images", (req, res, next) => {
  const dataPath = './mockdata/slides.json';
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        images: JSON.parse(data)
      });
    });
});

/* Create Authorization token on Login */
app.post('/api/login', (req, res) => {
  var userData = { body: req.body }
  const dataPath = './mockdata/employees.json';
  let isEmployee = false;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let employees = JSON.parse(data);
    isEmployee = employees.find(obj => 
      ((obj.id === userData.body.formdata.empId) && (obj.password === userData.body.formdata.password)));
    if (isEmployee) {
      let token = jwt.sign(userData, secret, { expiresIn: '300s'})
      res.status(200).json({
        "token": token,
        "employee": isEmployee
      });
    } else {
      res.status(401).json({'error':'Employee doesnot exist'});
    }
  });
});

// Authorize Employee API
app.use(expressJWT({ secret: secret, algorithms: ['HS256']})
    .unless(
        { path: [
            '/api/login'
        ]}
));

// Add Headers to employees api
app.use('/api/employees', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

// Fetch All Employees on Initializatiion
app.get("/api/employees", (req, res, next) => {
  const dataPath = './mockdata/employees.json';
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Employees fetched successfully!",
        employees: JSON.parse(data)
      });
    });
});

// Fetch Single Employee -- Not used
app.get("/api/employee", (req, res, next) => {
  const dataPath = './mockdata/employees.json';
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Employee fetched successfully!",
        employees: JSON.parse(data)
      });
    });
});

// Add New Employee
app.post("/api/employee", (req, res, next) => {
  const empData = req.body.body.empData;
  let employees = JSON.parse(req.body.body.employees);
  const newID = Math.floor(Math.random() * 90 + 10);
  const newEmployee = {
    "id": newID,
    "firstName": empData.firstName,
    "lastName": empData.lastName,
    "phoneNumber": empData.phoneNumber,
    "password": `${empData.firstName}@${newID}`,
    "designation": empData.designation
  };
  employees.push(newEmployee);
  res.status(201).json({
    message: 'Employee added successfully',
    employees: employees
  });
});

// Update Existing Employee
app.put("/api/employee", (req, res, next) => {
  const empId = req.body.body.empData.empId;
  const empData = req.body.body.empData;
  let employees = JSON.parse(req.body.body.employees);
  const editEmployee = employees.findIndex(obj => obj.id === empId);
  employees[editEmployee] = empData;
  res.status(200).json({
    message: 'Employee details updated successfully',
    employees: employees
  });
});

// Delete Existing Employee
app.delete("/api/employee", (req, res, next) => {
  const empId = req.body.empId;
  let employees = JSON.parse(req.body.employees);
  const delEmployee = employees.findIndex(obj => obj.id === empId);
  employees.splice(delEmployee, 1);
  res.status(201).json({
    message: 'Employee deleted successfully',
    employees: employees
  });
});

module.exports = app;