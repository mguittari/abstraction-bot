import express from "express";
import OpenAI from "openai";
import fs from "node:fs";
import "dotenv/config";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const openai = new OpenAI();

const prompt = `
Génères moi une image abstraite au format carré, de style techno-constructiviste, presque machine-based. L'image contient des formes géométriques récurrentes, qui apparaissent sur l'image en différentes strates et hiérarchies.

Choix graphique : 
- Formes nettes, géométriques (rectangles, cercles, barres, carrés, etc).
- Palette limitée : noir (code brut), bleu (signal / metadata), blanc cassé (support). 
- Disposition par quadrants / lignes imbriquées : En référence aux sections internes d’un fichier PNG (IHDR, IDAT, etc.), suggérant une machine lisible ou un système ordonné.

Tu optes pour un rendu vectoriel propre, froid, systématique, où le sens ne vient ni de la beauté, ni de l’émotion, mais de l’ordre, des formes, de la répétition – ce qui évoque la logique du binaire, de l’encodage. 
`;

const result = await openai.images.generate({
	model: "gpt-image-1",
	prompt,
	size: "1024x1024",
	quality: "high",
});

function getRandomId() {
	return Date.now();
}

const randomId = getRandomId();
const id = randomId;

console.log(id);

// Save the image to a file
const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync(`outputs/Abstract-${id}.png`, image_bytes);
