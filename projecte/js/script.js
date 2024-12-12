document.getElementById("loadMessage").addEventListener("click", () => {
    // Mostra el missatge abans de carregar el contingut
    document.getElementById("dailyMessage").innerHTML = "T'estimo els 365 dies de l'any, i cada dia tinc un motiu per fer-ho.";

    // Desactiva el botó
    const button = document.getElementById("loadMessage");
    button.disabled = true;
    button.style.display = 'none'; // Opcional: per ocultar visualment el botó

    // Càrrega l'Excel i mostra la primera fila com a missatge d'avui
    fetch('https://maarshaall.github.io/lolaa/projecte/missatges.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // Llegir el fitxer Excel
            const XLSX = window.XLSX;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Nom de la primera pestanya
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Processar la segona fila (index 1) que conté les dades correctes
            const primeraFila = rows[1]; // La segona fila amb dades
            mostrarMissatge(primeraFila);
        })
        .catch(err => console.error("Error carregant l'Excel:", err));
});

function mostrarMissatge(fila) {
    const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;
    const container = document.getElementById("dailyMessage");

    // Convertir la data llegida de l'Excel a un objecte Date de JavaScript
    const dataObjecte = new Date(data);

    // Format de data correctament
    const dataFormatada = dataObjecte.toLocaleDateString('ca-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Missatge base
    container.innerHTML = `
        <p><strong>Dia:</strong> ${dia}</p>
        <p><strong>Data:</strong> ${dataFormatada}</p>
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
