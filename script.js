const player = document.getElementById('player');
const currentTimeElement = document.getElementById('current-time');
const statusElement = document.getElementById('status');
const volumeElement = document.getElementById('volume');
const fileInput = document.getElementById('fileInput');
const filenameElement = document.getElementById('filename');

function playAudio() {
    if (!player.src) {
        alert('Por favor, seleciona um arquivo de áudio antes de tocar.');
    } else {
        player.play();
        statusElement.textContent = 'A tocar...';
    }
}

function pauseAudio() {
    player.pause();
    statusElement.textContent = 'Pause';
}

function increaseVolume() {
    if (player.volume < 1.0) {
        player.volume = Math.min(1.0, player.volume + 0.1);
        volumeElement.textContent = player.volume.toFixed(1);
    }
}

function decreaseVolume() {
    if (player.volume > 0.0) {
        player.volume = Math.max(0.0, player.volume - 0.1);
        volumeElement.textContent = player.volume.toFixed(1);
    }
}

player.addEventListener('timeupdate', () => {
    const minutes = Math.floor(player.currentTime / 60);
    const seconds = Math.floor(player.currentTime % 60).toString().padStart(2, '0');
    currentTimeElement.textContent = `${minutes}:${seconds}`;
});

player.addEventListener('play', () => {
    statusElement.textContent = 'A tocar...';
});

player.addEventListener('pause', () => {
    statusElement.textContent = 'Pause';
});

player.addEventListener('volumechange', () => {
    volumeElement.textContent = player.volume.toFixed(1);
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        player.src = fileURL;
        filenameElement.textContent = file.name; // Atualiza o nome do arquivo
    } else {
        filenameElement.textContent = 'Nenhum ficheiro selecionado!';
    }
});