const multer = require('multer');
const crypto = require("crypto");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      let folder = 'uploads/';

      if (req.originalUrl.includes('profile-image')) folder += 'users/profiles';
      else if (req.originalUrl.includes('cover-image')) folder += 'users/covers';

      else if (req.originalUrl.includes('education')) folder += 'education/';
      else if (req.originalUrl.includes('accommodation')) folder += 'accommodation/';
      else if (req.originalUrl.includes('transportation')) folder += 'transportation/';

      // Automatically create the directory if it doesn't exist yet
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, buf) => {
        if(err){
          return cb(err);
        }else{
          const uniqueFilename = Date.now() + "-" + buf.toString('hex') + "-" + file.originalname;
          cb(null, uniqueFilename);
        }
      })
    },
});

const upload = multer({ storage: storage });

module.exports = { upload };
