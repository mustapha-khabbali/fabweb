import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

let currentUser = {};
let isUserInLab = false;

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            currentUser = docSnap.data();
            setScreen('dashboard-screen');
        } else {
            setScreen('role-selection-screen');
        }
    } else {
        setScreen('home-screen');
    }
});

// Redirect result handling
getRedirectResult(auth).then(async (result) => {
    if (result && result.user) {
        const mode = sessionStorage.getItem('auth_mode');
        if (mode === 'admin_login') {
            const userSnap = await getDoc(doc(db, "users", result.user.uid));
            if (userSnap.exists() && userSnap.data().role === 'admin') {
                window.location.href = "https://fablab-cmc.web.app";
            } else {
                alert("Accès refusé. Vous n'êtes pas un administrateur.");
            }
        }
    }
}).catch(console.error);

// Other helper functions (switchTab, startScanner, etc.) would go here
// I'll keep the essentials for now to ensure the auth flow works.
