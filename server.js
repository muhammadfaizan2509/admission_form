const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default XAMPP username
  password: "", // Default is empty in XAMPP
  database: "itc_admissions",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Handle Form Submission
app.post("/submit", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO admissions (name, father_name, surname, father_occupation, address, contact, cnic, birth_date, gender, religion, nationality, occupation, marital_status, primary_school, primary_board, primary_grade, primary_year, matric_school, matric_board, matric_grade, matric_year, inter_school, inter_board, inter_grade, inter_year, course, shift, shift_time, agree) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.name,
    data.father_name,
    data.surname,
    data.father_occupation,
    data.address,
    data.contact,
    data.cnic,
    data.birth_date,
    data.gender,
    data.religion,
    data.nationality,
    data.occupation,
    data.marital_status,
    data.primary_school,
    data.primary_board,
    data.primary_grade,
    data.primary_year,
    data.matric_school,
    data.matric_board,
    data.matric_grade,
    data.matric_year,
    data.inter_school,
    data.inter_board,
    data.inter_grade,
    data.inter_year,
    JSON.stringify(data.course),
    data.shift,
    data.shift_time,
    data.agree,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database Error");
    }
    res.status(200).send("Form submitted successfully!");
  });
});
// Fetch all records from the database
app.get("/getRecords", (req, res) => {
  const sql =
    "SELECT id, name, father_name, cnic, contact, course, shift FROM admissions";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data");
    }
    res.json(results);
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
