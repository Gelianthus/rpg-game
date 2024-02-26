import mongoose, { Schema } from "mongoose";

const recordSchema = new Schema({
	time: Number,
	player_name: String,
	player_email: {
		type: String,
		unique: true,
	},
	date_submitted: {
		type: Date,
		default: Date.now,
	},
});

const Record =
	mongoose.models.Record || mongoose.model("Record", recordSchema, "records");

export default Record;
