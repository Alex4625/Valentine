document.addEventListener('DOMContentLoaded', () => {

    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('flap');
    const openBtn = document.getElementById('openBtn');

    let opened = false;

    function openEnvelope(){

        if(opened) return;
        opened = true;

        // ✅ tandai user sudah interaksi
        sessionStorage.setItem("userInteracted", "true");

        // ✅ animasi amplop buka (butuh CSS .open)
        if(envelope){
            envelope.classList.add('open');
        }

        // ✅ sound effect amplop (opsional)
        const sfx = new Audio("assets/sounds/open.mp3");
        sfx.volume = 0.8;
        sfx.play().catch(()=>{});

        // ✅ pindah ke card.html setelah animasi
        setTimeout(()=>{
            window.location.href = "card.html";
        }, 1200);
    }

    // klik tombol
    if(openBtn){
        openBtn.addEventListener('click', openEnvelope);
    }

    // klik flap
    if(flap){
        flap.addEventListener('click', openEnvelope);
    }

});
