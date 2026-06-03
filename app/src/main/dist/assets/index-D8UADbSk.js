(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q=[{id:"S-101",username:"Alex Rivera",email:"student@campushub.com",password:"password",profile:{rollNo:"2026-S01",class:"Computer Science - Year 3",phone:"+1 555-0199",address:"123 Campus Residence, Wing A"},attendance:[{date:"2026-05-25",status:"Present"},{date:"2026-05-26",status:"Present"},{date:"2026-05-27",status:"Present"},{date:"2026-05-28",status:"Absent"},{date:"2026-05-29",status:"Present"},{date:"2026-06-01",status:"Present"}],marks:[{subject:"Web Development",score:92,maxScore:100},{subject:"Data Structures",score:85,maxScore:100},{subject:"Database Systems",score:78,maxScore:100},{subject:"Software Engineering",score:88,maxScore:100}]},{id:"S-102",username:"Emma Watson",email:"emma@campushub.com",password:"password",profile:{rollNo:"2026-S02",class:"Computer Science - Year 3",phone:"+1 555-0244",address:"456 University Ave, Apt 4"},attendance:[{date:"2026-05-25",status:"Present"},{date:"2026-05-26",status:"Absent"},{date:"2026-05-27",status:"Present"},{date:"2026-05-28",status:"Present"},{date:"2026-05-29",status:"Present"},{date:"2026-06-01",status:"Present"}],marks:[{subject:"Web Development",score:95,maxScore:100},{subject:"Data Structures",score:90,maxScore:100},{subject:"Database Systems",score:84,maxScore:100},{subject:"Software Engineering",score:91,maxScore:100}]},{id:"S-103",username:"James Miller",email:"james@campushub.com",password:"password",profile:{rollNo:"2026-S03",class:"Information Technology - Year 2",phone:"+1 555-0377",address:"109 Dormitory East"},attendance:[{date:"2026-05-25",status:"Absent"},{date:"2026-05-26",status:"Absent"},{date:"2026-05-27",status:"Present"},{date:"2026-05-28",status:"Present"},{date:"2026-05-29",status:"Absent"},{date:"2026-06-01",status:"Present"}],marks:[{subject:"Web Development",score:68,maxScore:100},{subject:"Data Structures",score:72,maxScore:100},{subject:"Database Systems",score:65,maxScore:100},{subject:"Software Engineering",score:70,maxScore:100}]}],V=[{teacherId:"T-101",username:"teacher",password:"password",name:"Dr. Sarah Smith",email:"s.smith@campushub.com",department:"Computer Science"},{teacherId:"T-102",username:"prof_davis",password:"password",name:"Prof. Robert Davis",email:"r.davis@campushub.com",department:"Information Technology"}],z=[{adminId:"A-101",username:"admin",password:"password",name:"Campus Director",email:"admin@campushub.com"}];function Y(){localStorage.getItem("campushub_students")||localStorage.setItem("campushub_students",JSON.stringify(q)),localStorage.getItem("campushub_teachers")||localStorage.setItem("campushub_teachers",JSON.stringify(V)),localStorage.getItem("campushub_admins")||localStorage.setItem("campushub_admins",JSON.stringify(z))}Y();function y(){return JSON.parse(localStorage.getItem("campushub_students"))||[]}function B(s){localStorage.setItem("campushub_students",JSON.stringify(s))}function w(){return JSON.parse(localStorage.getItem("campushub_teachers"))||[]}function U(s){localStorage.setItem("campushub_teachers",JSON.stringify(s))}function J(){return JSON.parse(localStorage.getItem("campushub_admins"))||[]}function G(s){localStorage.setItem("campushub_admins",JSON.stringify(s))}function C(){return JSON.parse(localStorage.getItem("campushub_session"))||null}function A(s){localStorage.setItem("campushub_session",JSON.stringify(s))}function K(){localStorage.removeItem("campushub_session")}function m(s,a="success"){let e=document.getElementById("toast-container");e||(e=document.createElement("div"),e.id="toast-container",document.body.appendChild(e));const n=document.createElement("div");n.className=`toast ${a}`;let t="✓";a==="error"&&(t="✗"),a==="info"&&(t="ℹ"),n.innerHTML=`
    <span><strong>${t}</strong> ${s}</span>
    <span class="toast-close">&times;</span>
  `,e.appendChild(n),n.querySelector(".toast-close").addEventListener("click",()=>{n.remove()}),setTimeout(()=>{n.parentNode&&(n.classList.add("fadeOut"),setTimeout(()=>n.remove(),300))},4e3)}function Q(s,a,e){if(!s||!a||!e)return m("Please fill in all fields","error"),!1;const n=y();if(n.some(c=>c.email.toLowerCase()===a.toLowerCase()))return m("Email already registered!","error"),!1;const o={id:"S-"+(100+n.length+1),username:s,email:a,password:e,profile:{rollNo:"2026-S"+String(n.length+1).padStart(2,"0"),class:"Not Assigned",phone:"Not Assigned",address:"Not Assigned"},attendance:[],marks:[{subject:"Web Development",score:0,maxScore:100},{subject:"Data Structures",score:0,maxScore:100},{subject:"Database Systems",score:0,maxScore:100},{subject:"Software Engineering",score:0,maxScore:100}]};return n.push(o),B(n),m("Registration successful! Redirecting to login...","success"),setTimeout(()=>{window.location.href="student-login.html"},1500),!0}function X(s,a,e,n,t,r){if(!s||!a||!e||!n||!t||!r)return m("Please fill in all fields","error"),!1;const o=w();return o.some(u=>u.teacherId.toUpperCase()===t.toUpperCase()||u.username.toLowerCase()===e.toLowerCase())?(m("Teacher ID or Username already registered!","error"),!1):(o.push({teacherId:t.toUpperCase(),username:e,password:n,name:s,email:a,department:r}),U(o),m("Teacher registration successful! Redirecting to login...","success"),setTimeout(()=>{window.location.href="teacher-login.html"},1500),!0)}function Z(s,a,e,n,t){if(!s||!a||!e||!n||!t)return m("Please fill in all fields","error"),!1;const r=J();return r.some(c=>c.adminId.toUpperCase()===t.toUpperCase()||c.username.toLowerCase()===e.toLowerCase())?(m("Admin ID or Username already registered!","error"),!1):(r.push({adminId:t.toUpperCase(),username:e,password:n,name:s,email:a}),G(r),m("Admin registration successful! Redirecting to login...","success"),setTimeout(()=>{window.location.href="admin-login.html"},1500),!0)}function ee(s,a){if(!s||!a)return m("Please fill in all fields","error"),!1;const n=y().find(t=>t.email.toLowerCase()===s.toLowerCase()&&t.password===a);return n?(A({role:"student",userId:n.id,name:n.username,email:n.email}),m("Login successful!","success"),setTimeout(()=>{window.location.href="student-dashboard.html"},1e3),!0):(m("Invalid email or password","error"),!1)}function te(s,a,e){if(!s||!a||!e)return m("Please fill in all fields","error"),!1;const t=w().find(r=>r.username.toLowerCase()===s.toLowerCase()&&r.password===a&&r.teacherId.toUpperCase()===e.toUpperCase());return t?(A({role:"teacher",userId:t.teacherId,name:t.name,email:t.email}),m("Login successful!","success"),setTimeout(()=>{window.location.href="teacher-dashboard.html"},1e3),!0):(m("Invalid credentials or Teacher ID","error"),!1)}function se(s,a,e){if(!s||!a||!e)return m("Please fill in all fields","error"),!1;const t=J().find(r=>r.username.toLowerCase()===s.toLowerCase()&&r.password===a&&r.adminId.toUpperCase()===e.toUpperCase());return t?(A({role:"admin",userId:t.adminId,name:t.name,email:t.email}),m("Login successful!","success"),setTimeout(()=>{window.location.href="admin-dashboard.html"},1e3),!0):(m("Invalid credentials or Admin ID","error"),!1)}function ne(){K(),m("Logging out...","info"),setTimeout(()=>{window.location.href="index.html"},1e3)}function D(s){const a=C();(!a||a.role!==s)&&(window.location.href="index.html")}function H(){const s=document.querySelectorAll(".sidebar-menu-item a"),a=document.querySelectorAll(".tab-section"),e=document.getElementById("active-view-title");s.forEach(t=>{t.addEventListener("click",function(r){if(this.classList.contains("logout-trigger")||this.id==="logout-btn")return;r.preventDefault();const o=this.getAttribute("data-tab");s.forEach(u=>u.parentElement.classList.remove("active")),this.parentElement.classList.add("active"),a.forEach(u=>{u.id===o?u.classList.add("active"):u.classList.remove("active")}),e&&(e.textContent=this.textContent.trim());const c=document.querySelector(".sidebar");c&&c.classList.remove("active")})});const n=document.getElementById("mobile-menu-toggle");n&&n.addEventListener("click",()=>{const t=document.querySelector(".sidebar");t&&t.classList.toggle("active")})}function O(s){const a=C();if(!a)return;const e=document.getElementById("user-badge-name"),n=document.getElementById("user-badge-avatar"),t=document.getElementById("welcome-username");e&&(e.textContent=a.name),n&&(n.textContent=a.name.charAt(0).toUpperCase()),t&&(t.textContent=a.name)}function F(){D("student"),O(),H();const s=C(),e=y().find(g=>g.id===s.userId);if(!e)return;const n=document.getElementById("student-profile-fields");n&&(n.innerHTML=`
      <div class="profile-field">
        <div class="profile-field-label">Full Name</div>
        <div class="profile-field-value">${e.username}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Email Address</div>
        <div class="profile-field-value">${e.email}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Roll Number</div>
        <div class="profile-field-value">${e.profile.rollNo}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Class Group</div>
        <div class="profile-field-value">${e.profile.class}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Phone Contact</div>
        <div class="profile-field-value">${e.profile.phone}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Home Address</div>
        <div class="profile-field-value">${e.profile.address}</div>
      </div>
    `);const t=document.getElementById("edit-student-name"),r=document.getElementById("edit-student-phone"),o=document.getElementById("edit-student-address");t&&(t.value=e.username),r&&(r.value=e.profile.phone),o&&(o.value=e.profile.address);const c=document.getElementById("student-profile-form");c&&(c.onsubmit=function(g){g.preventDefault();const v=y(),b=v.findIndex(W=>W.id===e.id);v[b].username=t.value,v[b].profile.phone=r.value,v[b].profile.address=o.value,B(v);const E=C();E.name=t.value,A(E),m("Profile updated successfully!"),k("profile-modal"),F()});const u=e.attendance.length,i=e.attendance.filter(g=>g.status==="Present").length,d=u>0?Math.round(i/u*100):100,f=document.getElementById("overview-attendance-val");f&&(f.textContent=`${d}%`);const p=document.getElementById("overview-avg-mark-val");if(p){const g=e.marks.filter(b=>b.score>0),v=g.length>0?Math.round(g.reduce((b,E)=>b+E.score,0)/g.length):0;p.textContent=`${v}%`}const l=document.querySelector(".progress-ring-circle"),h=document.getElementById("attendance-percent-text"),S=document.getElementById("attendance-status-text");if(l&&h){const v=l.r.baseVal.value*2*Math.PI;l.style.strokeDasharray=`${v} ${v}`;const b=v-d/100*v;l.style.strokeDashoffset=b,h.textContent=`${d}%`,S&&(S.textContent=`${i} of ${u} sessions Present`)}const I=document.getElementById("student-attendance-table-body");I&&(e.attendance.length===0?I.innerHTML='<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No attendance records found.</td></tr>':I.innerHTML=e.attendance.map((g,v)=>{const b=g.status==="Present"?"badge-success":"badge-danger";return`
          <tr>
            <td>${v+1}</td>
            <td>${g.date}</td>
            <td><span class="badge ${b}">${g.status}</span></td>
          </tr>
        `}).join(""));const T=document.getElementById("student-marks-table-body");T&&(e.marks.length===0?T.innerHTML='<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No marks recorded.</td></tr>':T.innerHTML=e.marks.map((g,v)=>{const b=Math.round(g.score/g.maxScore*100);let E="badge-success";return b<50?E="badge-danger":b<75&&(E="badge-warning"),`
          <tr>
            <td>${v+1}</td>
            <td>${g.subject}</td>
            <td><strong>${g.score}</strong> / ${g.maxScore}</td>
            <td><span class="badge ${E}">${b}%</span></td>
          </tr>
        `}).join(""))}let x=new Date().toISOString().split("T")[0];function ae(){D("teacher"),O(),H();const s=document.getElementById("attendance-date-select");s&&(s.value=x,s.addEventListener("change",function(){x=this.value,_()}));const a=document.getElementById("teacher-total-students");a&&(a.textContent=y().length),_(),R();const e=document.getElementById("teacher-marks-form");e&&(e.onsubmit=function(c){c.preventDefault();const u=document.getElementById("marks-student-id").value,i=y(),d=i.findIndex(S=>S.id===u);if(d===-1)return;const f=parseInt(document.getElementById("mark-webdev").value)||0,p=parseInt(document.getElementById("mark-datastruct").value)||0,l=parseInt(document.getElementById("mark-dbsystems").value)||0,h=parseInt(document.getElementById("mark-softeng").value)||0;i[d].marks=[{subject:"Web Development",score:f,maxScore:100},{subject:"Data Structures",score:p,maxScore:100},{subject:"Database Systems",score:l,maxScore:100},{subject:"Software Engineering",score:h,maxScore:100}],B(i),m("Student marks saved successfully!"),k("marks-modal"),R()});const n=C(),r=w().find(c=>c.teacherId===n.userId),o=document.getElementById("teacher-profile-fields");o&&r&&(o.innerHTML=`
      <div class="profile-field">
        <div class="profile-field-label">Full Name</div>
        <div class="profile-field-value">${r.name}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Teacher ID</div>
        <div class="profile-field-value">${r.teacherId}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Username</div>
        <div class="profile-field-value">${r.username}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Department</div>
        <div class="profile-field-value">${r.department}</div>
      </div>
      <div class="profile-field">
        <div class="profile-field-label">Email Address</div>
        <div class="profile-field-value">${r.email}</div>
      </div>
    `)}function _(){const s=y(),a=document.getElementById("teacher-attendance-table-body");if(a){if(s.length===0){a.innerHTML='<tr><td colspan="5" style="text-align:center;">No students found in Campus database.</td></tr>';return}a.innerHTML=s.map((e,n)=>{const t=e.attendance.find(i=>i.date===x),r=t?t.status:null,o=r==="Present"?"checked":"",c=r==="Absent"?"checked":"",u=r===null;return`
      <tr>
        <td>${n+1}</td>
        <td><strong>${e.username}</strong><br><small style="color:var(--text-muted);">${e.profile.rollNo}</small></td>
        <td>${e.profile.class}</td>
        <td>
          <div style="display:flex; gap:1.5rem; align-items:center;">
            <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer;">
              <input type="radio" name="att-${e.id}" value="Present" ${o} ${u?"checked":""}>
              <span style="font-size:0.9rem; font-weight:500;">Present</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; color:var(--danger);">
              <input type="radio" name="att-${e.id}" value="Absent" ${c}>
              <span style="font-size:0.9rem; font-weight:500;">Absent</span>
            </label>
          </div>
        </td>
      </tr>
    `}).join("")}}function re(){const s=y();let a=0;s.forEach(e=>{const n=document.getElementsByName(`att-${e.id}`);let t="Present";for(let o of n)if(o.checked){t=o.value;break}const r=e.attendance.findIndex(o=>o.date===x);r!==-1?e.attendance[r].status=t:e.attendance.push({date:x,status:t}),a++}),B(s),m(`Saved attendance for ${a} students for date ${x}!`)}function R(){const s=y(),a=document.getElementById("teacher-marks-table-body");if(a){if(s.length===0){a.innerHTML='<tr><td colspan="5" style="text-align:center;">No students found.</td></tr>';return}a.innerHTML=s.map((e,n)=>{const t=e.marks.length>0?Math.round(e.marks.reduce((r,o)=>r+o.score,0)/e.marks.length):0;return`
      <tr>
        <td>${n+1}</td>
        <td><strong>${e.username}</strong><br><small style="color:var(--text-muted);">${e.profile.rollNo}</small></td>
        <td>${e.profile.class}</td>
        <td><strong>${t}%</strong> Average score</td>
        <td>
          <button class="btn btn-outline" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="openTeacherMarksModal('${e.id}')">
            Enter Marks
          </button>
        </td>
      </tr>
    `}).join("")}}function oe(s){var i,d,f,p;const e=y().find(l=>l.id===s);if(!e)return;const n=document.getElementById("marks-modal-student-name");n&&(n.textContent=e.username);const t=document.getElementById("marks-student-id");t&&(t.value=e.id);const r=((i=e.marks.find(l=>l.subject==="Web Development"))==null?void 0:i.score)||0,o=((d=e.marks.find(l=>l.subject==="Data Structures"))==null?void 0:d.score)||0,c=((f=e.marks.find(l=>l.subject==="Database Systems"))==null?void 0:f.score)||0,u=((p=e.marks.find(l=>l.subject==="Software Engineering"))==null?void 0:p.score)||0;document.getElementById("mark-webdev").value=r,document.getElementById("mark-datastruct").value=o,document.getElementById("mark-dbsystems").value=c,document.getElementById("mark-softeng").value=u,L("marks-modal")}let M=null,N=null;function de(){D("admin"),O(),H(),P(),j(),$();const s=document.getElementById("admin-student-form");s&&(s.onsubmit=function(e){e.preventDefault();const n=document.getElementById("student-field-name").value,t=document.getElementById("student-field-email").value,r=document.getElementById("student-field-pass").value,o=document.getElementById("student-field-roll").value,c=document.getElementById("student-field-class").value,u=document.getElementById("student-field-phone").value,i=document.getElementById("student-field-address").value,d=y();if(M){const f=d.findIndex(p=>p.id===M);f!==-1&&(d[f].username=n,d[f].email=t,d[f].password=r,d[f].profile.rollNo=o,d[f].profile.class=c,d[f].profile.phone=u,d[f].profile.address=i,m("Student details updated successfully!"))}else{if(d.some(p=>p.email.toLowerCase()===t.toLowerCase())){m("Email address already in use!","error");return}const f="S-"+(100+d.length+1);d.push({id:f,username:n,email:t,password:r,profile:{rollNo:o,class:c,phone:u,address:i},attendance:[],marks:[{subject:"Web Development",score:0,maxScore:100},{subject:"Data Structures",score:0,maxScore:100},{subject:"Database Systems",score:0,maxScore:100},{subject:"Software Engineering",score:0,maxScore:100}]}),m("New Student created successfully!")}B(d),k("student-modal"),P(),$()});const a=document.getElementById("admin-teacher-form");a&&(a.onsubmit=function(e){e.preventDefault();const n=document.getElementById("teacher-field-name").value,t=document.getElementById("teacher-field-email").value,r=document.getElementById("teacher-field-username").value,o=document.getElementById("teacher-field-pass").value,c=document.getElementById("teacher-field-id").value,u=document.getElementById("teacher-field-dept").value,i=w();if(N){const d=i.findIndex(f=>f.teacherId===N);d!==-1&&(i[d].name=n,i[d].email=t,i[d].username=r,i[d].password=o,i[d].department=u,m("Teacher details updated successfully!"))}else{if(i.some(d=>d.teacherId.toUpperCase()===c.toUpperCase()||d.username.toLowerCase()===r.toLowerCase())){m("Teacher ID or Username already exists!","error");return}i.push({teacherId:c.toUpperCase(),username:r,password:o,name:n,email:t,department:u}),m("New Teacher registered successfully!")}U(i),k("teacher-modal"),j(),$()})}function P(){const s=y(),a=document.getElementById("admin-total-students");a&&(a.textContent=s.length);const e=document.getElementById("admin-students-table-body");if(e){if(s.length===0){e.innerHTML='<tr><td colspan="6" style="text-align:center;">No students registered.</td></tr>';return}e.innerHTML=s.map((n,t)=>`
    <tr>
      <td>${t+1}</td>
      <td><strong>${n.username}</strong><br><small style="color:var(--text-muted);">${n.id}</small></td>
      <td>${n.profile.rollNo}</td>
      <td>${n.profile.class}</td>
      <td>${n.email}</td>
      <td>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-action" title="Edit Student" onclick="openStudentModal('${n.id}')">✏️</button>
          <button class="btn-action delete" title="Delete Student" onclick="deleteStudent('${n.id}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join("")}}function le(s=null){M=s;const a=document.getElementById("student-modal-title"),e=document.getElementById("student-field-name"),n=document.getElementById("student-field-email"),t=document.getElementById("student-field-pass"),r=document.getElementById("student-field-roll"),o=document.getElementById("student-field-class"),c=document.getElementById("student-field-phone"),u=document.getElementById("student-field-address");if(s){a.textContent="Edit Student Profile";const d=y().find(f=>f.id===s);d&&(e.value=d.username,n.value=d.email,n.disabled=!0,t.value=d.password,r.value=d.profile.rollNo,o.value=d.profile.class,c.value=d.profile.phone,u.value=d.profile.address)}else a.textContent="Add New Student",e.value="",n.value="",n.disabled=!1,t.value="password",r.value="",o.value="",c.value="",u.value="";L("student-modal")}function ie(s){if(confirm("Are you sure you want to delete this student? All attendance and marks records will be lost.")){let a=y();a=a.filter(e=>e.id!==s),B(a),m("Student deleted."),P(),$()}}function j(){const s=w(),a=document.getElementById("admin-total-teachers");a&&(a.textContent=s.length);const e=document.getElementById("admin-teachers-table-body");if(e){if(s.length===0){e.innerHTML='<tr><td colspan="5" style="text-align:center;">No teachers registered.</td></tr>';return}e.innerHTML=s.map((n,t)=>`
    <tr>
      <td>${t+1}</td>
      <td><strong>${n.name}</strong><br><small style="color:var(--text-muted);">${n.teacherId}</small></td>
      <td>${n.username}</td>
      <td>${n.department}</td>
      <td>${n.email}</td>
      <td>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-action" title="Edit Teacher" onclick="openTeacherModal('${n.teacherId}')">✏️</button>
          <button class="btn-action delete" title="Delete Teacher" onclick="deleteTeacher('${n.teacherId}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join("")}}function ce(s=null){N=s;const a=document.getElementById("teacher-modal-title"),e=document.getElementById("teacher-field-name"),n=document.getElementById("teacher-field-email"),t=document.getElementById("teacher-field-username"),r=document.getElementById("teacher-field-pass"),o=document.getElementById("teacher-field-id"),c=document.getElementById("teacher-field-dept");if(s){a.textContent="Edit Teacher Details";const i=w().find(d=>d.teacherId===s);i&&(e.value=i.name,n.value=i.email,t.value=i.username,t.disabled=!0,r.value=i.password,o.value=i.teacherId,o.disabled=!0,c.value=i.department)}else a.textContent="Add New Teacher",e.value="",n.value="",t.value="",t.disabled=!1,r.value="password",o.value="T-"+(100+w().length+1),o.disabled=!1,c.value="";L("teacher-modal")}function ue(s){if(confirm("Are you sure you want to delete this teacher account?")){let a=w();a=a.filter(e=>e.teacherId!==s),U(a),m("Teacher deleted."),j(),$()}}function $(){const s=y(),a=w();s.length,a.length;let e=0,n=0;s.forEach(p=>{p.attendance.forEach(l=>{n++,l.status==="Present"&&e++})});const t=n>0?Math.round(e/n*100):100,r=document.getElementById("admin-avg-attendance");r&&(r.textContent=`${t}%`);let o=0,c=0;s.forEach(p=>{p.marks.forEach(l=>{l.score>0&&(o+=l.score,c++)})});const u=c>0?Math.round(o/c):0,i=document.getElementById("admin-avg-score");i&&(i.textContent=`${u}%`);const d=document.getElementById("admin-reports-warnings-body");if(d){const p=[];s.forEach(l=>{const h=l.attendance.length;if(h>0){const S=l.attendance.filter(T=>T.status==="Present").length,I=Math.round(S/h*100);I<75&&p.push({name:l.username,roll:l.profile.rollNo,classStr:l.profile.class,rate:I})}else p.push({name:l.username,roll:l.profile.rollNo,classStr:l.profile.class,rate:0})}),p.length===0?d.innerHTML='<tr><td colspan="4" style="text-align:center; color:var(--success); font-weight:600;">All students clear (Attendance > 75%)!</td></tr>':d.innerHTML=p.map(l=>`
        <tr>
          <td><strong>${l.name}</strong></td>
          <td>${l.roll}</td>
          <td>${l.classStr}</td>
          <td><span class="badge badge-danger">${l.rate}%</span></td>
        </tr>
      `).join("")}const f=document.getElementById("admin-reports-performance-body");if(f){const p=s.map(l=>{const h=l.marks.filter(I=>I.score>0),S=h.length>0?Math.round(h.reduce((I,T)=>I+T.score,0)/h.length):0;return{name:l.username,roll:l.profile.rollNo,classStr:l.profile.class,avgScore:S}});p.sort((l,h)=>h.avgScore-l.avgScore),p.length===0?f.innerHTML='<tr><td colspan="4" style="text-align:center;">No performance records.</td></tr>':f.innerHTML=p.map((l,h)=>{let S=h+1;return h===0?S="🥇 1st":h===1?S="🥈 2nd":h===2&&(S="🥉 3rd"),`
          <tr>
            <td><strong>${S}</strong></td>
            <td><strong>${l.name}</strong></td>
            <td>${l.classStr}</td>
            <td><strong>${l.avgScore}%</strong></td>
          </tr>
        `}).join("")}}function L(s){const a=document.getElementById(s);a&&a.classList.add("active")}function k(s){const a=document.getElementById(s);a&&a.classList.remove("active")}window.registerStudent=Q;window.registerTeacher=X;window.registerAdmin=Z;window.loginStudent=ee;window.loginTeacher=te;window.loginAdmin=se;window.logout=ne;window.protectDashboard=D;window.loadStudentDashboard=F;window.loadTeacherDashboard=ae;window.loadAdminDashboard=de;window.saveTeacherAttendance=re;window.openTeacherMarksModal=oe;window.openStudentModal=le;window.deleteStudent=ie;window.openTeacherModal=ce;window.deleteTeacher=ue;window.openModal=L;window.closeModal=k;
