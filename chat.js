import socketIo from 'socket.io';
import { app } from './server';

const server = http.createServer(app);

const io = socketIo(server, {
	cors: { origin: '*' },
});

export function configChat() {
	io.on('connection', socket => {
		console.log('🟢 New client connected:', socket.id);

		socket.on('join_room', roomId => {
			socket.join(roomId);
			console.log(`Socket ${socket.id} joined room ${roomId}`);
		});

		socket.on('send_message', async ({ roomId, senderId, content }) => {
			const message = await prisma.message.create({
				data: {
					chatRoomId: roomId,
					senderId,
					content,
				},
			});

			io.to(roomId).emit('receive_message', message);
		});

		socket.on('disconnect', () => {
			console.log('🔴 Client disconnected:', socket.id);
		});
	});
}
