import multer from "multer";

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
      cb(null, "./uploads/");
    },
    filename: (req:any, file:any, cb:any) => {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
  });
  
export const upload = multer({ storage });