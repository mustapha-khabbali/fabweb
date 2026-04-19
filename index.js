import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCTdUIf-eUUXuHVCJOK7R7DG9aToeF-96Y",
    authDomain: "fablab-bmk.firebaseapp.com",
    projectId: "fablab-bmk",
    storageBucket: "fablab-bmk.firebasestorage.app",
    messagingSenderId: "1094196382348",
    appId: "1:1094196382348:web:cb912662e010323d1f09a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// Global State
let currentUser = {};
let isUserInLab = false;
let currentRating = 0;
let scanSelectedObjective = '';

// Auth Functions
window.handleGoogleAuth = async (mode = 'login') => {
    sessionStorage.setItem('auth_mode', mode);
    await signInWithRedirect(auth, googleProvider);
};

window.handleOutlookAuth = async (mode = 'login') => {
    sessionStorage.setItem('auth_mode', mode);
    await signInWithRedirect(auth, microsoftProvider);
};

window.handleAdminLogin = async () => {
    sessionStorage.setItem('auth_mode', 'admin_login');
    await signInWithRedirect(auth, googleProvider);
};

// UI Navigation
window.showHomeScreen = () => setScreen('home-screen');
window.showRoleSelection = () => setScreen('role-selection-screen');
window.showStagiaireScreen = () => setScreen('stagiaire-screen');

function setScreen(id) {
    const screens = ['home-screen', 'role-selection-screen', 'stagiaire-screen', 'dashboard-screen'];
    screens.forEach(s => {
        const el = document.getElementById(s);
        if (el) {
            if (s === id) {
                el.classList.remove('hidden');
                setTimeout(() => el.classList.remove('opacity-0'), 10);
            } else {
                el.classList.add('opacity-0');
                setTimeout(() => el.classList.add('hidden'), 300);
            }
        }
    });
}

// Registration Logic
window.validateStagiaireForm = () => {
    const inputs = document.querySelectorAll('#stagiaire-screen input');
    currentUser.prenom = inputs[0].value;
    currentUser.nom = inputs[1].value;
    currentUser.cin = document.getElementById('cin-signup-input').value;
    currentUser.cef = document.getElementById('cef-signup-input').value;
    currentUser.role = 'stagiaire';
    
    const modal = document.getElementById('login-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
};

window.closeLoginModal = () => {
    const modal = document.getElementById('login-modal');
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
};

// Auth State Observer
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            currentUser = docSnap.data();
            setScreen('dashboard-screen');
        } else {
            // New user registration
            const mode = sessionStorage.getItem('auth_mode');
            if (mode === 'signup') {
                await setDoc(doc(db, "users", user.uid), {
                    ...currentUser,
                    uid: user.uid,
                    email: user.email,
                    createdAt: serverTimestamp()
                });
                alert("Inscription réussie !");
                location.reload();
            } else {
                setScreen('role-selection-screen');
            }
        }
    } else {
        setScreen('home-screen');
    }
});

// Admin Redirect Result
getRedirectResult(auth).then(async (result) => {
    if (result && result.user) {
        const mode = sessionStorage.getItem('auth_mode');
        if (mode === 'admin_login') {
            const userSnap = await getDoc(doc(db, "users", result.user.uid));
            if (userSnap.exists() && userSnap.data().role === 'admin') {
                window.location.href = "https://fablab-cmc.web.app";
            }
        }
    }
});

// Tab Switching
window.switchTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.add('opacity-40'));
    document.getElementById('nav-' + tabId).classList.remove('opacity-40');
};
