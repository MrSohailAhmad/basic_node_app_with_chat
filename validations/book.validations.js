import {
	GET_USER_QUERY_SCHEMA_CONFIG,
	REQUIRED_FIELDS,
	USER_NOT_FOUND,
} from '../constants';
import yup from 'yup';
import { createQueryParamsSchema } from '../utils';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBookSchema = yup.object().shape({
	body: yup.object().shape({
		author: yup.string().required(REQUIRED_FIELDS),
		title: yup.string().required(REQUIRED_FIELDS),
		type: yup.string().notRequired(),
		published: yup.boolean().notRequired(),
	}),
});

export const getBooksSchema = yup.object({
	query: createQueryParamsSchema(GET_USER_QUERY_SCHEMA_CONFIG),
});

export const bookIdSchema = yup.object({
	params: yup.object({
		id: yup
			.number()
			.integer('User ID must be an integer.')
			.max(99999999999)
			.required(REQUIRED_FIELDS)
			.test({
				name: 'valid-form',
				message: USER_NOT_FOUND,
				async test(value) {
					const record = await prisma.books.findFirst({
						where: {
							deleted: false,
							id: parseInt(value, 10),
						},
					});
					return !record || !record.id ? Boolean(0) : Boolean(1);
				},
			}),
	}),
});

export const updateBookSchema = yup.object().shape({
	body: yup.object({
		title: yup.string().notRequired(),
		type: yup.string().notRequired(),
		author: yup.string().notRequired(),
	}),
	params: yup.object({
		id: yup
			.number()
			.integer('User ID must be an integer.')
			.max(99999999999)
			.required(REQUIRED_FIELDS)
			.test({
				name: 'valid-form',
				message: USER_NOT_FOUND,
				async test(value) {
					const record = await prisma.books.findFirst({
						where: {
							deleted: false,
							id: parseInt(value, 10),
						},
					});
					return !record || !record.id ? Boolean(0) : Boolean(1);
				},
			}),
	}),
});

export const deleteBooksSchema = yup.object({
	body: yup.object({
		ids: yup.array().required(REQUIRED_FIELDS),
	}),
});
