import { formattedTime } from "@/utils/formattedTime";
import { leaderboardStore } from "@/lib/zustand/leaderboardStore";
import { useEffect } from "react";

export default function Leaderboard() {
	const { topTen, getTopTen } = leaderboardStore();

	useEffect(() => {
		getTopTen();
	}, []);

	return (
		<div className="max-w-xs bg-gray-800 text-neutral-50 p-4 mx-auto ">
			<p className="font-semibold text-center text-emerald-500">
				TOP TEN LEADERBOARD
			</p>
			<ul>
				{topTen.map((top) => {
					return (
						<li
							className="flex flex-row gap-4 py-2 justify-between w-full text-xs"
							key={top._id}
						>
							<span>{top.player_name.slice(0, 13)}</span>{" "}
							<span>{formattedTime(top.time)}</span>
						</li>
					);
				})}
				<li className="text-center">{topTen.length === 0 && "[ EMPTY ]"}</li>
			</ul>
		</div>
	);
}
