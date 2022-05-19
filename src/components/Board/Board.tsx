import * as React from 'react';
import { useState } from 'react';
import { CellItem } from '../App';
import { BoardRow } from './BoardRow';

interface AppProps {
  title?: string
  cells: CellItem[];
}

export const Board: React.FC<AppProps> = ({ title, cells }) => {
  const [row, setRow] = useState([]);

  return <>
    <table>
      <tbody>
        {
          cells.map((row) => {
            return <BoardRow columns={row.columns} />
          })
        }
      </tbody>
    </table>
  </>
}
