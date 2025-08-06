import { PrismaClient } from '@prisma/client';
import { getPaginatedRecord } from '../utils/paginatedRecord';
const prisma = new PrismaClient();
export class BookService {
	constructor(req) {
		this.req = req;
	}

	async getAllBooks() {
		const { query } = this.req;
		const selectOption = {
			id: true,
			title: true,
			author: true,
			type: true,
			published: true,
			deleted: true,
			created_at: true,
			updated_at: true,
		};
		const result = await getPaginatedRecord(query, selectOption, prisma.books);
		return result;
	}

	async createBook() {
		const { body, user } = this.req;

		body.user_id = user.id;

		const newBook = await prisma.books.create({ data: body });

		return newBook;
	}

	async updateBook() {
		const { id } = this.req.params;
		const { body, user } = this.req;
		const updateRecord = await prisma.books.update({
			where: {
				deleted: false,
				id: parseInt(id, 10),
				user_id: user.id,
			},
			data: body,
		});
		return updateRecord;
	}

	async deleteBook() {
		const { id } = this.req.params;
		const { user } = this.req;
		await prisma.books.update({
			where: {
				deleted: false,
				id: parseInt(id, 10),
				user_id: user.id,
			},
			data: {
				deleted: true,
			},
		});
		return null;
	}

	async deleteManyBooks() {
		const { ids } = this.req.body;

		await prisma.books.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data: {
				deleted: true,
			},
		});

		return null;
	}
}
