import { initData } from "../data";

export const ERROR = { error: expect.any(String) };
export const NUM = expect.any(Number);

export function clear() {
    initData([], [], []);
}
