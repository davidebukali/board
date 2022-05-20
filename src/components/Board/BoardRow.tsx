import * as React from "react";
import { useState } from "react";
import { ColumnItem } from "../App";
import { BoardItem } from "./BoardItem";
import { nanoid } from 'nanoid';

interface AppProps {
  title?: string;
  columns: ColumnItem[];
  rowIndex: number;
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const BoardRow: React.FC<AppProps> = ({columns, editCell, rowIndex}) => {
  const [column, setColumn] = useState([]);

  return <tr>
        {columns.map((col, index) => {
          return <BoardItem key={nanoid()} column={col} editCell={editCell} itemIndex={index} rowIndex={rowIndex} />;
        })}
      </tr>
};
