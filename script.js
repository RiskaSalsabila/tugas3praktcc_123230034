const API_URL = 'https://backend-034-820401822458.us-central1.run.app/api/v1/notes';

const softPastelColors = [
    '#FFEDF2', '#E9F6FF', '#F0FFF0', '#FFF9E5', '#F3E5F5', '#FFF5EB'
];

document.addEventListener('DOMContentLoaded', ambilDaftarCatatan);

async function ambilDaftarCatatan() {
    try {
        const response = await fetch(API_URL);
        const hasil = await response.json();
        const daftarCatatan = hasil.payload; 
        
        const wadahCatatan = document.getElementById('notesList');
        wadahCatatan.innerHTML = '';

        if (!daftarCatatan || daftarCatatan.length === 0) {
            wadahCatatan.innerHTML = '<div class="column is-12 has-text-centered mt-5"><p style="color: #ffcad4;">Belum ada catatan lucu hari ini.. ✨</p></div>';
            return;
        }

        // ... kode ambilDaftarCatatan ...
daftarCatatan.forEach((item, indeks) => {
    const warnaKartu = softPastelColors[indeks % softPastelColors.length];
    
    // BUNGKUS DENGAN <div class="column is-4"> AGAR TIDAK NUMPUK
    wadahCatatan.innerHTML += `
        <div class="column is-4 animate__animated animate__zoomIn">
            <div class="note-card" style="background-color: ${warnaKartu};">
                <span class="card-date">${new Date(item.tanggal_dibuat).toLocaleDateString('id-ID')}</span>
                <span class="card-title">${item.judul}</span>
                <p style="font-size: 0.9rem; margin-bottom: 15px;">${item.isi}</p>
                <div class="buttons">
                    <button class="button is-white is-small" onclick="editCatatan('${item.id}', '${item.judul.replace(/'/g, "\\'")}', '${item.isi.replace(/'/g, "\\'")}')">Edit ✏️</button>
                    <button class="button is-danger is-light is-small" onclick="hapusCatatan('${item.id}')">Hapus 🗑️</button>
                </div>
            </div>
        </div>
    `;
});
    } catch (err) {
        console.error('Gagal mengambil data:', err);
        document.getElementById('notesList').innerHTML = '<p class="has-text-centered" style="color: #e74c3c;">Gagal terhubung ke server. 🎀</p>';
    }
}

// ... Fungsi saveNote, editCatatan, dan hapusCatatan tetap sama ...

async function saveNote() {
    const idInput = document.getElementById('noteId').value;
    const judulInput = document.getElementById('judul').value;
    const isiInput = document.getElementById('isi').value;
    const saveBtn = document.getElementById('saveBtn');

    if (!judulInput || !isiInput) {
        alert('Judul dan isi catatan jangan dikosongkan ya..');
        return;
    }

    saveBtn.innerText = 'Menyimpan...';
    saveBtn.disabled = true;

    const metode = idInput ? 'PUT' : 'POST';
    const endpoint = idInput ? `${API_URL}/${idInput}` : API_URL;

    try {
        await fetch(endpoint, {
            method: metode,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul: judulInput, isi: isiInput })
        });

        // Reset Form
        document.getElementById('noteId').value = '';
        document.getElementById('judul').value = '';
        document.getElementById('isi').value = '';
        saveBtn.innerText = 'Simpan Catatan';
        saveBtn.disabled = false;
        
        ambilDaftarCatatan();
    } catch (err) {
        console.error('Catatan gagal disimpan:', err);
        saveBtn.innerText = 'Gagal Simpan';
        saveBtn.disabled = false;
    }
}

function editCatatan(id, judul, isi) {
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('saveBtn').innerText = 'Perbarui Catatan';
    // Scroll pelan ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function hapusCatatan(id) {
    if (!confirm('Catatan ini mau dihapus?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        ambilDaftarCatatan();
    } catch (err) {
        console.error('Gagal menghapus:', err);
    }
}