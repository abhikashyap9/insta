const dropCollections = async (connection) => {
	await Promise.all((await connection.db.collections()).map((collection) => collection.deleteMany({})))
}

export default dropCollections
