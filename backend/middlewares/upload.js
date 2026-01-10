const multer = require('multer');
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      if(req.originalUrl === "/api/v1/user/update-profile-image"){
        cb(null, 'uploads/profileImages/');
      }else if(req.originalUrl === "/api/v1/user/update-cover-image"){
        cb(null, 'uploads/coverImages/');
      }else if(file.fieldname === "file"){
        cb(null, 'uploads/posts/');
      }else{
        cb(null, 'uploads/');
      }
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
