import { create } from "zustand";

export const modalControlStore = create((set) => ({
	modalVisibility: false,
	setModalVisibility: (bool) => set({ modalVisibility: bool }),
}));
