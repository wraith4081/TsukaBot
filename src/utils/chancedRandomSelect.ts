import PcgRandom from "./pcgRandom";

const pcgRandom = new PcgRandom(Date.now());

const randomNumber = () => pcgRandom.next32() / 0xffff_ffff;

export default function selectRandom<T extends { chance: number, [key: number | string]: any }>(items: T[]): T {
    const totalChance = items.reduce((acc, item) => acc + item.chance, 0);
    let random = randomNumber() * totalChance;

    for (const item of items) {
        if (random < item.chance) {
            return item;
        }

        random -= item.chance;
    }

    return items[items.length - 1];
}