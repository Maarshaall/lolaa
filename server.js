const express = require("express");
const app = express();

// Middleware per protegir la pàgina
app.use((req, res, next) => {
    const auth = { login: "parella", password: "secret" };
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [login, password] = Buffer.from(b64auth, "base64").toString().split(":");
    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Accés no autoritzat");
});

// Serveix els fitxers estàtics de la carpeta "public"
app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor en marxa a http://localhost:3000"));
