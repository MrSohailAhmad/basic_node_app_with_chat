import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getPaginatedRecord = async (query, selectOption, recordTable) => {
	/* eslint-disable-next-line prefer-const */
	let { page, limit, sort, ...search } = query;

	page = parseInt(page, 10) || 1;
	limit = parseInt(limit, 10) || 100000;

	const options = {
		where: {
			deleted: false,
		},
	};
	if (search) {
		options.where.AND = Object.keys(search).map(key => ({
			[key]: { contains: search[key] },
		}));
	}
	if (sort) {
		const [field, direction] = sort.split(':');
		options.orderBy = [
			{
				[field]: direction,
			},
		];
	}

	const totalCount = await recordTable.count(options);

	const totalPages = Math.ceil(totalCount / limit);

	options.skip = (page - 1) * limit;
	options.take = limit;
	options.select = selectOption;

	const allRecords = await recordTable.findMany(options);

	// if (!allRecords || !Array.isArray(allRecords) || allRecords.length === 0)
	// 	throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

	return {
		records: allRecords,
		totalRecords: totalCount,
		totalPages,
		query,
	};
};
