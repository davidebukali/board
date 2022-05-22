export interface ColumnItem {
    status: 'on' | 'off';
    color: string;
}

export interface CellItem {
    columns: ColumnItem[];
}

export interface ActiveColumnItem {
    item: ColumnItem;
    rowIndex: number;
    columnIndex: number;
}
