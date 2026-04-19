// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'midnight-blue': '#133853',
                'primary-blue-top': '#2B7FFF',
                'primary-blue-bottom': '#1A66FF',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'main-gradient': 'linear-gradient(to bottom, #BDE3F2 0%, #E2F1F8 40%, #FFFFFF 100%)',
                'button-gradient': 'linear-gradient(to bottom, #2B7FFF 0%, #1A66FF 100%)',
            },
        }
    }
}

// Firebase SDKs and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, OAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, serverTimestamp, query, where, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCTdUIf-eUUXuHVCJOK7R7DG9aToeF-96Y",
    authDomain: "fablab-bmk.firebaseapp.com",
    projectId: "fablab-bmk",
    storageBucket: "fablab-bmk.firebasestorage.app",
    messagingSenderId: "1094196382348",
    appId: "1:1094196382348:web:cb912662e010323d1f09a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Expose to window for traditional script access
window.fbAuth = auth;
window.fbDb = db;
window.googleProvider = new GoogleAuthProvider();
window.microsoftProvider = new OAuthProvider('microsoft.com');
window.fbActions = { onAuthStateChanged, signOut, GoogleAuthProvider, OAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setDoc, getDoc, addDoc, doc, collection, serverTimestamp, query, where, orderBy, limit, onSnapshot };

// Global user state
let currentUser = {};
let isUserInLab = false;
let currentRating = 0;
let isProfileEditing = false;

// Data with options for 2nd year
const trainingData = {
    "digital et intelligence artificiel": {
        "Technicien Spécialisé": [
            { name: "Infrastructure Digitale", options: ["Systèmes et Réseaux", "Cloud Computing", "Cybersécurité"] },
            { name: "Développement Digital", options: ["Mobile", "Web Fullstack"] },
            { name: "Marketing Digital Et Communication", options: ["Web Marketer"] }
        ],
        "Technicien": [{ name: "N", options: [] }],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Agriculture": {
        "Technicien Spécialisé": [
            { name: "Agriculture De Précision", options: ["N"] },
            { name: "Management Des Exploitations Agricoles", options: ["Commercialisation des Produits Agricoles (Agrobusiness)", "Gestion des entreprises et Coopératives Agricoles"] },
            { name: "Techniques Agricoles", options: ["Agriculture Biologique", "Gestion des Sols et systèmes d'Irrigation", "Production végétale"] }
        ],
        "Technicien": [{ name: "N", options: [] }],
        "Qualification": [{ name: "Opérateur Agricole", options: ["N"] }]
    },
    "Agro-Industrie": {
        "Technicien Spécialisé": [{ name: "Transformation et valorisation des plantes Aromatiques et médicinales", options: ["N"] }],
        "Technicien": [{ name: "N", options: [] }],
        "Qualification": [{ name: "N", options: [] }]
    },
    "BTP": {
        "Technicien Spécialisé": [
            { name: "Géomètre Topographe", options: ["N"] },
            { name: "Génie Civil", options: ["Génie Civil option Travaux Publics", "Génie Civil option Laboratoire BTP"] }
        ],
        "Technicien": [{ name: "Dessinateur Projeteur En Bâtiment", options: ["Bâtiment option Métreur", "Bâtiment option Projeteur"] }],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Industrie": {
        "Technicien Spécialisé": [
            { name: "Diagnostic Et Électronique Embarquée Automobile", options: ["N"] },
            { name: "Qualité Hygiène Sécurité Et Environnement (Qhse)", options: ["N"] }
        ],
        "Technicien": [{ name: "Electromécanique des engins motorisés", options: ["Electromécanique des engins motorisés option Machinisme agricole", "Electromécanique des engins motorisés option Automobile"] }],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Tourisme Hôtellerie Restauration": {
        "Technicien Spécialisé": [
            { name: "Management Touristique", options: ["E-Travel Agency", "Management des destinations durables"] },
            { name: "Management hôtelier", options: ["Hébergement et Réception"] }
        ],
        "Technicien": [
            { name: "Arts culinaires", options: ["Cuisine Gastronomique", "Pâtisserie-Chocolaterie"] },
            { name: "Service de Restauration ''Arts de table''", options: ["N"] }
        ],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Logistique et Transport": {
        "Technicien Spécialisé": [{ name: "Exploitation", options: ["Logistique", "Transport"] }],
        "Technicien": [
            { name: "Moniteur Auto-Ecole", options: ["N"] },
            { name: "Logistique", options: ["N"] }
        ],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Gestion et Commerce": {
        "Technicien Spécialisé": [{ name: "Gestion des Entreprises", options: ["Comptabilité et Finance", "Commerce et Marketing", "Ressources Humaines"] }],
        "Technicien": [{ name: "Assistant Administratif", options: ["Comptabilité", "Commerce", "Gestion"] }],
        "Qualification": [{ name: "N", options: [] }]
    },
    "Artisanat": {
        "Technicien Spécialisé": [{ name: "N", options: [] }],
        "Technicien": [
            { name: "Menuiserie D'Art", options: ["N"] },
            { name: "Tapisserie", options: ["N"] }
        ],
        "Qualification": [
            { name: "Couture traditionnelle", options: ["N"] },
            { name: "Tissage Traditionnel", options: ["N"] }
        ]
    },
    "AIG": {
        "Technicien Spécialisé": [{ name: "infographie prépresse", options: ["N"] }],
        "Technicien": [{ name: "N", options: [] }],
        "Qualification": [{ name: "N", options: [] }]
    }
};

window.updateFiliereOptions = function() {
    const pole = document.getElementById('pole-select').value;
    const niveau = document.getElementById('niveau-select').value;
    const filiereSelect = document.getElementById('filiere-select');

    filiereSelect.innerHTML = '';

    if (pole && niveau && trainingData[pole] && trainingData[pole][niveau]) {
        const filieres = trainingData[pole][niveau];
        const placeholder = document.createElement('option');
        placeholder.value = "";
        placeholder.innerText = "Sélectionner votre filière";
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.hidden = true;
        filiereSelect.appendChild(placeholder);

        filieres.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.name;
            opt.innerText = (f.name === "N" ? "Aucune filière disponible" : f.name);
            filiereSelect.appendChild(opt);
        });
    } else {
        const opt = document.createElement('option');
        opt.value = "";
        opt.innerText = "selectionner votre pole";
        opt.disabled = true;
        opt.selected = true;
        filiereSelect.appendChild(opt);
    }
    window.toggleOptionField();
}

window.toggleOptionField = function() {
    const pole = document.getElementById('pole-select').value;
    const niveau = document.getElementById('niveau-select').value;
    const filiereName = document.getElementById('filiere-select').value;
    const year = document.getElementById('year-select').value;

    const container = document.getElementById('option-container');
    const select = document.getElementById('option-select');

    if (year === "2ème année" && pole && niveau && filiereName) {
        const filiere = trainingData[pole][niveau].find(f => f.name === filiereName);
        if (filiere && filiere.options && filiere.options.length > 0) {
            select.innerHTML = '<option value="" disabled selected hidden>Sélectionner une option</option>';
            filiere.options.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o;
                opt.innerText = o;
                select.appendChild(opt);
            });
            container.classList.remove('hidden');
            return;
        }
    }
    container.classList.add('hidden');
    select.innerHTML = '';
}

window.validateStagiaireForm = function() {
    const prenom = document.querySelector('#stagiaire-screen input[placeholder="Entrez Votre Prenom"]').value;
    const nom = document.querySelector('#stagiaire-screen input[placeholder="Entrez Votre Nom"]').value;
    const cin = document.getElementById('cin-signup-input').value;
    const cef = document.getElementById('cef-signup-input').value;
    const pole = document.getElementById('pole-select').value;
    const niveau = document.getElementById('niveau-select').value;
    const filiere = document.getElementById('filiere-select').value;
    const year = document.getElementById('year-select').value;
    const option = document.getElementById('option-select').value;
    const tel = document.getElementById('tel-input').value;
    const email = document.getElementById('email-input').value;

    currentUser = { prenom, nom, cin, cef, pole, niveau, filiere, year, option, tel, email };
    showCreateAccountScreen();
}

window.showRoleSelection = function() { setScreen('role-selection-screen'); }
window.showHomeScreen = function() { setScreen('home-screen'); }
window.showStagiaireScreen = function() { setScreen('stagiaire-screen'); }
window.showCharteScreen = function() { setScreen('charte-screen'); }

window.showLoginScreen = function() { setScreen('login-screen'); }
window.showDashboardScreen = function() { setScreen('dashboard-screen'); }

function setScreen(screenId) {
    const screens = ['home-screen', 'role-selection-screen', 'stagiaire-screen', 'charte-screen', 'login-screen', 'dashboard-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (id === screenId) {
            el.classList.remove('hidden');
            el.classList.add('flex');
            setTimeout(() => {
                el.classList.remove('opacity-0');
                el.classList.add('opacity-100');
            }, 10);
        } else {
            el.classList.add('opacity-0');
            el.classList.remove('opacity-100');
            setTimeout(() => {
                if (el.classList.contains('opacity-0')) {
                    el.classList.add('hidden');
                    el.classList.remove('flex');
                }
            }, 300);
        }
    });
}

window.selectRole = function(role) {
    sessionStorage.setItem('pending_role', role);
    showHomeScreen();
}

window.showLoginScreenWithFeedback = function(btn) {
    btn.classList.add('bg-green-500');
    setTimeout(() => {
        btn.classList.remove('bg-green-500');
        showLoginScreen();
    }, 150);
}

window.handleAdminLogin = async function() {
    try {
        const { signInWithRedirect } = window.fbActions;
        const auth = window.fbAuth;
        const provider = window.googleProvider;

        sessionStorage.setItem('auth_mode', 'admin_login');
        await signInWithRedirect(auth, provider);
    } catch (err) {
        console.error("Admin Auth Error:", err);
        alert("Erreur d'authentification : " + err.message);
    }
}

window.handleOutlookAuth = async function(mode = 'login') {
    try {
        const { signInWithRedirect } = window.fbActions;
        const auth = window.fbAuth;
        const provider = window.microsoftProvider;

        if (window.location.protocol === 'file:') {
            alert("Attention : Outlook Authentication ne fonctionne pas avec le protocole 'file://'.");
            return;
        }

        sessionStorage.setItem('auth_mode', mode);
        await signInWithRedirect(auth, provider);
    } catch (err) {
        console.error("Outlook Auth Error:", err);
        alert("Erreur d'authentification Microsoft : " + err.message);
    }
}

window.handleGoogleAuth = async function(mode = 'login') {
    try {
        const { signInWithRedirect } = window.fbActions;
        const auth = window.fbAuth;
        const provider = window.googleProvider;

        if (window.location.protocol === 'file:') {
            alert("Attention : Google Authentication ne fonctionne pas avec le protocole 'file://'.");
            return;
        }

        sessionStorage.setItem('auth_mode', mode);
        await signInWithRedirect(auth, provider);
    } catch (err) {
        console.error("Google Auth Error:", err);
        if (err.code === 'auth/unauthorized-domain') {
            alert("Erreur : Ce domaine n'est pas autorisé dans Firebase Console.");
        } else {
            alert("Erreur d'authentification : " + err.message);
        }
    }
}

window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('text-[#3B5FE6]');
        el.classList.add('text-midnight-blue/40');
    });

    document.getElementById('tab-' + tabId).classList.remove('hidden');
    if (tabId === 'scan') {
        document.getElementById('tab-' + tabId).classList.add('flex');
        startScanner();
    } else {
        stopScanner();
    }
    if (tabId === 'my-project') {
        document.getElementById('tab-' + tabId).classList.add('flex');
    }
    if (tabId === 'profile') {
        document.getElementById('tab-' + tabId).classList.add('flex');
        updateProfileView();
    }

    document.getElementById('nav-' + tabId).classList.add('text-[#3B5FE6]');
    document.getElementById('nav-' + tabId).classList.remove('text-midnight-blue/40');
}

let html5QrCode = null;

function startScanner() {
    if (html5QrCode && html5QrCode.isScanning) return;
    const placeholder = document.getElementById('scanner-placeholder');
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
    ).then(() => {
        placeholder.classList.add('hidden');
    }).catch(err => {
        console.error("Scanner error:", err);
        placeholder.classList.remove('hidden');
        placeholder.innerHTML = `<p class="text-white text-xs px-6 text-center">Erreur caméra : ${err}</p>`;
    });
}

function stopScanner() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            document.getElementById('scanner-placeholder').classList.remove('hidden');
        }).catch(err => console.error("Stop error:", err));
    }
}

function onScanSuccess(decodedText, decodedResult) {
    stopScanner();
    if (!isUserInLab) {
        if (currentUser.role === 'stagiaire') {
            showScanObjectiveModal();
        } else {
            isUserInLab = true;
            updateScanUI();
            alert("ENTRÉE RÉUSSIE ! Bienvenue dans le Lab.");
            switchTab('my-project');
        }
    } else {
        showFeedbackModal();
    }
}

window.showScanObjectiveModal = function() {
    const modal = document.getElementById('scan-objective-modal');
    const content = document.getElementById('scan-objective-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

window.setScanObjective = function(val, btn) {
    scanSelectedObjective = val;
    document.querySelectorAll('.scan-obj-btn').forEach(b => {
        b.classList.remove('border-midnight-blue', 'bg-blue-50', 'ring-1', 'ring-midnight-blue');
        b.classList.add('border-gray-100', 'bg-gray-50');
    });
    btn.classList.add('border-midnight-blue', 'bg-blue-50', 'ring-1', 'ring-midnight-blue');
    btn.classList.remove('border-gray-100', 'bg-gray-50');
    const branch = document.getElementById('scan-project-branch');
    if (val === 'Projet en cours') {
        branch.classList.remove('hidden');
    } else {
        branch.classList.add('hidden');
    }
}

window.finalizeScanIn = async function() {
    if (!scanSelectedObjective) {
        alert("Veuillez sélectionner un objectif.");
        return;
    }
    try {
        const { addDoc, collection, serverTimestamp } = window.fbActions;
        const db = window.fbDb;
        const logEntry = {
            userId: currentUser.uid || 'guest',
            userName: `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim(),
            type: 'in',
            objective: scanSelectedObjective,
            timestamp: serverTimestamp()
        };
        if (scanSelectedObjective === 'Projet en cours') {
            logEntry.project = document.getElementById('scan-project-name').value;
            logEntry.companion = document.getElementById('scan-project-companion').value;
            logEntry.phase = document.getElementById('scan-project-phase').value;
        }
        await addDoc(collection(db, "attendance"), logEntry);
        isUserInLab = true;
        updateScanUI();
        const modal = document.getElementById('scan-objective-modal');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            alert("ENTRÉE RÉUSSIE !");
            switchTab('my-project');
        }, 300);
    } catch (error) {
        alert("Scan error: " + error.message);
    }
}

function updateScanUI() {
    const banner = document.getElementById('scan-status-banner');
    const statusText = document.getElementById('scan-status-text');
    if (isUserInLab) {
        banner.classList.remove('bg-green-500');
        banner.classList.add('bg-red-500');
        statusText.innerText = 'SORTIE (SCAN OUT)';
    } else {
        banner.classList.remove('bg-red-500');
        banner.classList.add('bg-green-500');
        statusText.innerText = 'ENTRÉE (SCAN IN)';
    }
}

window.showFeedbackModal = function() {
    const modal = document.getElementById('feedback-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

window.setRating = function(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((star, index) => {
        star.classList.toggle('text-yellow-400', index < rating);
        star.classList.toggle('text-gray-300', index >= rating);
    });
}

window.submitFeedback = function() {
    if (currentRating === 0) {
        alert("Veuillez donner une note.");
        return;
    }
    alert("Merci pour votre feedback !");
    isUserInLab = false;
    updateScanUI();
    document.getElementById('feedback-modal').classList.add('opacity-0');
    setTimeout(() => {
        document.getElementById('feedback-modal').classList.add('hidden');
        switchTab('scan');
    }, 300);
}

function updateProfileView() {
    if (!currentUser.prenom) return;
    document.getElementById('profile-display-name').innerText = `${currentUser.prenom} ${currentUser.nom}`;
    document.getElementById('profile-level-label').innerText = currentUser.niveau || 'Stagiaire';
}

window.toggleProfileEdit = function() {
    isProfileEditing = !isProfileEditing;
    // ... logic ...
}

window.saveProfileChanges = function() {
    updateProfileView();
    toggleProfileEdit();
    alert("Profil mis à jour !");
}

const initAuth = async () => {
    const auth = window.fbAuth;
    const db = window.fbDb;
    if (!auth || !db) { setTimeout(initAuth, 100); return; }
    const { onAuthStateChanged, getDoc, doc, getRedirectResult, setDoc, serverTimestamp } = window.fbActions;
    try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            const user = result.user;
            const mode = sessionStorage.getItem('auth_mode');
            const userSnap = await getDoc(doc(db, "users", user.uid));
            if (mode === 'admin_login' && userSnap.exists() && userSnap.data().role === 'admin') {
                window.location.href = "https://fablab-cmc.web.app";
            }
        }
    } catch (err) { console.error("Redirect Error:", err); }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userSnap = await getDoc(doc(db, "users", user.uid));
            if (userSnap.exists()) {
                currentUser = userSnap.data();
                showDashboardScreen();
                switchTab('scan');
            }
        } else {
            currentUser = {};
            isUserInLab = false;
            showHomeScreen();
        }
    });
};

window.addEventListener('load', initAuth);

window.handleProjectImages = function(input) {
    const previewContainer = document.getElementById('project-images-preview');
    const files = input.files;
    previewContainer.innerHTML = '';
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = "rounded-2xl overflow-hidden shadow-md h-full";
            div.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
            previewContainer.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}
