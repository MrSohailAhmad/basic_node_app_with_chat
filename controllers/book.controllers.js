import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { successResponse } from '../utils';
import { BookService } from '../services/book.services';

import {
	BOOK_CREATED_SUCCESS,
	BOOK_DELETED_SUCCESS,
	BOOK_UPDATED_SUCCESS,
	GET_BOOKS_SUCCESS,
} from '../constants';

export const getAllBooks = asyncHandler(async (req, res) => {
	const bookService = new BookService(req);
	const data = await bookService.getAllBooks();
	return successResponse(res, HttpStatus.OK, GET_BOOKS_SUCCESS, data);
});

export const createBook = asyncHandler(async (req, res) => {
	const bookService = new BookService(req);
	const data = await bookService.createBook();
	return successResponse(res, HttpStatus.CREATED, BOOK_CREATED_SUCCESS, data);
});

export const updateBook = asyncHandler(async (req, res) => {
	const bookService = new BookService(req);
	const data = await bookService.updateBook();
	return successResponse(res, HttpStatus.OK, BOOK_UPDATED_SUCCESS, data);
});

export const deleteBook = asyncHandler(async (req, res) => {
	const bookService = new BookService(req);
	const data = await bookService.deleteBook();
	return successResponse(res, HttpStatus.OK, BOOK_DELETED_SUCCESS, data);
});

export const deleteManyBooks = asyncHandler(async (req, res) => {
	const bookService = new BookService(req);
	const data = await bookService.deleteManyBooks();
	return successResponse(res, HttpStatus.OK, BOOK_DELETED_SUCCESS, data);
});
