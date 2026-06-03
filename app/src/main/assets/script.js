// ==========================================
// CAMPUS HUB - CORE JAVASCRIPT SYSTEM (API VERSION)
// ==========================================

// --- API Configuration ---
// If running in WebView (file:// protocol), connect to local server using emulator host address 10.0.2.2.
// If running in browser (Vite dev server), connect to localhost.
// If running in WebView or browser, connect to the live Render backend.
const API_BASE_URL = "https://campushub-api-33mv.onrender.com/api";

// --- Session Helpers ---
function getSession() {
  return JSON.parse(localStorage.getItem("campushub_session")) || null;
}

function saveSession(session) {
  localStorage.setItem("campushub_session", JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem("campushub_session");
}

// --- Customized Toast Notifications ---
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "✓";
  if (type === "error") icon = "✗";
  if (type === "info") icon = "ℹ";

  toast.innerHTML = `
    <span><strong>${icon}</strong> ${message}</span>
    <span class="toast-close">&times;</span>
  `;

  container.appendChild(toast);

  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });

  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add("fadeOut");
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

// Register Student
async function registerStudent(username, email, password) {
  if (!username || !email || !password) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Registration failed", "error");
      return false;
    }

    showToast("Registration successful! Redirecting to login...", "success");
    setTimeout(() => {
      window.location.href = "student-login.html";
    }, 1500);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Register Teacher
async function registerTeacher(name, email, username, password, teacherId, department) {
  if (!name || !email || !username || !password || !teacherId || !department) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/teacher`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password, teacherId, department })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Teacher registration failed", "error");
      return false;
    }

    showToast("Teacher registration successful! Redirecting to login...", "success");
    setTimeout(() => {
      window.location.href = "teacher-login.html";
    }, 1500);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Register Admin
async function registerAdmin(name, email, username, password, adminId, passcode) {
  if (!name || !email || !username || !password || !adminId || !passcode) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password, adminId, passcode })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Admin registration failed", "error");
      return false;
    }

    showToast("Admin registration successful! Redirecting to login...", "success");
    setTimeout(() => {
      window.location.href = "admin-login.html";
    }, 1500);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Login Student
async function loginStudent(email, password) {
  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Invalid credentials", "error");
      return false;
    }

    saveSession(data);
    showToast("Login successful!", "success");
    setTimeout(() => {
      window.location.href = "student-dashboard.html";
    }, 1000);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Login Teacher
async function loginTeacher(username, password, teacherId) {
  if (!username || !password || !teacherId) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/teacher`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, teacherId })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Invalid credentials", "error");
      return false;
    }

    saveSession(data);
    showToast("Login successful!", "success");
    setTimeout(() => {
      window.location.href = "teacher-dashboard.html";
    }, 1000);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Login Admin
async function loginAdmin(username, password, adminId) {
  if (!username || !password || !adminId) {
    showToast("Please fill in all fields", "error");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, adminId })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Invalid credentials", "error");
      return false;
    }

    saveSession(data);
    showToast("Login successful!", "success");
    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1000);
    return true;
  } catch (err) {
    showToast("Network error. Is the backend server running?", "error");
    console.error(err);
    return false;
  }
}

// Logout session
function logout() {
  clearSession();
  showToast("Logging out...", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// Protection Guard for Dashboard access
function protectDashboard(role) {
  const session = getSession();
  if (!session || session.role !== role) {
    window.location.href = "index.html";
  }
}

// ==========================================
// UI INTERACTION & SPA NAVIGATION HANDLERS
// ==========================================
function setupDashboardTabs() {
  const links = document.querySelectorAll(".sidebar-menu-item a");
  const sections = document.querySelectorAll(".tab-section");
  const topbarTitle = document.getElementById("active-view-title");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.classList.contains("logout-trigger") || this.id === "logout-btn") {
        return;
      }
      
      e.preventDefault();
      const targetTab = this.getAttribute("data-tab");
      
      links.forEach(l => l.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");

      sections.forEach(sec => {
        if (sec.id === targetTab) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });

      if (topbarTitle) {
        topbarTitle.textContent = this.textContent.trim();
      }

      const sidebar = document.querySelector(".sidebar");
      if (sidebar) sidebar.classList.remove("active");
    });
  });

  const mobileToggle = document.getElementById("mobile-menu-toggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) sidebar.classList.toggle("active");
    });
  }
}

function displayUserProfileInfo(role) {
  const session = getSession();
  if (!session) return;

  const badgeName = document.getElementById("user-badge-name");
  const badgeAvatar = document.getElementById("user-badge-avatar");
  const welcomeName = document.getElementById("welcome-username");

  if (badgeName) badgeName.textContent = session.name;
  if (badgeAvatar) badgeAvatar.textContent = session.name.charAt(0).toUpperCase();
  if (welcomeName) welcomeName.textContent = session.name;
}

// ==========================================
// STUDENT MODULE SPECIFIC
// ==========================================
async function loadStudentDashboard() {
  protectDashboard("student");
  displayUserProfileInfo("student");
  setupDashboardTabs();
  
  const session = getSession();
  if (!session) return;

  try {
    const res = await fetch(`${API_BASE_URL}/students/${session.userId}`);
    if (!res.ok) throw new Error("Failed to fetch student data");
    const currentStudent = await res.json();

    // Render Student Profile Section
    const profileContainer = document.getElementById("student-profile-fields");
    if (profileContainer) {
      profileContainer.innerHTML = `
        <div class="profile-field">
          <div class="profile-field-label">Full Name</div>
          <div class="profile-field-value">${currentStudent.username}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">Email Address</div>
          <div class="profile-field-value">${currentStudent.email}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">Roll Number</div>
          <div class="profile-field-value">${currentStudent.profile.rollNo}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">Class Group</div>
          <div class="profile-field-value">${currentStudent.profile.class}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">Phone Contact</div>
          <div class="profile-field-value">${currentStudent.profile.phone}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">Home Address</div>
          <div class="profile-field-value">${currentStudent.profile.address}</div>
        </div>
      `;
    }

    // Populate Edit Profile Modal Inputs
    const editName = document.getElementById("edit-student-name");
    const editPhone = document.getElementById("edit-student-phone");
    const editAddress = document.getElementById("edit-student-address");
    if (editName) editName.value = currentStudent.username;
    if (editPhone) editPhone.value = currentStudent.profile.phone;
    if (editAddress) editAddress.value = currentStudent.profile.address;

    // Edit Profile Form Submit
    const editForm = document.getElementById("student-profile-form");
    if (editForm) {
      editForm.onsubmit = async function(e) {
        e.preventDefault();
        try {
          const updateRes = await fetch(`${API_BASE_URL}/students/${currentStudent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: editName.value,
              profile: {
                rollNo: currentStudent.profile.rollNo,
                class: currentStudent.profile.class,
                phone: editPhone.value,
                address: editAddress.value
              }
            })
          });

          if (!updateRes.ok) throw new Error("Failed to update profile");
          const updatedStudent = await updateRes.json();

          // Update session info
          const sSession = getSession();
          sSession.name = updatedStudent.username;
          saveSession(sSession);

          showToast("Profile updated successfully!");
          closeModal("profile-modal");
          loadStudentDashboard(); // reload page values
        } catch (err) {
          showToast(err.message, "error");
        }
      };
    }

    // Calculate & Display Attendance Ring
    const attTotal = currentStudent.attendance.length;
    const attPresent = currentStudent.attendance.filter(a => a.status === "Present").length;
    const attPercent = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 100;

    // Set Summary widgets
    const cardAttVal = document.getElementById("overview-attendance-val");
    if (cardAttVal) cardAttVal.textContent = `${attPercent}%`;

    const cardMarksVal = document.getElementById("overview-avg-mark-val");
    if (cardMarksVal) {
      const validMarks = currentStudent.marks.filter(m => m.score > 0);
      const avg = validMarks.length > 0 
        ? Math.round(validMarks.reduce((sum, m) => sum + m.score, 0) / validMarks.length)
        : 0;
      cardMarksVal.textContent = `${avg}%`;
    }

    // Render circular SVG attendance ring
    const circle = document.querySelector(".progress-ring-circle");
    const percentText = document.getElementById("attendance-percent-text");
    const statusText = document.getElementById("attendance-status-text");

    if (circle && percentText) {
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (attPercent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      percentText.textContent = `${attPercent}%`;

      if (statusText) {
        statusText.textContent = `${attPresent} of ${attTotal} sessions Present`;
      }
    }

    // Render Attendance Table
    const attTableBody = document.getElementById("student-attendance-table-body");
    if (attTableBody) {
      if (currentStudent.attendance.length === 0) {
        attTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No attendance records found.</td></tr>`;
      } else {
        attTableBody.innerHTML = currentStudent.attendance.map((att, index) => {
          const badgeClass = att.status === "Present" ? "badge-success" : "badge-danger";
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${att.date}</td>
              <td><span class="badge ${badgeClass}">${att.status}</span></td>
            </tr>
          `;
        }).join("");
      }
    }

    // Render Marks Section & Table
    const marksTableBody = document.getElementById("student-marks-table-body");
    if (marksTableBody) {
      if (currentStudent.marks.length === 0) {
        marksTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No marks recorded.</td></tr>`;
      } else {
        marksTableBody.innerHTML = currentStudent.marks.map((m, index) => {
          const percent = Math.round((m.score / m.maxScore) * 100);
          let performanceClass = "badge-success";
          if (percent < 50) performanceClass = "badge-danger";
          else if (percent < 75) performanceClass = "badge-warning";

          return `
            <tr>
              <td>${index + 1}</td>
              <td>${m.subject}</td>
              <td><strong>${m.score}</strong> / ${m.maxScore}</td>
              <td><span class="badge ${performanceClass}">${percent}%</span></td>
            </tr>
          `;
        }).join("");
      }
    }
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ==========================================
// TEACHER MODULE SPECIFIC
// ==========================================
let activeAttendanceDate = new Date().toISOString().split("T")[0];

async function loadTeacherDashboard() {
  protectDashboard("teacher");
  displayUserProfileInfo("teacher");
  setupDashboardTabs();

  // Set default date value for attendance
  const attDateInput = document.getElementById("attendance-date-select");
  if (attDateInput) {
    attDateInput.value = activeAttendanceDate;
    attDateInput.addEventListener("change", async function() {
      activeAttendanceDate = this.value;
      await renderTeacherAttendanceManager();
    });
  }

  // Fetch initial student list to draw UI
  try {
    const res = await fetch(`${API_BASE_URL}/students`);
    const students = await res.json();

    const studentsCount = document.getElementById("teacher-total-students");
    if (studentsCount) studentsCount.textContent = students.length;

    await renderTeacherAttendanceManager(students);
    await renderTeacherMarksManager(students);
  } catch (err) {
    showToast("Error loading dashboard data", "error");
  }

  // Handle Mark Entry Submissions
  const marksForm = document.getElementById("teacher-marks-form");
  if (marksForm) {
    marksForm.onsubmit = async function(e) {
      e.preventDefault();
      const studentId = document.getElementById("marks-student-id").value;
      const webDev = parseInt(document.getElementById("mark-webdev").value) || 0;
      const dataStruct = parseInt(document.getElementById("mark-datastruct").value) || 0;
      const dbSystems = parseInt(document.getElementById("mark-dbsystems").value) || 0;
      const softEng = parseInt(document.getElementById("mark-softeng").value) || 0;

      try {
        const updateRes = await fetch(`${API_BASE_URL}/marks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            marks: [
              { subject: "Web Development", score: webDev, maxScore: 100 },
              { subject: "Data Structures", score: dataStruct, maxScore: 100 },
              { subject: "Database Systems", score: dbSystems, maxScore: 100 },
              { subject: "Software Engineering", score: softEng, maxScore: 100 }
            ]
          })
        });

        if (!updateRes.ok) throw new Error("Failed to save marks");

        showToast("Student marks saved successfully!");
        closeModal("marks-modal");
        await renderTeacherMarksManager();
      } catch (err) {
        showToast(err.message, "error");
      }
    };
  }

  // Teacher Profile Render
  const tSession = getSession();
  const tProfileFields = document.getElementById("teacher-profile-fields");
  if (tProfileFields && tSession) {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`);
      const teachers = await res.json();
      const currentTeacher = teachers.find(t => t.teacherId === tSession.userId);
      
      if (currentTeacher) {
        tProfileFields.innerHTML = `
          <div class="profile-field">
            <div class="profile-field-label">Full Name</div>
            <div class="profile-field-value">${currentTeacher.name}</div>
          </div>
          <div class="profile-field">
            <div class="profile-field-label">Teacher ID</div>
            <div class="profile-field-value">${currentTeacher.teacherId}</div>
          </div>
          <div class="profile-field">
            <div class="profile-field-label">Username</div>
            <div class="profile-field-value">${currentTeacher.username}</div>
          </div>
          <div class="profile-field">
            <div class="profile-field-label">Department</div>
            <div class="profile-field-value">${currentTeacher.department}</div>
          </div>
          <div class="profile-field">
            <div class="profile-field-label">Email Address</div>
            <div class="profile-field-value">${currentTeacher.email}</div>
          </div>
        `;
      }
    } catch (err) {
      console.error("Failed to load teacher profile details", err);
    }
  }
}

// Render student table in Attendance Manager
async function renderTeacherAttendanceManager(students = null) {
  const tableBody = document.getElementById("teacher-attendance-table-body");
  if (!tableBody) return;

  if (!students) {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      students = await res.json();
    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--danger);">Error loading students.</td></tr>`;
      return;
    }
  }

  if (students.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No students found in Campus database.</td></tr>`;
    return;
  }

  tableBody.innerHTML = students.map((student, idx) => {
    const attRecord = student.attendance.find(a => a.date === activeAttendanceDate);
    const status = attRecord ? attRecord.status : null;

    const presentChecked = status === "Present" ? "checked" : "";
    const absentChecked = status === "Absent" ? "checked" : "";
    const isUnmarked = status === null;

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${student.username}</strong><br><small style="color:var(--text-muted);">${student.profile.rollNo}</small></td>
        <td>${student.profile.class}</td>
        <td>
          <div style="display:flex; gap:1.5rem; align-items:center;">
            <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer;">
              <input type="radio" name="att-${student.id}" value="Present" ${presentChecked} ${isUnmarked ? "checked" : ""}>
              <span style="font-size:0.9rem; font-weight:500;">Present</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; color:var(--danger);">
              <input type="radio" name="att-${student.id}" value="Absent" ${absentChecked}>
              <span style="font-size:0.9rem; font-weight:500;">Absent</span>
            </label>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Save all toggled attendance details
async function saveTeacherAttendance() {
  try {
    const res = await fetch(`${API_BASE_URL}/students`);
    const students = await res.json();
    
    const records = [];
    students.forEach(student => {
      const radioElements = document.getElementsByName(`att-${student.id}`);
      let selectedStatus = "Present"; 
      for (let r of radioElements) {
        if (r.checked) {
          selectedStatus = r.value;
          break;
        }
      }
      records.push({ studentId: student.id, status: selectedStatus });
    });

    const updateRes = await fetch(`${API_BASE_URL}/attendance/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: activeAttendanceDate, records })
    });

    if (!updateRes.ok) throw new Error("Failed to save attendance");

    showToast(`Saved attendance for ${records.length} students for date ${activeAttendanceDate}!`);
  } catch (err) {
    showToast(err.message, "error");
  }
}

// Render student table in Marks Manager
async function renderTeacherMarksManager(students = null) {
  const tableBody = document.getElementById("teacher-marks-table-body");
  if (!tableBody) return;

  if (!students) {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      students = await res.json();
    } catch (err) {
      console.error(err);
      return;
    }
  }

  if (students.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No students found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = students.map((s, idx) => {
    const avg = s.marks.length > 0 
      ? Math.round(s.marks.reduce((sum, m) => sum + m.score, 0) / s.marks.length) 
      : 0;

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${s.username}</strong><br><small style="color:var(--text-muted);">${s.profile.rollNo}</small></td>
        <td>${s.profile.class}</td>
        <td><strong>${avg}%</strong> Average score</td>
        <td>
          <button class="btn btn-outline" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="openTeacherMarksModal('${s.id}')">
            Enter Marks
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

// Open and fill marks entering modal
async function openTeacherMarksModal(studentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/students/${studentId}`);
    if (!res.ok) throw new Error("Student not found");
    const student = await res.json();

    const heading = document.getElementById("marks-modal-student-name");
    if (heading) heading.textContent = student.username;

    const idInput = document.getElementById("marks-student-id");
    if (idInput) idInput.value = student.id;

    const webDevMark = student.marks.find(m => m.subject === "Web Development")?.score || 0;
    const dataStructMark = student.marks.find(m => m.subject === "Data Structures")?.score || 0;
    const dbSystemsMark = student.marks.find(m => m.subject === "Database Systems")?.score || 0;
    const softEngMark = student.marks.find(m => m.subject === "Software Engineering")?.score || 0;

    document.getElementById("mark-webdev").value = webDevMark;
    document.getElementById("mark-datastruct").value = dataStructMark;
    document.getElementById("mark-dbsystems").value = dbSystemsMark;
    document.getElementById("mark-softeng").value = softEngMark;

    openModal("marks-modal");
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ==========================================
// ADMIN MODULE SPECIFIC
// ==========================================
let editingStudentId = null;
let editingTeacherId = null;

async function loadAdminDashboard() {
  protectDashboard("admin");
  displayUserProfileInfo("admin");
  setupDashboardTabs();

  // Render lists & metrics
  await renderAdminStudents();
  await renderAdminTeachers();
  await renderAdminReports();

  // Student Form Submits
  const sForm = document.getElementById("admin-student-form");
  if (sForm) {
    sForm.onsubmit = async function(e) {
      e.preventDefault();
      const sName = document.getElementById("student-field-name").value;
      const sEmail = document.getElementById("student-field-email").value;
      const sPass = document.getElementById("student-field-pass").value;
      const sRoll = document.getElementById("student-field-roll").value;
      const sClass = document.getElementById("student-field-class").value;
      const sPhone = document.getElementById("student-field-phone").value;
      const sAddress = document.getElementById("student-field-address").value;

      try {
        if (editingStudentId) {
          // Edit mode
          const res = await fetch(`${API_BASE_URL}/students/${editingStudentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: sName,
              password: sPass,
              profile: { rollNo: sRoll, class: sClass, phone: sPhone, address: sAddress }
            })
          });

          if (!res.ok) throw new Error("Failed to update student details");
          showToast("Student details updated successfully!");
        } else {
          // Create mode
          const res = await fetch(`${API_BASE_URL}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: sName,
              email: sEmail,
              password: sPass,
              profile: { rollNo: sRoll, class: sClass, phone: sPhone, address: sAddress }
            })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to create student");
          showToast("New Student created successfully!");
        }

        closeModal("student-modal");
        await renderAdminStudents();
        await renderAdminReports();
      } catch (err) {
        showToast(err.message, "error");
      }
    };
  }

  // Teacher Form Submits
  const tForm = document.getElementById("admin-teacher-form");
  if (tForm) {
    tForm.onsubmit = async function(e) {
      e.preventDefault();
      const tName = document.getElementById("teacher-field-name").value;
      const tEmail = document.getElementById("teacher-field-email").value;
      const tUsername = document.getElementById("teacher-field-username").value;
      const tPass = document.getElementById("teacher-field-pass").value;
      const tIdStr = document.getElementById("teacher-field-id").value;
      const tDept = document.getElementById("teacher-field-dept").value;

      try {
        if (editingTeacherId) {
          // Edit mode
          const res = await fetch(`${API_BASE_URL}/teachers/${editingTeacherId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: tName, email: tEmail, password: tPass, department: tDept })
          });

          if (!res.ok) throw new Error("Failed to update teacher");
          showToast("Teacher details updated successfully!");
        } else {
          // Create mode
          const res = await fetch(`${API_BASE_URL}/teachers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              teacherId: tIdStr,
              username: tUsername,
              password: tPass,
              name: tName,
              email: tEmail,
              department: tDept
            })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to create teacher");
          showToast("New Teacher registered successfully!");
        }

        closeModal("teacher-modal");
        await renderAdminTeachers();
        await renderAdminReports();
      } catch (err) {
        showToast(err.message, "error");
      }
    };
  }
}

// Render Students inside Admin view
async function renderAdminStudents() {
  const tableBody = document.getElementById("admin-students-table-body");
  if (!tableBody) return;

  try {
    const res = await fetch(`${API_BASE_URL}/students`);
    const students = await res.json();

    const adminStudentCount = document.getElementById("admin-total-students");
    if (adminStudentCount) adminStudentCount.textContent = students.length;

    if (students.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No students registered.</td></tr>`;
      return;
    }

    tableBody.innerHTML = students.map((s, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${s.username}</strong><br><small style="color:var(--text-muted);">${s.id}</small></td>
        <td>${s.profile.rollNo}</td>
        <td>${s.profile.class}</td>
        <td>${s.email}</td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-action" title="Edit Student" onclick="openStudentModal('${s.id}')">✏️</button>
            <button class="btn-action delete" title="Delete Student" onclick="deleteStudent('${s.id}')">🗑️</button>
          </div>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--danger);">Error loading students.</td></tr>`;
  }
}

// Open student creation/edit modal
async function openStudentModal(studentId = null) {
  editingStudentId = studentId;
  const modalTitle = document.getElementById("student-modal-title");
  
  const sName = document.getElementById("student-field-name");
  const sEmail = document.getElementById("student-field-email");
  const sPass = document.getElementById("student-field-pass");
  const sRoll = document.getElementById("student-field-roll");
  const sClass = document.getElementById("student-field-class");
  const sPhone = document.getElementById("student-field-phone");
  const sAddress = document.getElementById("student-field-address");

  if (studentId) {
    modalTitle.textContent = "Edit Student Profile";
    try {
      const res = await fetch(`${API_BASE_URL}/students/${studentId}`);
      const student = await res.json();
      
      if (student) {
        sName.value = student.username;
        sEmail.value = student.email;
        sEmail.disabled = true; 
        sPass.value = student.password;
        sRoll.value = student.profile.rollNo;
        sClass.value = student.profile.class;
        sPhone.value = student.profile.phone;
        sAddress.value = student.profile.address;
      }
    } catch (err) {
      showToast("Error loading student", "error");
    }
  } else {
    modalTitle.textContent = "Add New Student";
    sName.value = "";
    sEmail.value = "";
    sEmail.disabled = false;
    sPass.value = "password"; 
    sRoll.value = "";
    sClass.value = "";
    sPhone.value = "";
    sAddress.value = "";
  }

  openModal("student-modal");
}

// Delete student account
async function deleteStudent(studentId) {
  if (confirm("Are you sure you want to delete this student? All attendance and marks records will be lost.")) {
    try {
      const res = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete student");

      showToast("Student deleted.");
      await renderAdminStudents();
      await renderAdminReports();
    } catch (err) {
      showToast(err.message, "error");
    }
  }
}

// Render Teachers in Admin view
async function renderAdminTeachers() {
  const tableBody = document.getElementById("admin-teachers-table-body");
  if (!tableBody) return;

  try {
    const res = await fetch(`${API_BASE_URL}/teachers`);
    const teachers = await res.json();

    const adminTeacherCount = document.getElementById("admin-total-teachers");
    if (adminTeacherCount) adminTeacherCount.textContent = teachers.length;

    if (teachers.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No teachers registered.</td></tr>`;
      return;
    }

    tableBody.innerHTML = teachers.map((t, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${t.name}</strong><br><small style="color:var(--text-muted);">${t.teacherId}</small></td>
        <td>${t.username}</td>
        <td>${t.department}</td>
        <td>${t.email}</td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-action" title="Edit Teacher" onclick="openTeacherModal('${t.teacherId}')">✏️</button>
            <button class="btn-action delete" title="Delete Teacher" onclick="deleteTeacher('${t.teacherId}')">🗑️</button>
          </div>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--danger);">Error loading teachers.</td></tr>`;
  }
}

// Open teacher creation/edit modal
async function openTeacherModal(teacherId = null) {
  editingTeacherId = teacherId;
  const modalTitle = document.getElementById("student-modal-title"); 

  const tName = document.getElementById("teacher-field-name");
  const tEmail = document.getElementById("teacher-field-email");
  const tUsername = document.getElementById("teacher-field-username");
  const tPass = document.getElementById("teacher-field-pass");
  const tIdStr = document.getElementById("teacher-field-id");
  const tDept = document.getElementById("teacher-field-dept");

  if (teacherId) {
    const titleEl = document.getElementById("teacher-modal-title") || modalTitle;
    if (titleEl) titleEl.textContent = "Edit Teacher Details";
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`);
      const teachers = await res.json();
      const teacher = teachers.find(t => t.teacherId === teacherId);

      if (teacher) {
        tName.value = teacher.name;
        tEmail.value = teacher.email;
        tUsername.value = teacher.username;
        tUsername.disabled = true; 
        tPass.value = teacher.password;
        tIdStr.value = teacher.teacherId;
        tIdStr.disabled = true;
        tDept.value = teacher.department;
      }
    } catch (err) {
      showToast("Error loading teacher info", "error");
    }
  } else {
    const titleEl = document.getElementById("teacher-modal-title") || modalTitle;
    if (titleEl) titleEl.textContent = "Add New Teacher";
    tName.value = "";
    tEmail.value = "";
    tUsername.value = "";
    tUsername.disabled = false;
    tPass.value = "password"; 
    
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`);
      const teachers = await res.json();
      tIdStr.value = "T-" + (100 + teachers.length + 1);
    } catch (err) {
      tIdStr.value = "T-" + (100 + Math.floor(Math.random() * 100) + 1);
    }
    tIdStr.disabled = false;
    tDept.value = "";
  }

  openModal("teacher-modal");
}

// Delete teacher account
async function deleteTeacher(teacherId) {
  if (confirm("Are you sure you want to delete this teacher account?")) {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/${teacherId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete teacher");

      showToast("Teacher deleted.");
      await renderAdminTeachers();
      await renderAdminReports();
    } catch (err) {
      showToast(err.message, "error");
    }
  }
}

// Calculate and render comprehensive reports
async function renderAdminReports() {
  try {
    const sRes = await fetch(`${API_BASE_URL}/students`);
    const students = await sRes.json();

    const tRes = await fetch(`${API_BASE_URL}/teachers`);
    const teachers = await tRes.json();

    // 1. Calc Campus Average Attendance
    let totalAttPresent = 0;
    let totalAttSessions = 0;
    students.forEach(s => {
      s.attendance.forEach(a => {
        totalAttSessions++;
        if (a.status === "Present") totalAttPresent++;
      });
    });
    const avgAttRate = totalAttSessions > 0 
      ? Math.round((totalAttPresent / totalAttSessions) * 100) 
      : 100;

    const adminAvgAttCardVal = document.getElementById("admin-avg-attendance");
    if (adminAvgAttCardVal) adminAvgAttCardVal.textContent = `${avgAttRate}%`;

    // 2. Calc Campus Average Subject Score
    let totalScoreSum = 0;
    let totalMarksCount = 0;
    students.forEach(s => {
      s.marks.forEach(m => {
        if (m.score > 0) {
          totalScoreSum += m.score;
          totalMarksCount++;
        }
      });
    });
    const avgScoreVal = totalMarksCount > 0 
      ? Math.round(totalScoreSum / totalMarksCount) 
      : 0;

    const adminAvgScoreCardVal = document.getElementById("admin-avg-score");
    if (adminAvgScoreCardVal) adminAvgScoreCardVal.textContent = `${avgScoreVal}%`;

    // 3. Render low attendance warnings table
    const warningListBody = document.getElementById("admin-reports-warnings-body");
    if (warningListBody) {
      const criticalStudents = [];

      students.forEach(s => {
        const tot = s.attendance.length;
        if (tot > 0) {
          const pres = s.attendance.filter(a => a.status === "Present").length;
          const pct = Math.round((pres / tot) * 100);
          if (pct < 75) {
            criticalStudents.push({ name: s.username, roll: s.profile.rollNo, classStr: s.profile.class, rate: pct });
          }
        } else {
          criticalStudents.push({ name: s.username, roll: s.profile.rollNo, classStr: s.profile.class, rate: 0 });
        }
      });

      if (criticalStudents.length === 0) {
        warningListBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--success); font-weight:600;">All students clear (Attendance > 75%)!</td></tr>`;
      } else {
        warningListBody.innerHTML = criticalStudents.map(cs => `
          <tr>
            <td><strong>${cs.name}</strong></td>
            <td>${cs.roll}</td>
            <td>${cs.classStr}</td>
            <td><span class="badge badge-danger">${cs.rate}%</span></td>
          </tr>
        `).join("");
      }
    }

    // 4. Render leaderboard
    const performanceBody = document.getElementById("admin-reports-performance-body");
    if (performanceBody) {
      const studentPerformance = students.map(s => {
        const valid = s.marks.filter(m => m.score > 0);
        const avg = valid.length > 0 ? Math.round(valid.reduce((sum, m) => sum + m.score, 0) / valid.length) : 0;
        return { name: s.username, roll: s.profile.rollNo, classStr: s.profile.class, avgScore: avg };
      });

      studentPerformance.sort((a, b) => b.avgScore - a.avgScore);

      if (studentPerformance.length === 0) {
        performanceBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No performance records.</td></tr>`;
      } else {
        performanceBody.innerHTML = studentPerformance.map((item, idx) => {
          let medal = idx + 1;
          if (idx === 0) medal = "🥇 1st";
          else if (idx === 1) medal = "🥈 2nd";
          else if (idx === 2) medal = "🥉 3rd";

          return `
            <tr>
              <td><strong>${medal}</strong></td>
              <td><strong>${item.name}</strong></td>
              <td>${item.classStr}</td>
              <td><strong>${item.avgScore}%</strong></td>
            </tr>
          `;
        }).join("");
      }
    }
  } catch (err) {
    console.error("Error drawing admin reports", err);
  }
}

// ==========================================
// COMMON MODAL HELPERS
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// Expose functions globally to window so that inline HTML event handlers work
window.registerStudent = registerStudent;
window.registerTeacher = registerTeacher;
window.registerAdmin = registerAdmin;
window.loginStudent = loginStudent;
window.loginTeacher = loginTeacher;
window.loginAdmin = loginAdmin;
window.logout = logout;
window.protectDashboard = protectDashboard;
window.loadStudentDashboard = loadStudentDashboard;
window.loadTeacherDashboard = loadTeacherDashboard;
window.loadAdminDashboard = loadAdminDashboard;
window.saveTeacherAttendance = saveTeacherAttendance;
window.openTeacherMarksModal = openTeacherMarksModal;
window.openStudentModal = openStudentModal;
window.deleteStudent = deleteStudent;
window.openTeacherModal = openTeacherModal;
window.deleteTeacher = deleteTeacher;
window.openModal = openModal;
window.closeModal = closeModal;
