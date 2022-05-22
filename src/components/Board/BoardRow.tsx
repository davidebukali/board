import * as React from "react";
import { useState } from "react";
import { ColumnItem } from "../../types/boardCells";
import { BoardItem } from "./BoardItem";
import { nanoid } from "nanoid";

interface BoardRowProps {
  title?: string;
  columns: ColumnItem[];
  rowIndex: number;
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const BoardRow: React.FC<BoardRowProps> = ({
  columns,
  editCell,
  rowIndex,
}) => (
  <tr>
    {columns.map((col, index) => {
      return (
        <BoardItem
          key={nanoid()}
          column={col}
          editCell={editCell}
          itemIndex={index}
          rowIndex={rowIndex}
        />
      );
    })}
  </tr>
);
