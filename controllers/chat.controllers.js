export const createChatRoom = async (req, res) => {
	const { type, name, memberIds } = req.body;

	try {
		const chatRoom = await createChatRoomService(type, name, memberIds);
		res.status(201).json(chatRoom);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getChatRooms = async (req, res) => {
	const { userId } = req.params;
	try {
		const rooms = await getChatRoomsByUserId(parseInt(userId));
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
