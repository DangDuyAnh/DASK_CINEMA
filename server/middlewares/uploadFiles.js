const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {      
    if (file.fieldname === "images") { 
      cb(null, './uploads/images');
    };
    if (file.fieldname === "videos")  { 
      cb(null, './uploads/videos');
    }
  },
    filename: function(req, file, cb) {
      if (file.fieldname === "images") { 
        cb(null, file.originalname);
      }; 
      if (file.fieldname === "videos") { 
        cb(null, Date.now() + '.mp4');
      }
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === "images") { 
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) { 
        cb(null, true);
      } else {
        cb(null, false); 
      }
    };
    if (file.fieldname === "videos") { 
      if (
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/gif' 
      ) { 
        cb(null, true);
      } else {
        cb(null, false); 
      }
    }
  };

const upload = multer({
storage: storage,
fileFilter: fileFilter
});

const uploadFiles = upload.fields(
  [
    { 
      name: 'images', 
      maxCount: 4,
    }, 
    { 
      name: 'videos', 
      maxCount: 1 
    }
  ]
)

module.exports = uploadFiles;