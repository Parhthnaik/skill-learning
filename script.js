// १. सर्व भाषांचे शब्द (Translations)
const translations = {
    en: { welcome: "Welcome, Parth Naik", search: "Search courses...", watch: "▶ Watch Video", quiz: "📝 Take Quiz", progress: "Progress", loginErr: "Access Denied!", startMsg: "Please watch the video first!" },
    mr: { welcome: "स्वागत आहे, पार्थ नाईक", search: "कोर्स शोधा...", watch: "▶ व्हिडिओ पहा", quiz: "📝 क्विझ द्या", progress: "प्रगती", loginErr: "प्रवेश नाकारला!", startMsg: "आधी व्हिडिओ पहा!" },
    hi: { welcome: "स्वागत है, पार्थ नाईक", search: "कोर्स खोजें...", watch: "▶ वीडियो देखें", quiz: "📝 क्विज दें", progress: "प्रगति", loginErr: "प्रवेश निषेध!", startMsg: "पहले वीडियो देखें!" },
    kn: { welcome: "ಸ್ವಾಗತ, ಪಾರ್ಥ ನಾಯಕ್", search: "ಕೋರ್ಸ್ ಹುಡುಕಿ...", watch: "▶ ವಿಡಿಯೋ ನೋಡಿ", quiz: "📝 ರಸಪ್ರಶ್ನೆ", progress: "ಪ್ರಗತಿ", loginErr: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ!", startMsg: "ಮೊದಲು ವಿಡಿಯೋ ನೋಡಿ!" }
};

let currentLang = 'en'; // डीफॉल्ट भाषा
const courses = [
    // Programming
    { title: "Python Programming", duration: "10 Hours", level: "Beginner", videoId: "rfscVS0vtbw", category: "Programming" },
    { title: "Java Development", duration: "18 Hours", level: "Intermediate", videoId: "eIrMblyqzW8", category: "Programming" },
    { title: "C++ Masterclass", duration: "12 Hours", level: "Beginner", videoId: "vLnPwxZdW4Y", category: "Programming" },
    { title: "PHP for Beginners", duration: "8 Hours", level: "Beginner", videoId: "OK_JCtrrv-c", category: "Programming" },
    { title: "React JS Basics", duration: "14 Hours", level: "Intermediate", videoId: "bMknfKXIFA8", category: "Programming" },

    // Web Development
    { title: "Full Stack Web Dev", duration: "25 Hours", level: "Advanced", videoId: "qz0aGYrrlhU", category: "Programming" },
    { title: "HTML & CSS Design", duration: "6 Hours", level: "Beginner", videoId: "MDl4-68YqbI", category: "Programming" },
    { title: "JavaScript Pro", duration: "20 Hours", level: "Advanced", videoId: "jS4aFq5dxOt", category: "Programming" },
    { title: "Node.js Backend", duration: "15 Hours", level: "Intermediate", videoId: "TlB_eWDSMt4", category: "Programming" },
    { title: "Bootstrap UI", duration: "5 Hours", level: "Beginner", videoId: "vpAJ0s5S2t0", category: "Programming" },

    // Cyber Security
    { title: "Cyber Security Fundamentals", duration: "12 Hours", level: "Beginner", videoId: "nzj7Wg46lsA", category: "Security" },
    { title: "Ethical Hacking", duration: "30 Hours", level: "Advanced", videoId: "3Kq1MIfTWCE", category: "Security" },
    { title: "Network Security", duration: "15 Hours", level: "Intermediate", videoId: "U_P2fH3_3_c", category: "Security" },
    { title: "Cryptography", duration: "10 Hours", level: "Advanced", videoId: "NuyzuNBFWxQ", category: "Security" },
    { title: "Cloud Security", duration: "14 Hours", level: "Intermediate", videoId: "mC_89p0YyE0", category: "Security" },

    // Data Science & AI
    { title: "Data Science Intro", duration: "20 Hours", level: "Beginner", videoId: "ua-CiDNNj30", category: "Data" },
    { title: "Machine Learning", duration: "22 Hours", level: "Intermediate", videoId: "GwIo3gDZCVQ", category: "Data" },
    { title: "Artificial Intelligence", duration: "18 Hours", level: "Advanced", videoId: "JMuXJK77zE0", category: "Data" },
    { title: "SQL for Data Analysis", duration: "9 Hours", level: "Beginner", videoId: "HXV3zeQKqGY", category: "Data" },
    { title: "Power BI Training", duration: "11 Hours", level: "Intermediate", videoId: "AGrl-H87pRU", category: "Data" }
];
// कोर्सेसची प्रोग्रेस ट्रॅक करण्यासाठी (हा कोड २० किंवा कितीही कोर्सेससाठी आपोआप काम करतो)
let userProgress = {
    watched: new Array(courses.length).fill(false),
    completed: new Array(courses.length).fill(false)
};

const container = document.getElementById('course-list');

function renderCourses(lang = currentLang, filter = 'All') {
    const container = document.getElementById('course-list');
    if (!container) return;
    container.innerHTML = "";

    courses.forEach((course, index) => {
        if (filter === 'All' || course.category === filter) {
            // प्रोग्रेस कॅल्क्युलेशन
            let currentPercent = userProgress.completed[index] ? 100 : (userProgress.watched[index] ? 50 : 0);
            
            // कार्ड रेंडर करणे (Language सपोर्टसह)
            container.innerHTML += `
                <div class="card" id="course-${index}" style="animation-delay: ${index * 0.1}s">
                    <div class="course-badge">${course.level}</div>
                    <h3>${course.title}</h3>
                    
                    <div class="progress-text">
                        ${translations[lang].progress}: <span id="percent-${index}">${currentPercent}</span>%
                    </div>
                    
                    <div class="progress-container" style="background: #eee; height: 10px; border-radius: 5px; margin: 10px 0;">
                        <div class="progress-bar" id="bar-${index}" style="background: #27ae60; height: 100%; width: ${currentPercent}%; border-radius: 5px; transition: 1s;"></div>
                    </div>
                    
                    <p>Duration: ${course.duration}</p>
                    
                    <button class="enroll-btn" onclick="playVideo('${course.videoId}', ${index})">
                        ${translations[lang].watch}
                    </button>
                    
                    <button class="enroll-btn" style="background:#8e44ad; margin-top:5px;" onclick="startQuiz(${index})">
                        ${translations[lang].quiz}
                    </button>
                </div>
            `;
        }
    });
}
// १. भाषा बदलण्याचे फंक्शन (भाषा बदलली की कोर्सेस अपडेट होतील)
function changeLanguage() {
    currentLang = document.getElementById('lang-select').value;
    
    // डॅशबोर्डवरील टायटल आणि सर्च बारची भाषा बदलणे
    const welcomeTitle = document.getElementById('welcome-text');
    if(welcomeTitle) welcomeTitle.innerText = translations[currentLang].welcome;
    
    const searchBar = document.getElementById('courseSearch');
    if(searchBar) searchBar.placeholder = translations[currentLang].search;
    
    renderCourses(currentLang); // नवीन भाषेत कोर्सेस दाखवा
}

// २. व्हिडिओ प्ले करण्याचे फंक्शन
function playVideo(id, index) {
    // युजरला व्हिडिओ दाखवण्यासाठी ओव्हरले तयार करणे
    const overlay = document.createElement('div');
    overlay.id = 'video-modal';
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:10000; display:flex; align-items:center; justify-content:center;";
    overlay.innerHTML = `
        <div style="width:80%; position:relative;">
            <span onclick="document.getElementById('video-modal').remove()" style="position:absolute; top:-40px; right:0; color:white; font-size:30px; cursor:pointer;">&times; Close</span>
            <iframe width="100%" height="450" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>`;
    document.body.appendChild(overlay);

    // ५ सेकंद व्हिडिओ पाहिला की प्रोग्रेस ५०% (Watched = true) करणे
    setTimeout(() => { 
        userProgress.watched[index] = true; 
        renderCourses(currentLang); 
    }, 5000);
}

// ३. सर्च फंक्शन (कोर्स शोधण्यासाठी)
function searchCourses() {
    let input = document.getElementById('courseSearch').value.toLowerCase();
    const container = document.getElementById('course-list');
    container.innerHTML = "";

    courses.forEach((course, index) => {
        if (course.title.toLowerCase().includes(input)) {
            // फक्त मॅच होणारे कोर्सेस रेंडर करणे
            renderCourses(currentLang); 
        }
    });
}
// 1. Video Play Logic
function playVideo(id, index) {
    const videoOverlay = document.createElement('div');
    videoOverlay.id = 'video-modal';
    videoOverlay.className = 'modal';
    videoOverlay.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>
            <div style="background: #e3f2fd; padding: 10px; margin-top: 10px; border-radius: 5px; font-size: 14px; color: #0d47a1;">
                ℹ️ Progress will update to 50% after watching. You must watch the video to unlock the quiz!
            </div>
        </div>
    `;
    document.body.appendChild(videoOverlay);

    // Simulation: Mark as watched after 5 seconds
    setTimeout(() => {
        if (!userProgress.watched[index]) {
            userProgress.watched[index] = true;
            updateUI(index, 50);
            console.log("Course video watched: " + index);
        }
    }, 5000); 
}

// 2. Quiz Logic (5 Questions)
function startQuiz(index) {
    if (!userProgress.watched[index]) {
        alert("🛑 Access Denied: Please watch the video first to unlock the quiz!");
        return;
    }

    if (userProgress.completed[index]) {
        alert("✅ Success: You have already mastered this course!");
        return;
    }

    const questions = [
        { q: "1. Which extension is used for Python files? (.py / .js / .txt)", a: ".py" },
        { q: "2. What is the full form of HTML?", a: "hypertext markup language" },
        { q: "3. Which part is known as the Brain of the computer? (RAM / CPU / SSD)", a: "cpu" },
        { q: "4. Is RAM a permanent storage device? (Yes / No)", a: "no" },
        { q: "5. What does WWW stand for?", a: "world wide web" }
    ];

    let score = 0;
    alert("Starting Quiz for " + courses[index].title + "\nPass criteria: 4/5 correct answers.");

    for (let i = 0; i < questions.length; i++) {
        let answer = prompt(questions[i].q);
        if (answer && answer.trim().toLowerCase() === questions[i].a.toLowerCase()) {
            score++;
        }
    }

    if (score >= 4) {
        alert("🎯 Amazing! You scored " + score + "/5. You have passed the quiz!");
        markComplete(index);
    } else {
        alert("❌ Score: " + score + "/5. You need at least 4 correct answers to pass. Watch the video again and retry!");
    }
}

function markComplete(index) {
    userProgress.completed[index] = true;
    updateUI(index, 100);
    alert("Course 100% Completed! Your certificate is now available for download.");
}

function updateUI(index, val) {
    const bar = document.getElementById(`bar-${index}`);
    const txt = document.getElementById(`percent-${index}`);
    if (bar && txt) {
        bar.style.width = val + "%";
        txt.innerText = val;
    }
}

// 3. Certificate Logic
function generateCertificate() {
    // १. पूर्ण झालेल्या कोर्सेसची यादी मिळवा
    let completedTitles = [];
    courses.forEach((course, index) => {
        if (userProgress.completed[index]) {
            completedTitles.push(course.title);
        }
    });

    // २. जर एकही कोर्स पूर्ण नसेल तर एरर दाखवा
    if (completedTitles.length === 0) {
        alert("🛑 Locked: आधी किमान एक कोर्स १००% पूर्ण करा!");
        return;
    }

    // ३. युजरला कोणता कोर्स निवडायचा आहे ते विचारणे (जर एकापेक्षा जास्त पूर्ण असतील तर)
    let selectedCourse = completedTitles[0]; 
    if (completedTitles.length > 1) {
        let options = completedTitles.join("\n- ");
        selectedCourse = prompt("तुम्ही हे कोर्सेस पूर्ण केले आहेत:\n- " + options + "\n\nसर्टिफिकेटसाठी कोर्सचे नाव टाईप करा:", completedTitles[0]);
    }

    const userName = prompt("सर्टिफिकेटवर छापण्यासाठी तुमचे पूर्ण नाव टाका:");
    
    if (userName && selectedCourse) {
        const certOverlay = document.createElement('div');
        certOverlay.className = 'modal';
        certOverlay.style.display = 'flex';
        certOverlay.innerHTML = `
            <div class="modal-content certificate-box" style="max-width: 800px; background: #fffaf0;">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div style="border: 5px solid #b8860b; padding: 30px;">
                    <h1 style="color: #b8860b; font-family: serif; letter-spacing: 2px;">CERTIFICATE OF COMPLETION</h1>
                    <p style="font-size: 18px;">This is to certify that</p>
                    <h2 class="cert-name">${userName}</h2>
                    <p style="font-size: 18px;">has successfully completed the professional course in</p>
                    <h3 style="font-size: 24px; color: #333;">${selectedCourse}</h3>
                    <p>on this date <b>${new Date().toLocaleDateString()}</b></p>
                    
                    <div style="display: flex; justify-content: space-around; margin-top: 50px;">
                        <div style="text-align: center;">
                            <p style="border-top: 1px solid #333; width: 150px;">SkillUp Instructor</p>
                        </div>
                        <div style="width: 100px; height: 100px; border: 2px solid gold; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: gold; font-weight: bold; transform: rotate(-15deg);">
                            OFFICIAL SEAL
                        </div>
                        <div style="text-align: center;">
                            <p style="border-top: 1px solid #333; width: 150px;"><b>P. M. Naik</b><br>Director</p>
                        </div>
                    </div>
                </div>
                <button class="enroll-btn" style="background:#b8860b; margin-top:20px; color: white;" onclick="window.print()">📥 Download PDF / Print</button>
            </div>
        `;
        document.body.appendChild(certOverlay);
    }
}

// Utility Functions
function closeModal() { const m = document.getElementById('video-modal'); if (m) m.remove(); }

// १. लॉगिन फंक्शन - जे नाव लक्षात ठेवेल
function checkLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (u.trim() !== "" && p === "admin123") { 
        // नाव मेमरीमध्ये (LocalStorage) सेव्ह करणे
        localStorage.setItem('loggedInUser', u);
        
        // लॉगिन स्क्रीन काढून टाकणे
        document.getElementById('login-screen').style.display = "none";
        
        // सर्व ठिकाणी नाव अपडेट करणे
        updateUserUI();
    } else {
        alert(translations[currentLang].loginErr || "Access Denied!");
    }
}

// २. नाव अपडेट करण्याचे फंक्शन
function updateUserUI() {
    const savedName = localStorage.getItem('loggedInUser') || "Guest User";
    
    // १. डॅशबोर्डवर स्वागत मेसेज अपडेट करणे
    const welcomeTxt = document.getElementById('welcome-text');
    if (welcomeTxt) {
        welcomeTxt.innerText = `Welcome, ${savedName}`;
    }

    // २. प्रोफाईल सेक्शनमधील नाव बदलणे
    const profileDisplayName = document.getElementById('display-name');
    if (profileDisplayName) {
        profileDisplayName.innerText = savedName;
    }

    // ३. प्रोफाईलमध्ये युजरची इतर माहिती (Dynamic Information)
    const userRole = document.getElementById('user-role');
    if (userRole) {
        userRole.innerText = (savedName === "admin") ? "System Administrator" : "Student / Learner";
    }
}

// ३. शो सेक्शन (Dashboard/Profile/Contact बदलण्यासाठी)
function showSection(sectionId) {
    const sections = ['dashboard-content', 'profile-section', 'contact-section'];

    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // जर सेक्शन मॅच झाला तर दाखवा, नाहीतर लपवा
            element.style.display = (id.startsWith(sectionId)) ? 'block' : 'none';
        }
    });

    // जर डॅशबोर्डवर आला तर कोर्सेस पुन्हा लोड करा
    if (sectionId === 'dashboard') {
        renderCourses();
    }
}

// ४. पेज लोड झाल्यावर नाव सेट करणे
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedInUser')) {
        updateUserUI();
    }
});

 function searchCourses() {
    // १. सर्च बॉक्समधील टेक्स्ट मिळवा
    let input = document.getElementById('courseSearch').value.toLowerCase();
    
    // २. कोर्सेसची लिस्ट पुन्हा रेंडर करा (फिल्टर वापरून)
    const container = document.getElementById('course-list');
    container.innerHTML = ""; // जुनी लिस्ट क्लिअर करा

    courses.forEach((course, index) => {
        // जर कोर्सच्या नावामध्ये सर्च केलेला शब्द असेल तरच तो दाखवा
        if (course.title.toLowerCase().includes(input)) {
            let currentPercent = userProgress.completed[index] ? 100 : (userProgress.watched[index] ? 50 : 0);
            
            container.innerHTML += `
                <div class="card" style="animation: fadeIn 0.5s ease;">
                    <div class="course-badge">${course.level}</div>
                    <h3>${course.title}</h3>
                    <div class="progress-text">Progress: ${currentPercent}%</div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${currentPercent}%"></div>
                    </div>
                    <p>Duration: ${course.duration}</p>
                    <button class="enroll-btn" onclick="playVideo('${course.videoId}', ${index})">▶ Watch Video</button>
                    <button class="enroll-btn" style="background:#8e44ad; margin-top:5px;" onclick="startQuiz(${index})">📝 Take Quiz</button>
                </div>
            `;
        }
    });

    // ३. जर एकही कोर्स सापडला नाही तर मेसेज दाखवा
    if (container.innerHTML === "") {
        container.innerHTML = `<div style="text-align:center; width:100%; padding:20px;">
            <h3>❌ No courses found for "${input}"</h3>
            <p>Try searching for Python, Java, or Cyber Security.</p>
        </div>`;
    }
}
renderCourses();
function sendWhatsApp() {
    let name = document.querySelector('input[name="name"]').value;
    let msg = document.querySelector('textarea[name="message"]').value;
    let myNumber = "919480991301"; // तुझा नंबर इथे टाक
    
    let url = "https://wa.me/" + myNumber + "?text=" 
        + "Name: " + name + "%0a" 
        + "Query: " + msg;
        
    window.open(url, '_blank').focus();
}
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    
    // डॅशबोर्डवर जिथे जिथे डार्क मोड बटन्स आहेत, ती सर्व शोधा
    // (IDs ऐवजी आपण 'class' किंवा 'selector' वापरूया जेणेकरून दोन्ही बटन्स बदलतील)
    const allToggleBtns = document.querySelectorAll('[id="dark-mode-toggle"]');
    
    allToggleBtns.forEach(btn => {
        btn.innerText = targetTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
    
    localStorage.setItem('theme', targetTheme);
}

// पेज लोड झाल्यावर आधीचा मोड चेक करणे
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if(savedTheme === 'dark') {
        setTimeout(() => {
            document.getElementById('dark-mode-toggle').innerText = '☀️ Light Mode';
        }, 100);
    }
}
// --- सेक्शन बदलण्याचे फंक्शन (Dashboard, Profile, Contact साठी) ---
function showSection(sectionId) {
    // १. तुझ्या HTML मधील सर्व मुख्य सेक्शन्सची यादी
    const sections = ['dashboard-content', 'profile-section', 'contact-section'];

    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // २. जर क्लिक केलेला विभाग असेल तर तो दाखवा, नाहीतर लपवा
            // (dashboard-content किंवा profile-section किंवा contact-section मॅच करणे)
            if (id.startsWith(sectionId)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    });

    // ३. जर डॅशबोर्डवर क्लिक केले, तर कोर्सेस पुन्हा रिफ्रेश करणे
    if (sectionId === 'dashboard') {
        renderCourses();
    }
}