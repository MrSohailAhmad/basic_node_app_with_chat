import { Router } from 'express';
import { isAuth, validate } from '../middlewares';
import {
	createBook,
	deleteBook,
	deleteManyBooks,
	getAllBooks,
	updateBook,
} from '../controllers/book.controllers';
import {
	bookIdSchema,
	createBookSchema,
	deleteBooksSchema,
	getBooksSchema,
	updateBookSchema,
} from '../validations/book.validations';

const router = Router();

router.get('/', isAuth, validate(getBooksSchema), getAllBooks);
router.post('/', isAuth, validate(createBookSchema), createBook);
router.put('/:id', isAuth, validate(updateBookSchema), updateBook);
router.delete('/:id', isAuth, validate(bookIdSchema), deleteBook);
router.delete('/', isAuth, validate(deleteBooksSchema), deleteManyBooks);

export const bookRoutes = router;
