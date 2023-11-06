import { create } from "zustand";

interface store {
  points: number;
  maxPoints: number;
  addPoint: () => void;
  resetPoints: () => void;
  updateMaxPoints: () => void;
}

const gameStore = create<store>((set, get) => ({
  points: 0,
  maxPoints: 0,
  addPoint: () => {
    set((_state) => ({ points: get().points + 1 }));
    get().updateMaxPoints();
  },
  updateMaxPoints: () => {
    if (get().points >= get().maxPoints) {
      set((_state) => ({ maxPoints: get().points }));
    }
  },
  resetPoints: () => {
    set((_state) => ({ points: 0 }));
  },
}));

export default gameStore;
