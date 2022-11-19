export interface ListItem { id: string, name: string };
export interface OptionProps { value: string, label: string, key?: string };

export type ListService = Array<ListItem>;
export type ListOptions = Array<OptionProps>;
