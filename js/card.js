document.addEventListener('DOMContentLoaded', function(){

    const audio = document.getElementById("bgAudio");
    const cards = document.querySelectorAll('.card');

    // =========================
    // 🎵 AUDIO (AMAN)
    // =========================
    if(audio){

        audio.volume = 0.7;

        // lanjut dari waktu terakhir
        const savedTime = localStorage.getItem("musicTime");
        if(savedTime){
            audio.currentTime = savedTime;
        }

        // simpan waktu
        setInterval(()=>{
            localStorage.setItem("musicTime", audio.currentTime);
        },1000);

        // autoplay trick
        audio.muted = true;

        audio.play().then(()=>{
            audio.muted = false;
        }).catch(()=>{
            const resumeAudio = () => {
                audio.play().catch(()=>{});
                document.removeEventListener('click', resumeAudio);
            };
            document.addEventListener('click', resumeAudio);
        });
    }

    // =========================
    // 💌 CARD FLIP (TIDAK TERGANTUNG AUDIO)
    // =========================
    cards.forEach(card=>{
        card.addEventListener('click', ()=>{
            card.classList.toggle('open');
        });
    });

});