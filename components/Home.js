"use client";

import Game from "./Game";
import Link from "next/link";
import Leaderboard from "./Leaderboard";

export default function Home() {
	return (
		<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
			<div className="flex flex-col md:flex-row gap-6 sm:h-96">
				<div>
					<h1 className="text-center text-4xl font-bold text-emerald-500 mb-4">
						Dragon Repeller Speedrun
					</h1>
					<p className="text-center font-bold my-4">
						It's a modified version of the game from{" "}
						<Link
							target="_blank"
							className="underline"
							href={"https://www.freecodecamp.org/"}
						>
							freeCodeCamp
						</Link>{" "}
						JavaScript Tutorial with an added Speedrun mode. <br /> Play the
						orignial{" "}
						<Link
							className="underline"
							href={"/original-version"}
						>
							here
						</Link>
						.
					</p>
					<div className="font-bold text-xs text-gray-500 my-4 text-center">
						<p>
							tips: max health: <span className="text-emerald-500">300</span>,
							max xp: <span className="text-purple-800">80</span>, look for
							<span className="text-yellow-500"> easter egg</span> after
							defeating a monster
						</p>
					</div>

					<Game />
				</div>
				<Leaderboard />
			</div>
		</main>
	);
}
