"use client";

import Game from "./Game";
import Link from "next/link";
import Leaderboard from "./Leaderboard";

export default function Home() {
	return (
		<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
			<div className="flex flex-col md:flex-row gap-6 ">
				<div>
					<h1 className="text-center text-4xl font-bold text-emerald-500 mb-4">
						Welcome to Dragon Repeller Speedrun
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
						JavaScript Tutorial with an added Speedrun mode.
					</p>

					<Game />
				</div>
				<Leaderboard />
			</div>
		</main>
	);
}
