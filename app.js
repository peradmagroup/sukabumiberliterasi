// --- APP LOGIC ---

// DATA SOURCES
const BLOGGER_URL = "https://peradma.blogspot.com";

const agendaData = [
    {
        category: "Kelas Bahasa",
        icon: "fa-language",
        items: [
            { name: "Bahasa Inggris", link: "https://forms.gle/dummy" },
            { name: "Bahasa Mandarin", link: "https://forms.gle/dummy" },
            { name: "Bahasa Prancis", link: "https://forms.gle/dummy" },
            { name: "Bahasa Arab", link: "https://forms.gle/dummy" },
            { name: "Bahasa Sunda", link: "https://forms.gle/dummy" }
        ]
    },
    {
        category: "Kolaborasi",
        icon: "fa-users",
        items: [
            { name: "Literasi di Sukabumi CFD", link: "https://forms.gle/dummy" }
        ]
    },
    {
        category: "Perpustakaan Cisarua",
        icon: "fa-book-open",
        items: [
            { name: "Junam", link: "https://forms.gle/dummy" },
            { name: "Kelas AI", link: "https://forms.gle/dummy" },
            { name: "Yoga", link: "https://forms.gle/dummy" },
            { name: "Friday Bibliophile", link: "https://forms.gle/dummy" },
            { name: "Pokjar", link: "https://forms.gle/dummy" }
        ]
    },
    {
        category: "Roadshow & Event Besar",
        icon: "fa-truck-fast",
        items: [
            { name: "DuBac Go To School", link: "https://forms.gle/dummy" },
            { name: "NGASAMBEL", link: "https://forms.gle/dummy" }
        ]
    }
];

const mitraData = [
    { name: "Perpustakaan Cisarua", type: "Perpustakaan Kelurahan", lat: -6.9147, lng: 106.9278 },
    { name: "TBM Saluyu", type: "Taman Bacaan", lat: -6.9247, lng: 106.9378 },
    { name: "Komunitas Sukabumi Menulis", type: "Komunitas", lat: -6.9300, lng: 106.9100 }
];

const mockLiveAduanData = [
    { name: "A***n", type: "saran", time: "10 menit yang lalu", message: "Mohon diperbanyak kelas bahasa di akhir pekan." },
    { name: "R***a", type: "aduan", time: "1 jam yang lalu", message: "Minat baca anak di kelurahan kami sangat kurang, tolong ada roadshow kesini." }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Splash Screen Logic
    setTimeout(() => {
        document.getElementById("splash-screen").classList.remove("active");
        document.getElementById("login-screen").classList.add("active");
    }, 2000);

    // 2. Login Logic
    document.getElementById("btn-login-google").addEventListener("click", () => {
        // Mock Login
        document.getElementById("login-screen").classList.remove("active");
        document.getElementById("main-screen").classList.add("active");
        
        // Initialize Map after entering main screen so it renders correctly
        setTimeout(initMap, 300);
    });

    document.getElementById("btn-logout").addEventListener("click", () => {
        document.getElementById("main-screen").classList.remove("active");
        document.getElementById("login-screen").classList.add("active");
    });

    // 3. Navigation Logic
    const navItems = document.querySelectorAll(".nav-item");
    const slides = document.querySelectorAll(".slide");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove("active"));
            slides.forEach(slide => slide.classList.remove("active-slide"));
            
            // Add active class to clicked
            item.classList.add("active");
            const targetId = item.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active-slide");

            // Fix map rendering bug if tab 3 is clicked
            if(targetId === "slide-3" && map) {
                setTimeout(() => { map.invalidateSize(); }, 100);
            }
        });
    });

    // 4. Render Info Literasi (Slide 1)
    renderInfoFeed();

    // 5. Render Agenda (Slide 2)
    renderAgenda();

    // 6. Handle Form (Slide 4)
    document.getElementById("consultation-form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Ambil data form
        const typeSelect = e.target.querySelector("select");
        const nameInput = e.target.querySelector("input[type='text']");
        const messageInput = e.target.querySelector("textarea");
        
        const typeText = typeSelect.options[typeSelect.selectedIndex].text;
        
        // Sensor nama untuk privasi (contoh: Budi -> B***i)
        let name = nameInput.value;
        if(name.length > 2) {
            name = name.charAt(0) + "***" + name.charAt(name.length - 1);
        }

        // Tambahkan ke data live (paling atas)
        mockLiveAduanData.unshift({
            name: name,
            type: typeText,
            time: "Baru saja",
            message: messageInput.value
        });

        // Re-render
        renderLiveAduan();

        alert("Pesan berhasil dikirim dan ditambahkan ke Live Aduan Publik!");
        e.target.reset();
    });

    // 7. Render Live Aduan (Slide 4)
    renderLiveAduan();
});

// --- RENDER FUNCTIONS ---

async function renderInfoFeed() {
    const container = document.getElementById("info-feed");
    container.innerHTML = '<div class="loading-state"><i class="fa-solid fa-spinner fa-spin"></i> Memuat dari Blogger...</div>';

    try {
        const response = await fetch(`${BLOGGER_URL}/feeds/posts/default?alt=json`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        
        container.innerHTML = ""; // Bersihkan loader
        
        if (!data.feed || !data.feed.entry || data.feed.entry.length === 0) {
            container.innerHTML = '<div class="loading-state">Belum ada berita.</div>';
            return;
        }

        data.feed.entry.forEach(post => {
            const title = post.title.$t;
            
            // Format Tanggal
            const pubDate = new Date(post.published.$t);
            const dateStr = pubDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
            
            // Ambil Ringkasan dari Konten HTML
            const htmlContent = post.content ? post.content.$t : (post.summary ? post.summary.$t : "");
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlContent;
            let summary = tempDiv.textContent || tempDiv.innerText || "";
            if (summary.length > 100) summary = summary.substring(0, 100) + "...";
            
            // Kategori (Tag)
            let tag = "Info";
            let tagColor = "badge-blue";
            if (post.category && post.category.length > 0) {
                tag = post.category[0].term;
                if (tag.toLowerCase().includes("berita") || tag.toLowerCase().includes("kegiatan")) {
                    tagColor = "badge-green";
                }
            }
            
            // Link ke Artikel Asli
            let link = "#";
            if(post.link) {
                const alternateLink = post.link.find(l => l.rel === "alternate");
                if (alternateLink) link = alternateLink.href;
            }

            const card = document.createElement("a");
            card.className = "card";
            card.href = link;
            card.target = "_blank";
            card.style.display = "block";
            card.style.textDecoration = "none";
            card.style.color = "inherit";
            
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <span class="badge ${tagColor}">${tag}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${dateStr}</span>
                </div>
                <h3 style="margin-bottom: 6px;">${title}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${summary}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching blogger data:", error);
        container.innerHTML = '<div class="loading-state" style="color:var(--danger)">Gagal memuat berita. Pastikan koneksi internet lancar atau URL blog benar.</div>';
    }
}

function renderAgenda() {
    const container = document.getElementById("agenda-container");
    container.innerHTML = "";

    agendaData.forEach((section, index) => {
        const item = document.createElement("div");
        item.className = "accordion-item";
        
        let activitiesHtml = "";
        section.items.forEach(act => {
            activitiesHtml += `
                <div class="activity-item">
                    <div class="activity-info">
                        <h4>${act.name}</h4>
                    </div>
                    <a href="${act.link}" target="_blank" class="btn-small">Daftar</a>
                </div>
            `;
        });

        item.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion(this)">
                <span><i class="fa-solid ${section.icon}" style="margin-right:8px; color:var(--primary)"></i> ${section.category}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="accordion-content">
                <div class="activity-list">
                    ${activitiesHtml}
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Global Accordion Toggle
window.toggleAccordion = function(element) {
    const parent = element.parentElement;
    parent.classList.toggle("open");
};

function renderLiveAduan() {
    const container = document.getElementById("aduan-list");
    if (!container) return;
    
    container.innerHTML = "";
    
    mockLiveAduanData.forEach(aduan => {
        const item = document.createElement("div");
        item.className = "aduan-item";
        item.innerHTML = `
            <div class="aduan-item-header">
                <span class="aduan-name">${aduan.name}</span>
                <span class="aduan-time">${aduan.time}</span>
            </div>
            <span class="aduan-type">${aduan.type}</span>
            <p class="aduan-message">"${aduan.message}"</p>
        `;
        container.appendChild(item);
    });
}

// --- MAP LOGIC ---
let map = null;
function initMap() {
    if(map !== null) return; // Already initialized

    // Sukabumi coordinates approx: -6.9278, 106.9300
    map = L.map('literacy-map').setView([-6.9278, 106.9300], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const listContainer = document.getElementById("mitra-list");
    listContainer.innerHTML = "";

    mitraData.forEach(mitra => {
        // Add Marker
        L.marker([mitra.lat, mitra.lng]).addTo(map)
            .bindPopup(`<b>${mitra.name}</b><br>${mitra.type}`);

        // Add to List UI
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #E0E7FF; color: var(--primary); display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-building-user"></i>
                </div>
                <div>
                    <h4 style="margin-bottom: 2px;">${mitra.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${mitra.type}</p>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}
