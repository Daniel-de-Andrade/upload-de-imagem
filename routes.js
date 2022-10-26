const express = require("express"),
  upload = require("./middleware/upload"),
  Resize = require("./Resize"),
  path = require("path");
// Instanciando o Router (necessário para criarmos as rotas)
const router = express.Router();

// Definindo a rota para a URL principal com o método GET
router.get("/", function (req, res) {
  // Definindo o retorno dessa rota com o método send (no arquivo vamos usar arrow function)
  // res.send('<h1>Upload de Imagens com Node.js</h1>')
  res.render("index", {
    title: "Upload de Imagens com Node.js",
  });
});
router.get("/profile", function (req, res) {
  res.render("profile", {
    title: "Upload Realizado com Sucesso!",
  });
});

router.post("/profile", upload.single("image"), async function (req, res) {
  const username = req.body.name,
    surname = req.body.lastname,
    imagePath = path.join(__dirname, "public/images");

  const fileUpload = new Resize(imagePath);

  if (!req.file) {
    res.status(401).json({ error: "Hey, envia seu avatar rapá" });
  }
  const filename = await fileUpload.save(req.file.buffer);

  return res.status(200).render("profile", {
    title: `Upload feito com sucesso!`,
    firstname: username,
    lastname: surname,
    imagename: filename,
  });
});

// Exportando o router para podermos importá-lo em outros arquivos
module.exports = router;
