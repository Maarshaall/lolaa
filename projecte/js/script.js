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

            mostrarMissatge([primeraFila[0], primeraFila[1], primeraFila[2], primeraFila[3], primeraFila[4], primeraFila[5]]);
        })
        .catch(err => console.error("Error carregant l'Excel:", err));
});

function excelDateToJSDate(excelDate) {
    // Els valors de data d'Excel comencen a 1900-01-01
    const excelEpoch = new Date(1899, 11, 30); // Compte amb l'offset!
    return new Date(excelEpoch.getTime() + excelDate * 86400000); // Convertir dies a mil·lisegons
}

function mostrarMissatge(fila) {
    const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;
    const container = document.getElementById("dailyMessage");

    // Convertir el número d'Excel a una data de JavaScript
    const dataExcel = excelDateToJSDate(data);

    console.log("Data original d'Excel:", data);
    console.log("Data convertida:", dataExcel);

    // Format de data correctament
    const dataFormatada = dataExcel.toLocaleDateString('ca-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    console.log("Data formatada:", dataFormatada);

    // Missatge base
    container.innerHTML = `
        <p><strong>Dia ${dia}: </strong> ${dataFormatada} </p>
        <p><strong>El motiu d'avui:</strong></p>
        <p> ${frase}</p>
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





function iniciarCountdown() {
    const countdownElement = document.getElementById("countdownMessage");

    function updateCountdown() {
        const ara = new Date(); // Hora actual
        const demà = new Date(ara.getFullYear(), ara.getMonth(), ara.getDate() + 1); // Mitjanit de demà

        const diferència = demà - ara; // Diferència en mil·lisegons

        if (diferència > 0) {
            const hores = Math.floor(diferència / (1000 * 60 * 60));
            const minuts = Math.floor((diferència % (1000 * 60 * 60)) / (1000 * 60));
            const segons = Math.floor((diferència % (1000 * 60)) / 1000);

            countdownElement.textContent = `Queden ${hores}h ${minuts}m ${segons}s pel següent motiu.`;
        } else {
            countdownElement.textContent = "Ja és el següent dia!";
            clearInterval(interval); // Atura l'actualització un cop s'ha arribat a l'endemà
        }
    }

    updateCountdown(); // Executar immediatament per inicialitzar
    const interval = setInterval(updateCountdown, 1000); // Actualitzar cada segon
}

// Executar la funció de compte enrere en carregar la pàgina
iniciarCountdown();














document.addEventListener("DOMContentLoaded", () => {
    const daysList = document.getElementById("daysList");
    const dailyMessage = document.getElementById("dailyMessage");

    fetch('https://maarshaall.github.io/lolaa/projecte/missatges.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const XLSX = window.XLSX;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const today = new Date();
            const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            // Generar la llista de dies fins al dia actual
            rows.slice(1).forEach((fila, index) => {
                const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;
                const dataExcel = new Date((data - 25569) * 86400 * 1000); // Converteix la data d'Excel

                if (dataExcel <= todayMidnight) {
                    const li = document.createElement("li");
                    li.textContent = `Dia ${index + 1}: ${dataExcel.toLocaleDateString("ca-ES")}`;
                    li.addEventListener("click", () => mostrarMissatge(fila));
                    daysList.appendChild(li);
                }
            });
        })
        .catch(err => console.error("Error carregant l'Excel:", err));

    function mostrarMissatge(fila) {
        const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;

        const dataExcel = new Date((data - 25569) * 86400 * 1000);
        const dataFormatada = dataExcel.toLocaleDateString("ca-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        dailyMessage.innerHTML = `
            <p><strong>Dia:</strong> ${dia}</p>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Frase:</strong> ${frase}</p>
        `;

        if (linkImatge && peuFoto) {
            dailyMessage.innerHTML += `
                <div>
                    <img src="${linkImatge}" alt="Imatge del dia" style="max-width: 100%; height: auto;">
                    <p>${peuFoto}</p>
                </div>
            `;
        }

        if (linkVideo) {
            dailyMessage.innerHTML += `
                <p><a href="${linkVideo}" target="_blank">Mira el vídeo</a></p>
            `;
        }
    }
});



























