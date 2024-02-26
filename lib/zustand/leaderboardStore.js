import { create } from "zustand";

export const leaderboardStore = create((set) => ({
	topTen: [],
	setTopTen: (newTopTen) => set({ topTen: newTopTen }),
	getTopTen: async () => {
		const res = await fetch(`/api/records`, {
			method: "GET",
			cache: "no-store",
		});
		if (res.ok) {
			const data = await res.json();
			set(() => ({ topTen: data.records }));
		}
	},
}));
