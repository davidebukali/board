import * as React from 'react';
import { useState } from 'react';
import { CellItem, ColumnItem } from '../App';
import { BoardRow } from './BoardRow';
import { nanoid } from 'nanoid';

interface AppProps {
  title?: string
  cells: CellItem[];
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const Board: React.FC<AppProps> = ({ title, cells, editCell }) => {
  const [row, setRow] = useState([]);

  return <>
    <h5>Click a square to edit</h5>
    <table>
      <tbody>
        {
          cells.map((row, index) => {
            return <BoardRow key={nanoid()} rowIndex={index} columns={row.columns} editCell={editCell} />
          })
        }
      </tbody>
    </table>
  </>
}
