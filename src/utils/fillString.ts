declare interface String {
    fill(...args: string[]): string;
}

(String.prototype as any).fill = function(...args: string[]) {
    return this.replace(/\$(\d+)/g, (match: any, number: any) => {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
}
