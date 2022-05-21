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
    <h5>{cells.length ? "Click a square to edit" : "Click to Add a bulb"}</h5>
    <table>
      <tbody data-testid="table-body">
        {
          cells.map((row, index) => {
            return <BoardRow key={nanoid()} rowIndex={index} columns={row.columns} editCell={editCell} />
          })
        }
      </tbody>
    </table>
  </>
}
