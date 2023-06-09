import express from 'express';
import { uploadItems,getAllItems, getAnItem,removeItem,editItem } from '../controllers/item.controller';
import { fileValidator, validate } from '../middlewares/validators.middlware';
import { upload } from '../utils/upload.util';

const router = express.Router();

// The multer configuration 



router.post('/upload',upload.single("file"),fileValidator,validate, uploadItems);
router.get('/', getAllItems);
router.get('/:id', getAnItem);
router.put('/:id', editItem);
router.delete('/:id', removeItem);


export default router;
