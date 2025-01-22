const fs = require('fs');
const filePath = 'students.json'; // Path to the JSON file

// Function to Read Data (Retrieve all students)
const readStudents = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    let students = [];
    try {
      students = JSON.parse(data); // Parse the file content into an array of students
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }
    console.log(students); // Display the students
  });
};

// Function to Create (Add a new student)
const createStudent = (newStudent) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    let students = [];
    try {
      students = JSON.parse(data); // Parse the existing data
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    // Add the new student to the array
    students.push(newStudent);

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(students, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        return;
      }
      console.log('Student added successfully!');
    });
  });
};

// Function to Update (Update a student's details based on rollNo)
const updateStudent = (rollNo, updatedInfo) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    let students = [];
    try {
      students = JSON.parse(data); // Parse the existing data
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    // Find the student by rollNo and update their details
    const studentIndex = students.findIndex(student => student.rollNo === rollNo);
    if (studentIndex === -1) {
      console.log('Student not found!');
      return;
    }

    // Update the student's details
    students[studentIndex] = { ...students[studentIndex], ...updatedInfo };

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(students, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        return;
      }
      console.log('Student details updated successfully!');
    });
  });
};

// Function to Delete (Delete a student based on rollNo)
const deleteStudent = (rollNo) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    let students = [];
    try {
      students = JSON.parse(data); // Parse the existing data
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    // Find the student by rollNo and delete them
    const updatedStudents = students.filter(student => student.rollNo !== rollNo);

    if (students.length === updatedStudents.length) {
      console.log('Student not found!');
      return;
    }

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(updatedStudents, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        return;
      }
      console.log('Student deleted successfully!');
    });
  });
};

// Example Usage:
// Create a new student
const newStudent = { name: 'Reethika', rollNo: '105', dept: 'CSE', dob: '2003-01-01' };
createStudent(newStudent);

// Read all students
readStudents();

// Update a student
const updatedInfo = { name: 'Johnathan Doe', dept: 'IT' };
updateStudent('102', updatedInfo);

// Delete a student
deleteStudent('');
