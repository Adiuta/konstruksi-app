const hasil = [];

function hitung() {
  const selectedSubpekerjaan = JSON.parse(document.getElementById('subpekerjaan').value);
  hasil.push(selectedSubpekerjaan);

  const resultBody = document.getElementById('resultBody');
  const row = resultBody.insertRow();
  const cell1 = row.insertCell(0);
  cell1.innerHTML = selectedSubpekerjaan.nama_subpekerjaan;

  const bahan = selectedSubpekerjaan.bahan.map(b => `${b.bahan_id}: ${b.volume}`).join(', ');
  const cell2 = row.insertCell(1);
  cell2.innerHTML = bahan;

  const tenaga = selectedSubpekerjaan.tenaga.map(t => `${t.tenaga_id}: ${t.jumlah}`).join(', ');
  const cell3 = row.insertCell(2);
  cell3.innerHTML = tenaga;
}

function resetHasil() {
  hasil.length = 0;
  document.getElementById('resultBody').innerHTML = '';
}

function exportHasil() {
  // Implementasi untuk ekspor ke CSV atau Excel
}
