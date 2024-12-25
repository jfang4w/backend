export function solve(...promises) {
    return Promise.all(promises);
}

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}