import multer from "multer";

export const upLoadMemory = multer({
  storage: multer.memoryStorage(),
});

export const upLoadDisk = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});
