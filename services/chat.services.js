const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export class ChatService {
	async createChatRoomService(type, name, memberIds) {
		const chatRoom = await prisma.chatRoom.create({
			data: {
				name,
				type,
				members: {
					create: memberIds.map(userId => ({
						user: { connect: { id: userId } },
					})),
				},
			},
			include: { members: true },
		});
		return chatRoom;
	}

	async getChatRoomsByUserId(userId) {
		return await prisma.chatRoom.findMany({
			where: {
				members: {
					some: {
						userId,
					},
				},
			},
			include: {
				members: { include: { user: true } },
				messages: {
					orderBy: { createdAt: 'desc' },
					take: 1,
				},
			},
		});
	}
}
