// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'body': '#060B28',
                'sidebar': '#060B28',
                'card': '#111C44',
                'card-hover': '#1A2552',
                'nav-active': 'rgba(255, 255, 255, 0.08)',
                'accent-green': '#01B574',
                'accent-brand': '#0075FF',
                'accent-blue': '#0075FF',
                'accent-amber': '#F59E0B',
                'accent-purple': '#4318FF',
                'accent-red': '#E31A1A',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                recta: ['Recta', 'sans-serif'],
            },
        }
    }
}

// Firebase SDKs and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, query, where, orderBy, onSnapshot, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCTdUIf-eUUXuHVCJOK7R7DG9aToeF-96Y",
    authDomain: "fablab-bmk.firebaseapp.com",
    projectId: "fablab-bmk",
    storageBucket: "fablab-bmk.firebasestorage.app",
    messagingSenderId: "1094196382348",
    appId: "1:1094196382348:web:cb912662e010323d1f09a9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.checkAuthState = () => {
    const savedAuth = sessionStorage.getItem('admin_authenticated');
    if (savedAuth !== 'true') return;
    document.body.style.display = 'flex';
    window.initRealtimeListeners();
};

window.checkCustomAuth = async () => {
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;
    const error = document.getElementById('login-error');

    if (user === 'SARA-LADOUY' && pass === 'saracmc2025') {
        sessionStorage.setItem('admin_authenticated', 'true');
        document.getElementById('admin-login-overlay').style.display = 'none';
        window.checkAuthState();
    } else {
        error.style.opacity = '1';
        setTimeout(() => error.style.opacity = '0', 3000);
    }
};

const savedAuth = sessionStorage.getItem('admin_authenticated');
if (savedAuth === 'true') {
    document.getElementById('admin-login-overlay').style.display = 'none';
    window.checkAuthState();
} else {
    document.body.style.display = 'flex';
}

window.initRealtimeListeners = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const q = query(collection(db, "attendance"), where("timestamp", ">=", startOfDay), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (window.renderFirebaseDashboard) window.renderFirebaseDashboard(logs);
    });
};

// ── Mock Data ──
const demoHistory = [
    { name: "Ahmed El Mansouri", date: "2026-04-09", timeIn: "09:15", timeOut: "12:30", rating: 5, comment: "Super séance de prototypage !" },
    { name: "Laila Bennani", date: "2026-04-09", timeIn: "10:05", timeOut: "11:45", rating: 4, comment: "Besoin de plus de filament PLA." },
    { name: "Yassine Tazi", date: "2026-04-08", timeIn: "14:20", timeOut: "17:10", rating: 5, comment: "Découpe laser parfaite." },
    { name: "Siham Alaoui", date: "2026-04-08", timeIn: "09:30", timeOut: "16:00", rating: 3, comment: "Un peu d'attente pour la CNC." }
];

const demoOuvrages = [
    { name: "Ultimaker S5", category: "Impression 3D", status: "Disponible", icon: "🖨️" },
    { name: "Trotec Speedy 400", category: "Découpe Laser", status: "En usage", icon: "⚡" },
    { name: "Roland SRM-20", category: "Fraiseuse CNC", status: "Maintenance", icon: "⚙️" },
    { name: "Creality Ender 3", category: "Impression 3D", status: "Disponible", icon: "🖨️" },
    { name: "Station de Soudure", category: "Électronique", status: "Disponible", icon: "🔌" },
    { name: "Oscilloscope Rigol", category: "Électronique", status: "Disponible", icon: "📉" }
];

let currentView = 'dashboard';

window.switchView = function(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    const target = document.getElementById('view-' + viewId);
    setTimeout(() => target.classList.add('active'), 20);
    document.getElementById('nav-' + viewId).classList.add('active');
    currentView = viewId;
    if (viewId === 'ouvrages') window.renderOuvrages();
}

window.renderFirebaseDashboard = function(logs) {
    const entries = logs.filter(l => l.type === 'in');
    const exits = logs.filter(l => l.type === 'out');
    const userStatus = {};
    logs.slice().reverse().forEach(log => { userStatus[log.userId] = log.type; });
    const presentCount = Object.values(userStatus).filter(s => s === 'in').length;

    document.getElementById('metric-present').textContent = presentCount;
    document.getElementById('metric-total').textContent = entries.length;
    document.getElementById('metric-exits').textContent = exits.length;

    const jl = document.getElementById('journal-list');
    document.getElementById('journal-count').textContent = `${logs.length} événement(s)`;

    if (logs.length === 0) {
        jl.innerHTML = `<div class="px-7 py-10 text-center"><p class="text-[13px] text-white/30 italic">Aucune activité aujourd'hui</p></div>`;
    } else {
        jl.innerHTML = `<div class="max-h-[350px] overflow-y-auto">` + logs.map(l => {
            const isIn = l.type === 'in';
            const time = l.timestamp ? new Date(l.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
            return `
            <div class="journal-entry flex items-center px-7 py-3.5 trow">
                <div class="w-8 h-8 ${isIn ? 'bg-accent-green/10' : 'bg-accent-red/10'} rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <svg class="w-3.5 h-3.5 ${isIn ? 'text-accent-green' : 'text-accent-red'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="${isIn ? 'M11 16l-4-4m0 0l4-4m-4 4h14' : 'M17 16l4-4m0 0l-4-4m4 4H7'}"/>
                    </svg>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-[12px] font-semibold text-white">${l.userName || 'Anonyme'}</p>
                    <p class="text-[9px] text-white/25 font-medium tracking-wide uppercase">${isIn ? 'Entrée' : 'Sortie'} — ${l.objective || 'Visite'}</p>
                </div>
                <span class="text-[11px] text-white/20 font-medium shrink-0">${time}</span>
            </div>`;
        }).join('') + `</div>`;
    }

    const pl = document.getElementById('presence-list');
    const presentUsers = Object.keys(userStatus).filter(uid => userStatus[uid] === 'in');
    if (presentUsers.length === 0) {
        pl.innerHTML = `<div class="px-7 py-10 text-center"><p class="text-[13px] text-white/30 italic">Aucun stagiaire présent</p></div>`;
    } else {
        pl.innerHTML = presentUsers.map(uid => {
            const lastLog = logs.find(l => l.userId === uid && l.type === 'in');
            const userName = lastLog ? lastLog.userName : 'Stagiaire';
            const time = lastLog && lastLog.timestamp ? new Date(lastLog.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
            return `
            <div class="presence-item flex items-center px-7 py-4">
                <div class="w-10 h-10 user-avatar rounded-full flex items-center justify-center text-[11px] font-bold text-white mr-4 shrink-0">${userName[0]}</div>
                <div class="flex-1 min-w-0"><p class="text-[13px] font-semibold text-white truncate">${userName}</p></div>
                <div class="text-right shrink-0">
                    <p class="text-[11px] text-white/30 font-medium">${time}</p>
                    <div class="flex items-center space-x-1 justify-end mt-0.5"><div class="w-1.5 h-1.5 bg-accent-green rounded-full live-dot"></div><span class="text-[9px] text-accent-green font-bold uppercase">Actif</span></div>
                </div>
            </div>`;
        }).join('');
    }
}

window.generateQR = function(type) {
    const area = document.getElementById(type === 'in' ? 'qr-in-area' : 'qr-out-area');
    const uid = crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Math.random().toString(36).substring(2, 10);
    const payload = JSON.stringify({ action: type === 'in' ? 'check_in' : 'check_out', lab: 'CMC_BENI_MELLAL', gate: type === 'in' ? 'GATE_IN' : 'GATE_OUT', id: uid, ts: Date.now() });

    area.innerHTML = `
        <div class="qr-container flex flex-col items-center mb-4"><div id="qr-canvas-${type}"></div></div>
        <p class="text-[11px] text-white/20 font-medium mb-4">ID: ${uid}...</p>
        <button onclick="downloadQR('${type}')" class="btn-download px-5 py-2.5 rounded-xl font-bold text-[12px] flex items-center space-x-2"><span>📥</span><span>Télécharger PNG</span></button>
    `;

    const color = type === 'in' ? '#111C44' : '#E31A1A';
    new QRCode(document.getElementById('qr-canvas-' + type), { text: payload, width: 220, height: 220, colorDark: color, colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
}

window.downloadQR = function(type) {
    const canvas = document.querySelector('#qr-canvas-' + type + ' canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `fablab_gate_${type}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

window.generateReport = function() {
    const entries = demoHistory.length;
    document.getElementById('report-entries').textContent = entries;
    document.getElementById('report-table-body').innerHTML = demoHistory.map(h => `
        <tr class="trow border-b border-white/[0.03]">
            <td class="px-7 py-3.5"><p class="text-[12px] font-semibold text-white">${h.name}</p></td>
            <td class="px-5 py-3.5 text-[12px] text-white/50 font-medium">${h.date}</td>
            <td class="px-5 py-3.5"><span class="text-[11px] font-bold text-accent-green bg-accent-green/10 px-2.5 py-1 rounded-lg">${h.timeIn}</span></td>
            <td class="px-5 py-3.5"><span class="text-[11px] font-bold text-accent-red bg-accent-red/10 px-2.5 py-1 rounded-lg">${h.timeOut}</span></td>
            <td class="px-5 py-3.5"><span class="text-[12px] font-bold text-accent-amber">${'★'.repeat(h.rating)}</span></td>
            <td class="px-5 py-3.5 text-[11px] text-white/30 font-medium truncate">${h.comment || '—'}</td>
        </tr>
    `).join('');
}

window.exportCSV = function() {
    const csv = 'Stagiaire,Date,Entrée,Sortie,Note\n' + demoHistory.map(h => `"${h.name}","${h.date}","${h.timeIn}","${h.timeOut}","${h.rating}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport.csv';
    a.click();
}

window.renderOuvrages = function() {
    const grid = document.getElementById('ouvrages-grid');
    grid.innerHTML = demoOuvrages.map(o => `
        <div class="section-card p-6 hover:border-white/10 transition-all hover:-translate-y-1 cursor-pointer">
            <div class="flex items-start justify-between mb-4"><span class="text-3xl">${o.icon}</span></div>
            <h4 class="text-[14px] font-bold text-white mb-1">${o.name}</h4>
            <p class="text-[11px] text-white/30 font-medium">${o.category}</p>
        </div>`).join('');
}

window.filterOuvrages = function() { window.renderOuvrages(); }

window.showAddModal = function() { alert('Coming soon...'); }

document.addEventListener('DOMContentLoaded', () => {
    if (window.initRealtimeListeners) window.initRealtimeListeners();
    window.renderOuvrages();
    document.getElementById('report-from').value = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    document.getElementById('report-to').value = new Date().toISOString().split('T')[0];
});
