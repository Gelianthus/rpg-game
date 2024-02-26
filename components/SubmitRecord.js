"use client";

import SubmitRecordModal from "./modals/SubmitRecordModal";
import { modalControlStore } from "@/lib/zustand/modalStore";

export default function SubmitRecord({ time, restartHandle }) {
	const { setModalVisibility } = modalControlStore();

	return (
		<>
			<button
				className="p-2 bg-gray-800 hover:bg-gray-900 active:bg-gray-950  text-neutral-50 block mx-auto my-2"
				onClick={() => {
					setModalVisibility(true);
				}}
			>
				Submit Record
			</button>
			<SubmitRecordModal
				time={time}
				restartHandle={restartHandle}
			/>
		</>
	);
}
