import * as React from "react";
import { useState } from "react";
import { ColumnItem } from "../App";
import { BoardItem } from "./BoardItem";

interface AppProps {
  title?: string;
  columns: ColumnItem[];
}

export const BoardRow: React.FC<AppProps> = ({columns}) => {
  const [column, setColumn] = useState([]);

  return <tr>
        {columns.map((col, index) => {
          return <BoardItem key={index} column={col} />;
        })}
      </tr>
};
