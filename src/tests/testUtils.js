import { setData } from "../data";

export const ERROR = { error: expect.any(String) };

export function clear() {
    setData({
        users: [],
        articles: []
    });
}