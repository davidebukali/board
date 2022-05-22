import * as React from 'react';
import { useState } from 'react';
import { CellItem, ColumnItem } from '../../types/boardCells';
import { BoardRow } from './BoardRow';
import { nanoid } from 'nanoid';

interface BoardProps {
  cells: CellItem[];
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const Board: React.FC<BoardProps> = ({ cells, editCell }) => {
  return <>
    <h5>{cells.length ? "Click a square to edit" : "Click 'Add a bulb' button below"}</h5>
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
