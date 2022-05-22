import { ActiveColumnItem, CellItem } from "../../../types/boardCells";

export const addCellHelper = (cells: CellItem[], boardItem: ActiveColumnItem): CellItem[] => {
    if (cells.length === 0) {
        return [{columns: [
            boardItem.item
        ]}];
    } else if (cells.length <= 3) {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].columns.length <= 2) {
                cells[i].columns.push(boardItem.item);
                return cells;
            }
            if (cells.length <= 2 && i === cells.length - 1) {
                cells.push({columns: [boardItem.item]});
                return cells;
            }
        }
    }
    return cells;
};

export const editCellHelper = (cells: CellItem[], boardItem: ActiveColumnItem): CellItem[] => {
    return cells.map((cell, index) => {
        if(index === boardItem.rowIndex) {
            cell.columns.map((column, columnIndex) => {
                if(columnIndex === boardItem.columnIndex) {
                    column.status = boardItem.item.status;
                    column.color = boardItem.item.color;
                }
                return  column;
            })
        }
        return cell;
    });
};
