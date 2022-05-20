import * as React from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Board} from '../Board/Board';
import {ControlPanel} from '../ControlPanel';
import { useState } from 'react';
import { BoardEditor } from '../Board/BoardEditor';
import { Card } from 'react-bootstrap';

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

export const App: React.FC = () => {
    const [cells, setCells] = useState<CellItem[]>([{columns: [
        {
            status: 'on',
            color: 'red',
        },
        {
            status: 'on',
            color: 'green',
        },
    ] }]);
    const [activeCell, setActiveCell] = useState<ActiveColumnItem>({
        item: {
            status: 'off',
            color: ''
        },
        rowIndex: 0,
        columnIndex: 0
    });
    const [addEditBulb, setAddEditBulb] = useState<'add' | 'edit' | ''>('');
    const maxRow = 3;
    const maxColumn = 3;

    const onOff = (event: boolean) => {
        setCells(cells.map((cell) => {
            cell.columns.map((column) => {
                column.status = event ? 'on' : 'off';
                return  column;
            })
            return cell;
        }));
    };

    const addBulb = () => {
        setAddEditBulb('add');
    };

    const editCell = (item: ColumnItem, rowIndex: number, itemIndex: number) => {
        setAddEditBulb('edit');
        setActiveCell({
            item,
            rowIndex: rowIndex,
            columnIndex: itemIndex
        });
        // console.log(`Row ${rowIndex}`);
        // console.log(`column ${itemIndex}`);
    };

    const handleSelect = (blinkPattern: string) => {
        console.log(blinkPattern);
    };

    const handleSubmit = (boardItem: ActiveColumnItem, submit: boolean) => {
        if (submit && addEditBulb === 'add') {
            if (cells.length === 0) {
                setCells([{columns: [
                    boardItem.item
                ] }]);
            } else if (cells.length <= 3) {
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].columns.length <= 2) {
                        cells[i].columns.push(boardItem.item);
                        setCells(cells);
                        break;
                    }
                    if (cells.length <= 2 && i === cells.length - 1) {
                        cells.push({columns: [boardItem.item]});
                        setCells(cells);
                        break;
                    }
                }
            }
        } else if(addEditBulb === 'edit') {
            setCells(cells.map((cell, index) => {
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
            }));
        }
        setAddEditBulb('');
    };

    return (
        <div className="app-container">
            <div className="lead"><h1>Board Game</h1></div>
            <div className="table-container">
            <Card style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                { addEditBulb === '' ? 
                    <Board cells={cells} editCell={editCell} /> : 
                    <BoardEditor title={addEditBulb === 'edit' ? 'Edit Bulb' : 'Add Bulb'} handleSubmit={handleSubmit} activeCell={activeCell} />}
                </Card.Body>
                </Card>
                </div>
            <div className="container mt-2">
                <ControlPanel handleSwitch={onOff} addBulb={addBulb} onSelect={handleSelect} />
            </div>
        </div>
    );
}
