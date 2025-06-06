import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});

let lastRandomId = null;
app.get("/employees/random", (req, res, next) => {
  try {
    if (employees.length === 0) {
      return res.status(404).send("No employees available");
    }

    let index;
    do {
      index = Math.floor(Math.random() * employees.length);
    } while (employees.length > 1 && employees[index].id === lastRandomId);

    lastRandomId = employees[index].id;
    res.status(200).json(employees[index]);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const employee = employees.find((emp) => emp.id === id);

    if (!employee) {
      return res.status(404).send("That employee does not exist");
    }

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

export default app;
