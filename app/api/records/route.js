import mongoConnection from "@/lib/mongoose/mongoConnection";
import Record from "@/lib/mongoose/models/Record";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const records = await Record.find().sort({ time: 1 }).limit(10);
		if (records) {
			return NextResponse.json({ records: records }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to fetchd data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, res) {
	await mongoConnection();
	const { time, player_name, player_email } = await req.json();
	try {
		const record = await Record.findOne({ player_email: player_email });
		if (!record) {
			const newRecord = await Record.create({
				time: time,
				player_name: player_name,
				player_email: player_email,
			});

			if (newRecord) {
				const records = await Record.find().sort({ time: 1 }).limit(10);
				return NextResponse.json({ records: records }, { status: 200 });
			} else {
				return NextResponse.json(
					{ message: "Failed to submit record" },
					{ status: 500 }
				);
			}
		} else {
			const updateRecord = await Record.findOneAndUpdate(
				{ player_email: player_email },
				{ player_name: player_name, time: time },
				{ new: true }
			);
			if (updateRecord) {
				const records = await Record.find().sort({ time: 1 }).limit(10);
				return NextResponse.json({ records: records }, { status: 200 });
			} else {
				return NextResponse.json(
					{ message: "Failed to update record" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to update data" },
			{ status: 500 }
		);
	}
}
