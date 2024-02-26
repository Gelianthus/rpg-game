"use client";

import { useEffect, useRef, useState } from "react";
import { modalControlStore } from "@/lib/zustand/modalStore";
import { formattedTime } from "@/utils/formattedTime";
import { scrollLock } from "@/utils/scrollLock";
import { leaderboardStore } from "@/lib/zustand/leaderboardStore";

export default function SubmitRecordModal({ restartHandle, time }) {
	const { setTopTen } = leaderboardStore();
	const { modalVisibility, setModalVisibility } = modalControlStore();
	const modalRef = useRef(null);

	const [playerName, setPlayerName] = useState("");
	const [playerEmail, setPlayerEmail] = useState("");

	useEffect(() => {
		if (modalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}
	}, [modalVisibility]);

	const submitHandle = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/records`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					time: time,
					player_name: playerName,
					player_email: playerEmail,
				}),
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				setTopTen(data.records);
			} else {
				const data = await res.json();
				window.alert(data.message);
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setPlayerEmail("");
			setPlayerName("");
			restartHandle();
		}
	};

	useEffect(() => {
		scrollLock(modalVisibility);
	}, [modalVisibility]);

	return (
		<dialog
			ref={modalRef}
			className="p-8 bg-gray-800 text-neutral-50"
		>
			<form onSubmit={submitHandle}>
				<p className="text-center font-semibold  text-2xl my-4">
					Your record: <br />
					<span className="text-emerald-500">{formattedTime(time)}</span>
				</p>
				<label
					className="mb-1"
					htmlFor="player_name"
				>
					Name:{" "}
				</label>
				<input
					onChange={(e) => setPlayerName(e.target.value)}
					required
					className="block p-1 my-1 text-neutral-800 w-full"
					maxLength={50}
					id="player_name"
					type="text"
				/>
				<label
					className="mb-1"
					htmlFor="player_email"
				>
					Email:{" "}
				</label>
				<input
					onChange={(e) => {
						setPlayerEmail(e.target.value);
					}}
					maxLength={50}
					required
					className="block p-1 my-1 text-neutral-800 w-full"
					id="player_email"
					type="text"
				/>
				<div className="flex flex-row gap-4 flex-wrap justify-center mt-4">
					<button
						className="hover:text-rose-500 active:text-rose-600"
						type="button"
						onClick={() => {
							setModalVisibility(false);
							setPlayerEmail("");
							setPlayerName("");
						}}
					>
						Cancel
					</button>
					<button
						className="hover:text-emerald-500 active:text-emerald-600"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
			<p className="italic text-xs text-center my-2 text-gray-400">
				Record is linked to your email, make sure to submit the same email if
				you wish to overwrite your previous record.
			</p>
		</dialog>
	);
}
