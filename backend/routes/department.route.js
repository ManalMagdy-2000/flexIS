/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
module.exports = app => {
  const departments = require("../controllers/department.controller.js");
/*
HERE I used Express Router which provides  with a way to modularize routes and apply middleware functions to them.
 By using a router instead of a full express application, making it easier to manage and optimize the performance of the  application.
*/
  var router = require("express").Router();

  // Create a new department
  router.post("/", departments.create);

  // Retrieve all Departments
  router.get("/getall", departments.findAll);

   // Retrieve all Departments
   router.get("/getalltest", departments.findAllTest);

  // Retrieve a single Department with id
  router.get("/:id", departments.findOne);

  // Add employee to department
  router.post("/:id/employee", departments.addEmployee);

  router.get("/employee/:id/save-supervisor")

  // Update a Department with id
  router.put("/:id", departments.update);

  // Delete a Department with id
  router.delete("/:id", departments.delete);

  // Delete a all departments
  router.delete("/", departments.deleteAll);

  app.use("/api/departments", router);
};
