const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/campushub";

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Verify connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.stack);
  } else {
    console.log('Connected to the PostgreSQL database.');
    release();
    initializeDatabase();
  }
});

// Helper wrapper to dynamically convert SQLite "?" placeholders to PostgreSQL "$1, $2..." placeholders
function pgSql(sql) {
  let index = 1;
  return sql.replace(/\?/g, () => `$${index++}`);
}

// Helper wrapper to run SQL commands as Promises
async function dbRun(sql, params = []) {
  const convertedSql = pgSql(sql);
  const result = await pool.query(convertedSql, params);
  return result;
}

// Helper wrapper to get a single row
async function dbGet(sql, params = []) {
  const convertedSql = pgSql(sql);
  const result = await pool.query(convertedSql, params);
  return result.rows[0] || null;
}

// Helper wrapper to get multiple rows
async function dbAll(sql, params = []) {
  const convertedSql = pgSql(sql);
  const result = await pool.query(convertedSql, params);
  return result.rows;
}

async function initializeDatabase() {
  try {
    // Create Users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        username VARCHAR(100) UNIQUE,
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        role VARCHAR(50),
        name VARCHAR(100),
        department VARCHAR(100)
      )
    `);

    // Create Profiles table for students
    await dbRun(`
      CREATE TABLE IF NOT EXISTS profiles (
        student_id VARCHAR(100) PRIMARY KEY,
        roll_no VARCHAR(100),
        class VARCHAR(100),
        phone VARCHAR(100),
        address TEXT,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create Attendance table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        student_id VARCHAR(100),
        date VARCHAR(50),
        status VARCHAR(50),
        UNIQUE(student_id, date),
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create Marks table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        student_id VARCHAR(100),
        subject VARCHAR(100),
        score INTEGER,
        max_score INTEGER,
        UNIQUE(student_id, subject),
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create Announcements table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        author_role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default announcements if none exist
    const announcementCount = await dbGet("SELECT COUNT(*) as count FROM announcements");
    if (parseInt(announcementCount.count, 10) === 0) {
      console.log("Seeding default announcements...");
      await dbRun(
        "INSERT INTO announcements (title, content, author_name, author_role) VALUES (?, ?, ?, ?)",
        ["Welcome to CampusHub!", "We are excited to launch the new CampusHub system. Students can now view their academic details online.", "Campus Director", "admin"]
      );
      await dbRun(
        "INSERT INTO announcements (title, content, author_name, author_role) VALUES (?, ?, ?, ?)",
        ["Final Exam Schedule Posted", "The final exams schedule for all modules has been finalized. Please check your respective departments.", "Dr. Sarah Smith", "teacher"]
      );
    }

    // Seed data if database is empty
    const userCount = await dbGet("SELECT COUNT(*) as count FROM users");
    if (parseInt(userCount.count, 10) === 0) {
      console.log("Database is empty. Seeding default accounts and data...");
      await seedData();
    } else {
      console.log("Database already initialized.");
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
}

async function seedData() {
  // 1. Seed Admins
  await dbRun(
    "INSERT INTO users (id, username, email, password, role, name) VALUES (?, ?, ?, ?, ?, ?)",
    ["A-101", "admin", "admin@campushub.com", "password", "admin", "Campus Director"]
  );

  // 2. Seed Teachers
  const DEFAULT_TEACHERS = [
    {
      id: "T-101",
      username: "teacher",
      password: "password",
      name: "Dr. Sarah Smith",
      email: "s.smith@campushub.com",
      department: "Computer Science"
    },
    {
      id: "T-102",
      username: "prof_davis",
      password: "password",
      name: "Prof. Robert Davis",
      email: "r.davis@campushub.com",
      department: "Information Technology"
    }
  ];

  for (let t of DEFAULT_TEACHERS) {
    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name, department) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [t.id, t.username, t.email, t.password, "teacher", t.name, t.department]
    );
  }

  // 3. Seed Students
  const DEFAULT_STUDENTS = [
    {
      id: "S-101",
      name: "Alex Rivera",
      email: "student@campushub.com",
      password: "password",
      profile: {
        rollNo: "2026-S01",
        class: "Computer Science - Year 3",
        phone: "+1 555-0199",
        address: "123 Campus Residence, Wing A"
      },
      attendance: [
        { date: "2026-05-25", status: "Present" },
        { date: "2026-05-26", status: "Present" },
        { date: "2026-05-27", status: "Present" },
        { date: "2026-05-28", status: "Absent" },
        { date: "2026-05-29", status: "Present" },
        { date: "2026-06-01", status: "Present" }
      ],
      marks: [
        { subject: "Web Development", score: 92, maxScore: 100 },
        { subject: "Data Structures", score: 85, maxScore: 100 },
        { subject: "Database Systems", score: 78, maxScore: 100 },
        { subject: "Software Engineering", score: 88, maxScore: 100 }
      ]
    },
    {
      id: "S-102",
      name: "Emma Watson",
      email: "emma@campushub.com",
      password: "password",
      profile: {
        rollNo: "2026-S02",
        class: "Computer Science - Year 3",
        phone: "+1 555-0244",
        address: "456 University Ave, Apt 4"
      },
      attendance: [
        { date: "2026-05-25", status: "Present" },
        { date: "2026-05-26", status: "Absent" },
        { date: "2026-05-27", status: "Present" },
        { date: "2026-05-28", status: "Present" },
        { date: "2026-05-29", status: "Present" },
        { date: "2026-06-01", status: "Present" }
      ],
      marks: [
        { subject: "Web Development", score: 95, maxScore: 100 },
        { subject: "Data Structures", score: 90, maxScore: 100 },
        { subject: "Database Systems", score: 84, maxScore: 100 },
        { subject: "Software Engineering", score: 91, maxScore: 100 }
      ]
    },
    {
      id: "S-103",
      name: "James Miller",
      email: "james@campushub.com",
      password: "password",
      profile: {
        rollNo: "2026-S03",
        class: "Information Technology - Year 2",
        phone: "+1 555-0377",
        address: "109 Dormitory East"
      },
      attendance: [
        { date: "2026-05-25", status: "Absent" },
        { date: "2026-05-26", status: "Absent" },
        { date: "2026-05-27", status: "Present" },
        { date: "2026-05-28", status: "Present" },
        { date: "2026-05-29", status: "Absent" },
        { date: "2026-06-01", status: "Present" }
      ],
      marks: [
        { subject: "Web Development", score: 68, maxScore: 100 },
        { subject: "Data Structures", score: 72, maxScore: 100 },
        { subject: "Database Systems", score: 65, maxScore: 100 },
        { subject: "Software Engineering", score: 70, maxScore: 100 }
      ]
    }
  ];

  for (let s of DEFAULT_STUDENTS) {
    // Insert user row
    await dbRun(
      "INSERT INTO users (id, username, email, password, role, name) VALUES (?, ?, ?, ?, ?, ?)",
      [s.id, s.name, s.email, s.password, "student", s.name]
    );

    // Insert profile row
    await dbRun(
      "INSERT INTO profiles (student_id, roll_no, class, phone, address) VALUES (?, ?, ?, ?, ?)",
      [s.id, s.profile.rollNo, s.profile.class, s.profile.phone, s.profile.address]
    );

    // Insert attendance records
    for (let att of s.attendance) {
      await dbRun(
        "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)",
        [s.id, att.date, att.status]
      );
    }

    // Insert marks records
    for (let m of s.marks) {
      await dbRun(
        "INSERT INTO marks (student_id, subject, score, max_score) VALUES (?, ?, ?, ?)",
        [s.id, m.subject, m.score, m.maxScore]
      );
    }
  }

  console.log("Seeding complete successfully.");
}

module.exports = {
  db: pool,
  dbRun,
  dbGet,
  dbAll
};
