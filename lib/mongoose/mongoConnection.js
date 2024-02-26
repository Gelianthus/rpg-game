import mongoose from "mongoose";

async function mongoConnection() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("Connected to Database, logged from mongoconnection.js");
	} catch (error) {
		console.log(error);
	}
}

export default mongoConnection;
