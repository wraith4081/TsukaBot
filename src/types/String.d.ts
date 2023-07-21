declare interface String {
    endsWith(searchString: string, endPosition?: number): boolean;
    startsWith(searchString: string, position?: number): boolean;
    fill(...args: string[]): string;
    repeat(count: number): string;
}
