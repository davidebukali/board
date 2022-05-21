import * as React from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Board} from '../Board';
import {ControlPanel} from '../ControlPanel';
import { useEffect, useState } from 'react';
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
    const [cells, setCells] = useState<CellItem[]>([]);
    const [activeCell, setActiveCell] = useState<ActiveColumnItem>({
        item: {
            status: 'on',
            color: 'red'
        },
        rowIndex: 0,
        columnIndex: 0
    });
    const [addEditBulb, setAddEditBulb] = useState<'add' | 'edit' | ''>('');
    const [myInterval, setMyInterval] = useState(0);
    useEffect(() => {
        const cachedCells = JSON.parse(localStorage.getItem('cells'));
        if (cachedCells) {
            setCells(cachedCells);   
        }
    }, []);

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
    };

    const handleBlink = (blinkPattern: string) => {
        if (blinkPattern === 'even') {
            if(myInterval > 0) clearInterval(myInterval);
            const myIntval = window.setInterval(blinkEven, 2000);   
            setMyInterval(myIntval);
        } else if (blinkPattern === 'random') {
            if(myInterval > 0) clearInterval(myInterval);
            const myIntval = window.setInterval(blinkRandom, 2000);   
            setMyInterval(myIntval);
        } else {
            clearInterval(myInterval);
        }
    };

    const blinkEven = () => {
        setCells(cells.map((cell, rowIndex) => {
            cell.columns.map((column, index) => {
                if ((index+rowIndex)%2 === 0) {
                    column.status = column.status === 'on' ? 'off' : 'on';   
                }
                return  column;
            })
            return cell;
        }));
        
    };

    const blinkRandom = () => {
        setCells(cells.map((cell, rowIndex) => {
            let selectedCell = cell.columns[Math.floor(Math.random() * cell.columns.length)];
            selectedCell.status = selectedCell.status === 'on' ? 'off' : 'on';
            return cell;
        }));
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

    const remove = (state: ActiveColumnItem) => {
        cells[state.rowIndex].columns.splice(state.columnIndex, 1);
        setCells(cells);
        setAddEditBulb('');
    };

    const saveConfig = () => {
        localStorage.setItem('cells', JSON.stringify(cells));
    };

    return (
        <div className="app-container">
            <div className="lead"><h1>Board Game</h1></div>
            <div className="table-container">
            <Card style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                { addEditBulb === '' ? 
                    <Board cells={cells} editCell={editCell} /> : 
                    <BoardEditor title={addEditBulb === 'edit' ? 'Edit Bulb' : 'Add Bulb'} handleSubmit={handleSubmit} handleRemove={remove} activeCell={activeCell} />}
                </Card.Body>
                </Card>
                </div>
            <div className="container mt-2">
                <ControlPanel handleSwitch={onOff} addBulb={addBulb} onSelect={handleBlink} saveConfig={saveConfig} />
            </div>
        </div>
    );
}
