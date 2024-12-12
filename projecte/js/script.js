



const messages = [
    "Ets el meu sol en dies ennuvolats.",
    "No puc imaginar la meva vida sense tu.",
    "Avui és un gran dia per somriure junts.",
    "Ets la persona més increïble que conec."
];

// Mostra un missatge diferent cada dia
const today = new Date().getDay();
document.getElementById("message").innerText += messages[today % messages.length];
