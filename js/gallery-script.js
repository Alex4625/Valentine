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


// ====== GOOGLE DRIVE LINKS ======
const videoLinks = {
"01.mp4":"https://drive.google.com/uc?export=view&id=1Y9Vf3bCoB9fHYh4MZZTtnWUeTKySrk26",
"02.mp4":"https://drive.google.com/uc?export=view&id=1_eFlicJvvQzT4VGWKDP1mTz4dRxSgdTD",
"03.mp4":"https://drive.google.com/uc?export=view&id=19Gkc3D5m6mORT9_sot0_j05qoAEwlK-C",
"04.mp4":"https://drive.google.com/uc?export=view&id=1hvRHZp9hOajEDoWR6xIqjwa0HQ8uHIGU",
"05.mp4":"https://drive.google.com/uc?export=view&id=1Cf9htqYM-GKxhkr05eg288_eCrXQK4hQ",
"06.mp4":"https://drive.google.com/uc?export=view&id=1tcrRh9cLaG2p1d8SXjdU-jxq8lVBT-Br",
"07.mp4":"https://drive.google.com/uc?export=view&id=1We4LyjBtRen5sOEdG1aK9Ihjv9u7e5iV",
"08.mp4":"https://drive.google.com/uc?export=view&id=1o4_6-gXuhA9ZBh1bT7uZAGceHo2M9iXQ",
"09.mp4":"https://drive.google.com/uc?export=view&id=1NbICd0CydpR-jG8GtP4oG5Yl1z0lYR_C",
"010.mp4":"https://drive.google.com/uc?export=view&id=1SmkcHglGP_xV9VYAZIe9Rq4U8Uv0yRpj",
"011.mp4":"https://drive.google.com/uc?export=view&id=1TuLcwr5BF63zrIJ409iXU7tfEsd90OLM",
"012.mp4":"https://drive.google.com/uc?export=view&id=1BpNxcyYb5FLMQuJWRXPHDTOalEz_sOcK",
"013.mp4":"https://drive.google.com/uc?export=view&id=1QupFxdK6NxwVTfCN7FZ4eOG4qwDMHDMv",
"014.mp4":"https://drive.google.com/uc?export=view&id=12sK6pxZHQq59TJi3xXBCNMVlK2Ce1Fxo",
"015.mp4":"https://drive.google.com/uc?export=view&id=1pgcooVd7FP_0gWn6YC1LauCQEHAZnq7d",
"016.mp4":"https://drive.google.com/uc?export=view&id=1giw77v4r74Bk7nGw1vUAbV9wEJ2U-oVP",
"017.mp4":"https://drive.google.com/uc?export=view&id=17lD8hw8ubdFgG2sFlRPtP9miMqYT2bAl",
"018.mp4":"https://drive.google.com/uc?export=view&id=1h5ZELQkS8tr_kfsCssBBdDDh-vuGz3gL",
"019.mp4":"https://drive.google.com/uc?export=view&id=1veEMLPlvLusYXte4cNkJlqm0-emCZTW4",
"020.mp4":"https://drive.google.com/uc?export=view&id=1bBoosE8JCCvHGaCEmPLK27a1lAAEjnPS",
"021.mp4":"https://drive.google.com/uc?export=view&id=16p9IHEXoiUuikilTtjXV9UEgcL8w42gW",
"022.mp4":"https://drive.google.com/uc?export=view&id=13u9PyJ6l8VSBmTBlbTvwFbZUDmGj6BWn",
"023.mp4":"https://drive.google.com/uc?export=view&id=1bD01IqzmVeDnMhMYQXhBGWvZW5t2_6Vv",
"024.mp4":"https://drive.google.com/uc?export=view&id=1jFoNgoddVoiVI1lr479dWefCTEpCBuSy",
"025.mp4":"https://drive.google.com/uc?export=view&id=1fypYFeZk4kdKErVpHB7pHTZ1psmfcgAW",
"026.mp4":"https://drive.google.com/uc?export=view&id=13RbjbUyzKzXlXcc5jzDf5oGcQgNRBNPO",
"027.mp4":"https://drive.google.com/uc?export=view&id=1T51hhi64LU4BnXvNX-bTJJvyj_GVHhpB",
"028.mp4":"https://drive.google.com/uc?export=view&id=1JxBPEDgk5UlcNbKY8Y2bdygmQ34G8WrV",
"029.mp4":"https://drive.google.com/uc?export=view&id=1ccUV3lGOR0tbZlEnw2ybJDIxLXspzgaC",
"030.mp4":"https://drive.google.com/uc?export=view&id=1EGxSRSxLpRzuiFPLS9ly7WhVNFBhl7VA",
"031.mp4":"https://drive.google.com/uc?export=view&id=1BvfOSnTaVJauTeN62i7Ryoq9D75rs28h",
"032.mp4":"https://drive.google.com/uc?export=view&id=1nKRQhPeIarb7oBoFcs764fhAxFeymVFJ",
"33.mp4":"https://drive.google.com/uc?export=view&id=1IO35m0hq4OfpArlae3YQFPuKqiQoVjaK",
"34.mp4":"https://drive.google.com/uc?export=view&id=1Qz791VFvRhKWnDkCsmUG_aKMv3RtabEQ"
};

function extractNumber(name){
    const m=name.match(/(\d+)/);
    return m?parseInt(m[0],10):0;
}

imageFiles.sort((a,b)=>extractNumber(a)-extractNumber(b));
videoFiles.sort((a,b)=>extractNumber(a)-extractNumber(b));

for(let i=0;i<imageFiles.length;i++){
    const file=imageFiles[i];
    galleryData.push({
        id:i+1,
        type:'photo',
        title:`Foto ${i+1}`,
        src:`images/${file}`,
        thumb:`images/${file}`
    });
}

for(let i=0;i<videoFiles.length;i++){
    const file=videoFiles[i];
    const base=file.replace(/\.[^/.]+$/,'');
    galleryData.push({
        id:imageFiles.length+i+1,
        type:'video',
        title:`Video ${i+1}`,
        src:videoLinks[file],
        thumb:`images/${base}-thumb.jpg`
    });
}

let filteredData=[...galleryData];
let currentLightboxIndex=0;

document.addEventListener('DOMContentLoaded',function(){
    renderGallery();
    setupEventListeners();
});

// ====== LIGHTBOX VIDEO FIX ======
function openLightbox(index){
    currentLightboxIndex=index;
    const item=filteredData[index];

    const mediaHTML=item.type==='video'
        ? `<video src="${item.src}" controls autoplay muted playsinline></video>`
        : `<img src="${item.src}">`;

    document.getElementById('lightboxMedia').innerHTML=mediaHTML;
    document.getElementById('lightbox').classList.add('active');
}

function navigateLightbox(dir){
    let i=currentLightboxIndex+dir;
    if(i<0)i=filteredData.length-1;
    if(i>=filteredData.length)i=0;
    currentLightboxIndex=i;

    const item=filteredData[i];
    const mediaHTML=item.type==='video'
        ? `<video src="${item.src}" controls autoplay muted playsinline></video>`
        : `<img src="${item.src}">`;

    document.getElementById('lightboxMedia').innerHTML=mediaHTML;
}
