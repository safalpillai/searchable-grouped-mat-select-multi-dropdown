export interface IDropdownEntries {
    value: string;
    text: string;
}
export interface IGroupedDropdownEntries {
    componentText: string;
    componentValue: string;
    iterables: IDropdownEntries[];
}
export interface ISearchOutput {
    selections: Array<string>;
    unselections?: Array<string>;
}
