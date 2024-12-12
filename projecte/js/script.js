// Importar la llibreria SheetJS
document.getElementById("loadMessage").addEventListener("click", () => {
    fetch('https://maarshaall.github.io/lolaa/projecte/missatges.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // Llegir el fitxer Excel
            const XLSX = window.XLSX;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Nom de la primera pestanya
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Processar la primera fila
            const primeraFila = rows[1]; // La fila amb dades
            mostrarMissatge(primeraFila);
        })
        .catch(err => console.error("Error carregant l'Excel:", err));
});

function mostrarMissatge(fila) {
    const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;
    const container = document.getElementById("dailyMessage");

    // Missatge base
    container.innerHTML = `
        <p><strong>Dia:</strong> ${dia}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Frase:</strong> ${frase}</p>
    `;

    // Afegir contingut extra si existeix
    if (linkImatge && peuFoto) {
        container.innerHTML += `
            <div>
                <img src="${linkImatge}" alt="Imatge del dia" style="max-width: 100%; height: auto;">
                <p>${peuFoto}</p>
            </div>
        `;
    }

    if (linkVideo) {
        container.innerHTML += `
            <p><a href="${linkVideo}" target="_blank">Mira el vídeo</a></p>
        `;
    }
}














const messages = [
    "Ets el meu sol en dies ennuvolats.",
    "No puc imaginar la meva vida sense tu.",
    "Avui és un gran dia per somriure junts.",
    "Ets la persona més increïble que conec."
];

// Mostra un missatge diferent cada dia
const today = new Date().getDay();
document.getElementById("message").innerText += messages[today % messages.length];
