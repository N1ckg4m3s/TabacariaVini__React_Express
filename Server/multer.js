const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'ImagensBanco/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nomeia o arquivo com a data atual para evitar conflitos
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;