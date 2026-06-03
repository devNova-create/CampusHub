const express = require('express');
const cors = require('cors');
const { db, dbRun, dbGet, dbAll } = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper function to build a student's full structured profile object
async function getFullStudentData(studentId) {
  const user = await dbGet("SELECT id, username, email, password FROM users WHERE id = ? AND role = 'student'", [studentId]);
  if (!user) return null;

  const profile = await dbGet("SELECT roll_no as rollNo, class, phone, address FROM profiles WHERE student_id = ?", [studentId]);
  const attendance = await dbAll("SELECT date, status FROM attendance WHERE student_id = ? ORDER BY date DESC", [studentId]);
  const dbMarks = await dbAll("SELECT subject, score, max_score as maxScore FROM marks WHERE student_id = ?", [studentId]);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    profile: profile || { rollNo: 'Not Assigned', class: 'Not Assigned', phone: 'Not Assigned', address: 'Not Assigned' },
    attendance: attendance || [],
    marks: dbMarks || []
  };
}

// Helper function to get all students with complete structures
async function getAllStudentsFullData() {
  const students = await dbAll("SELECT id FROM users WHERE role = 'student'");
  const studentsFull = [];
  for (let s of students) {
    const fullData = await getFullStudentData(s.id);
    if (fullData) {
      studentsFull.push(fullData);
    }
  }
  return studentsFull;
}

// ========================================================
// AUTH ROUTES
// ========================================================

// Student Login
app.post('/api/auth/login/student', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbGet(
      "SELECT id, username, email FROM users WHERE LOWER(email) = LOWER(?) AND password = ? AND role = 'student'",
      [email, password]
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      role: "student",
      userId: user.id,
      name: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Teacher Login
app.post('/api/auth/login/teacher', async (req, res) => {
  const { username, password, teacherId } = req.body;
  try {
    const user = await dbGet(
      "SELECT id, username, email, name FROM users WHERE LOWER(username) = LOWER(?) AND password = ? AND UPPER(id) = UPPER(?) AND role = 'teacher'",
      [username, password, teacherId]
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials or Teacher ID" });
    }

    res.json({
      role: "teacher",
      userId: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Login
app.post('/api/auth/login/admin', async (req, res) => {
  const { username, password, adminId } = req.body;
  try {
    const user = await dbGet(
      "SELECT id, username, email, name FROM users WHERE LOWER(username) = LOWER(?) AND password = ? AND UPPER(id) = UPPER(?) AND role = 'admin'",
      [username, password, adminId]
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials or Admin ID" });
    }

    res.json({
      role: "admin",
      userId: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register Student
app.post('/api/auth/register/student', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check duplicate
    const existing = await dbGet("SELECT id FROM users WHERE LOWER(email) = LOWER(?)", [email]);
    if (existing) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    const students = await dbAll("SELECT id FROM users WHERE role = 'student'");
    const newId = "S-" + (100 + students.length + 1);
    const newRoll = "2026-S" + String(students.length + 1).padStart(2, '0');

    // Create user
    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name) VALUES (?, ?, ?, ?, ?, ?)",
      [newId, username, email, password, "student", username]
    );

    // Create profile
    await dbRun(
      "INSERT INTO profiles (student_id, roll_no, class, phone, address) VALUES (?, ?, ?, ?, ?)",
      [newId, newRoll, "Not Assigned", "Not Assigned", "Not Assigned"]
    );

    // Create default marks
    const subjects = ["Web Development", "Data Structures", "Database Systems", "Software Engineering"];
    for (let sub of subjects) {
      await dbRun(
        "INSERT INTO marks (student_id, subject, score, max_score) VALUES (?, ?, 0, 100)",
        [newId, sub]
      );
    }

    res.status(201).json({ success: true, studentId: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register Teacher
app.post('/api/auth/register/teacher', async (req, res) => {
  const { name, email, username, password, teacherId, department } = req.body;
  try {
    // Check duplicate ID or username
    const existing = await dbGet(
      "SELECT id FROM users WHERE UPPER(id) = UPPER(?) OR LOWER(username) = LOWER(?)",
      [teacherId, username]
    );
    if (existing) {
      return res.status(400).json({ error: "Teacher ID or Username already registered!" });
    }

    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name, department) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [teacherId.toUpperCase(), username, email, password, "teacher", name, department]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register Admin
app.post('/api/auth/register/admin', async (req, res) => {
  const { name, email, username, password, adminId, passcode } = req.body;
  if (passcode !== "CAMPUS2026") {
    return res.status(403).json({ error: "Invalid Admin Registration Passcode!" });
  }
  try {
    const existing = await dbGet(
      "SELECT id FROM users WHERE UPPER(id) = UPPER(?) OR LOWER(username) = LOWER(?)",
      [adminId, username]
    );
    if (existing) {
      return res.status(400).json({ error: "Admin ID or Username already registered!" });
    }

    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name) VALUES (?, ?, ?, ?, ?, ?)",
      [adminId.toUpperCase(), username, email, password, "admin", name]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ========================================================
// STUDENTS ENDPOINTS (CRUD)
// ========================================================

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await getAllStudentsFullData();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single student
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await getFullStudentData(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create student (Admin)
app.post('/api/students', async (req, res) => {
  const { username, email, password, profile } = req.body;
  try {
    const existing = await dbGet("SELECT id FROM users WHERE LOWER(email) = LOWER(?)", [email]);
    if (existing) {
      return res.status(400).json({ error: "Email address already in use!" });
    }

    const students = await dbAll("SELECT id FROM users WHERE role = 'student'");
    const newId = "S-" + (100 + students.length + 1);

    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name) VALUES (?, ?, ?, ?, ?, ?)",
      [newId, username, email, password, "student", username]
    );

    await dbRun(
      "INSERT INTO profiles (student_id, roll_no, class, phone, address) VALUES (?, ?, ?, ?, ?)",
      [newId, profile.rollNo, profile.class, profile.phone, profile.address]
    );

    // Initial default marks
    const subjects = ["Web Development", "Data Structures", "Database Systems", "Software Engineering"];
    for (let sub of subjects) {
      await dbRun(
        "INSERT INTO marks (student_id, subject, score, max_score) VALUES (?, ?, 0, 100)",
        [newId, sub]
      );
    }

    const newStudent = await getFullStudentData(newId);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student (Student edit profile / Admin edit details)
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, profile } = req.body;
  try {
    // Update core fields if provided
    if (username) {
      await dbRun("UPDATE users SET username = ?, name = ? WHERE id = ?", [username, username, id]);
    }
    if (password) {
      await dbRun("UPDATE users SET password = ? WHERE id = ?", [password, id]);
    }

    // Update profile
    if (profile) {
      await dbRun(
        "UPDATE profiles SET roll_no = ?, class = ?, phone = ?, address = ? WHERE student_id = ?",
        [profile.rollNo, profile.class, profile.phone, profile.address, id]
      );
    }

    const updated = await getFullStudentData(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await dbRun("DELETE FROM users WHERE id = ? AND role = 'student'", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ========================================================
// TEACHERS ENDPOINTS (CRUD)
// ========================================================

// Get all teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await dbAll(
      "SELECT id as teacherId, username, password, name, email, department FROM users WHERE role = 'teacher'"
    );
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create teacher (Admin)
app.post('/api/teachers', async (req, res) => {
  const { teacherId, username, password, name, email, department } = req.body;
  try {
    const existing = await dbGet(
      "SELECT id FROM users WHERE UPPER(id) = UPPER(?) OR LOWER(username) = LOWER(?)",
      [teacherId, username]
    );
    if (existing) {
      return res.status(400).json({ error: "Teacher ID or Username already exists!" });
    }

    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name, department) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [teacherId.toUpperCase(), username, email, password, "teacher", name, department]
    );

    res.status(201).json({ teacherId: teacherId.toUpperCase(), username, password, name, email, department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update teacher details
app.put('/api/teachers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, department } = req.body;
  try {
    await dbRun(
      "UPDATE users SET name = ?, email = ?, password = ?, department = ? WHERE id = ? AND role = 'teacher'",
      [name, email, password, department, id]
    );

    const updated = await dbGet(
      "SELECT id as teacherId, username, password, name, email, department FROM users WHERE id = ?",
      [id]
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete teacher
app.delete('/api/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await dbRun("DELETE FROM users WHERE id = ? AND role = 'teacher'", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ========================================================
// ATTENDANCE ENDPOINTS
// ========================================================

// Bulk save attendance (Teacher save attendance for date)
app.post('/api/attendance/bulk', async (req, res) => {
  const { date, records } = req.body; // records: [{ studentId, status }]
  try {
    for (let record of records) {
      await dbRun(
        "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON CONFLICT(student_id, date) DO UPDATE SET status = excluded.status",
        [record.studentId, date, record.status]
      );
    }
    res.json({ success: true, count: records.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ========================================================
// MARKS ENDPOINTS
// ========================================================

// Save marks for student
app.post('/api/marks', async (req, res) => {
  const { studentId, marks } = req.body; // marks: [{ subject, score, maxScore }]
  try {
    for (let mark of marks) {
      await dbRun(
        "INSERT INTO marks (student_id, subject, score, max_score) VALUES (?, ?, ?, ?) ON CONFLICT(student_id, subject) DO UPDATE SET score = excluded.score, max_score = excluded.max_score",
        [studentId, mark.subject, mark.score, mark.maxScore]
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Campus Hub backend server running on http://localhost:${PORT}`);
});
