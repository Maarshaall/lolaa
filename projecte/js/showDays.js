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
            console.log(today)

            // Generar la llista de dies fins al dia actual
            rows.slice(1).forEach((fila, index) => {
                const [dia, data, frase, linkImatge, peuFoto, linkVideo] = fila;
                const dataExcel = new Date((data - 25569) * 86400 * 1000); // Converteix la data d'Excel

                console.log(dataExcel)
                console.log(todayMidnight)

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
