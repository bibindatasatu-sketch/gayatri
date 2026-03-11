// 1. PENGATURAN NAVBAR & MENU MOBILE
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = '#ffffffef';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = '#ffffff';
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '20px';
});

// 2. SCROLL REVEAL ANIMATION
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card-feature, .card-unit, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// 3. SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 4. DATA DETAIL UNIT (Update Multi-Foto)
const unitData = {
    "30": {
        title: "Tipe 30/60 (Subsidi)",
        desc: "Hunian nyaman dengan desain minimalis modern yang efisien. Cocok untuk keluarga muda yang mengutamakan kenyamanan dengan budget terjangkau.",
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
            "https://images.unsplash.com/photo-1556911223-e4524330697d?w=800"
        ],
        specs: ["Pondasi: Batu Kali", "Dinding: Batako Plester Aci", "Lantai: Keramik 40x40", "Atap: Baja Ringan", "Listrik: 1300 Watt"],
        wa: "https://wa.me/628123456789?text=Saya%20ingin%20tanya%20detail%20Tipe%2030"
    },
    "36": {
        title: "Tipe 36/72 (Komersil)",
        desc: "Lebih luas, lebih lega. Memiliki sisa lahan di belakang yang bisa dikembangkan menjadi taman atau area dapur tambahan.",
        images: [
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600607687940-497f6a610b17?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800"
        ],
        specs: ["Pondasi: Footplat", "Dinding: Bata Merah", "Lantai: Granit 60x60", "Plafon: Gypsum", "Listrik: 2200 Watt"],
        wa: "https://wa.me/628123456789?text=Saya%20ingin%20tanya%20detail%20Tipe%2036"
    },
    "45": {
        title: "Tipe 45/90 (Premium)",
        desc: "Varian tertinggi dengan 3 Kamar Tidur dan 2 Kamar Mandi. Desain mewah dengan plafon tinggi untuk sirkulasi udara yang jauh lebih baik.",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800"
        ],
        specs: ["Pondasi: Beton Bertulang", "Dinding: Bata Merah Press", "Lantai: Full Granit", "Sanitari: Closet Duduk", "Listrik: 2200 Watt"],
        wa: "https://wa.me/628123456789?text=Halo%20Admin,%20mohon%20info%20brosur%20Tipe%2045/90"
    }
};

// 5. LOGIKA MODAL & SLIDER
const modal = document.getElementById("unitModal");
const slider = document.getElementById("modalSlider");

function openDetail(type) {
    const data = unitData[type];
    if (!data) return;

    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalDesc").innerText = data.desc;
    document.getElementById("modalWaLink").href = data.wa;
    
    // Isi Slider dengan gambar
    slider.innerHTML = data.images.map(img => `<img src="${img}" alt="Foto Unit">`).join('');
    slider.scrollLeft = 0; // Reset posisi slider ke gambar pertama

    // Isi Spesifikasi
    const specsList = document.getElementById("modalSpecs");
    specsList.innerHTML = data.specs.map(s => `<li><i class="fas fa-check-circle"></i> ${s}</li>`).join('');
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Kunci scroll layar utama
}

// Fungsi Navigasi Panah Slider
function moveSlider(direction) {
    const scrollAmount = slider.clientWidth; // Geser sejauh lebar kontainer
    if (direction === 'next') {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Tutup Modal
document.querySelector(".close-modal").onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.onclick = (event) => { 
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    } 
}