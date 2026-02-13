// Build gallery data from actual files in images/ and videos/
const galleryData = [];

// Filenames discovered in the workspace (keadaan saat ini)
const imageFiles = [
    "1.jpg","10.webp","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg",
    "2.jpg","20.jpg","21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg",
    "3.jpg","30.jpg","31.jpg","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg",
    "4.jpg","40.jpg","41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg",
    "5.jpg","50.jpg","51.jpg","52.jpg","53.jpg","54.jpg","55.jpg","56.jpg","57.jpg","58.jpg","59.jpg",
    "6.jpg","60.jpg","61.jpg","62.jpg","63.jpg","7.jpg","8.jpg","9.jpg"
];

const videoFiles = [
    "01.mp4","010.mp4","011.mp4","012.mp4","013.mp4","014.mp4","015.mp4","016.mp4","017.mp4","018.mp4","019.mp4",
    "02.mp4","020.mp4","021.mp4","022.mp4","023.mp4","024.mp4","025.mp4","026.mp4","027.mp4","028.mp4","029.mp4",
    "03.mp4","030.mp4","031.mp4","032.mp4","04.mp4","05.mp4","06.mp4","07.mp4","08.mp4","09.mp4","33.mp4","34.mp4"
];

function extractNumber(name) {
    const m = name.match(/(\d+)/);
    return m ? parseInt(m[0], 10) : 0;
}

imageFiles.sort((a, b) => extractNumber(a) - extractNumber(b));
videoFiles.sort((a, b) => extractNumber(a) - extractNumber(b));

for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    galleryData.push({
        id: i + 1,
        type: 'photo',
        title: `Foto ${i + 1}`,
        src: `images/${file}`,
        thumb: `images/${file}`
    });
}

for (let i = 0; i < videoFiles.length; i++) {
    const file = videoFiles[i];
    const base = file.replace(/\.[^/.]+$/, '');
    galleryData.push({
        id: imageFiles.length + i + 1,
        type: 'video',
        title: `Video ${i + 1}`,
        src: `videos/${file}`,
        thumb: `images/${base}-thumb.jpg`
    });
}

let filteredData = [...galleryData];
let currentLightboxIndex = 0;

// Initialize gallery saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {

    renderGallery();
    setupEventListeners();

    // ====== 🎵 AUDIO FIX (TAMBAHAN) ======
    const audio = document.getElementById("galleryAudio");

    if(!audio) return;

    audio.volume = 0.7;

    // lanjut dari waktu terakhir
    const savedTime = localStorage.getItem("musicTime");
    if(savedTime){
        audio.currentTime = savedTime;
    }

    // simpan waktu lagu
    setInterval(()=>{
        localStorage.setItem("musicTime", audio.currentTime);
    },1000);

    // autoplay trick
    audio.muted = true;

    audio.play().then(()=>{
        audio.muted = false;
    }).catch(()=>{
        const resume = () => {
            audio.play().catch(()=>{});
            document.removeEventListener("click", resume);
        };
        document.addEventListener("click", resume);
    });

});
// ====== END AUDIO FIX ======

// Render gallery items
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.querySelector('.empty-state');
    
    galleryGrid.innerHTML = '';
    
    if (filteredData.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    filteredData.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.index = index;

    const mediaElement = `<img src="${item.thumb}" alt="${item.title}" loading="lazy">`;
    const icon = item.type === 'video' ? '▶️' : '📷';

    div.innerHTML = `
        ${mediaElement}
        <div class="gallery-item-overlay">${icon}</div>
    `;

    div.addEventListener('click', () => openLightbox(index));
    return div;
}

function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            if (filter === 'all') {
                filteredData = [...galleryData];
            } else {
                filteredData = galleryData.filter(item => item.type === filter);
            }

            renderGallery();
        });
    });

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });

    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;

    const item = filteredData[index];
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let mediaHTML = item.type === 'video'
        ? `<video src="${item.src}" controls autoplay></video>`
        : `<img src="${item.src}" alt="${item.title}">`;

    lightboxMedia.innerHTML = mediaHTML;
    lightboxCounter.textContent = `${index + 1} / ${filteredData.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    let newIndex = currentLightboxIndex + direction;

    if (newIndex < 0) newIndex = filteredData.length - 1;
    if (newIndex >= filteredData.length) newIndex = 0;

    currentLightboxIndex = newIndex;

    const item = filteredData[newIndex];
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let mediaHTML = item.type === 'video'
        ? `<video src="${item.src}" controls autoplay></video>`
        : `<img src="${item.src}" alt="${item.title}">`;

    lightboxMedia.innerHTML = mediaHTML;
    lightboxCounter.textContent = `${newIndex + 1} / ${filteredData.length}`;
}
