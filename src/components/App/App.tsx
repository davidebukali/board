import * as React from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Board} from '../Board';
import {ControlPanel} from '../ControlPanel';
import { useEffect, useState } from 'react';
import { BoardEditor } from '../BoardEditor/BoardEditor';
import { Card } from 'react-bootstrap';
import { ActiveColumnItem, CellItem, ColumnItem } from '../../types/boardCells';
import { addCellHelper, editCellHelper } from './utils';

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
    const [display, setDisplay] = useState<'add' | 'edit' | 'view'>('view');
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

    const addCell = () => {
        setDisplay('add');
    };

    const editCell = (item: ColumnItem, rowIndex: number, itemIndex: number) => {
        setDisplay('edit');
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
            if(selectedCell) {
                selectedCell.status = selectedCell.status === 'on' ? 'off' : 'on';
            }
            return cell;
        }));
    };

    const handleSubmit = (boardItem: ActiveColumnItem, submit: boolean) => {
        if (submit && display === 'add') {
            setCells(addCellHelper(cells, boardItem))
        } else if(display === 'edit') {
            setCells(editCellHelper(cells, boardItem));
        }
        setDisplay('view');
    };

    const remove = (state: ActiveColumnItem) => {
        cells[state.rowIndex].columns.splice(state.columnIndex, 1);
        setCells(cells);
        setDisplay('view');
    };

    const saveConfig = () => {
        localStorage.setItem('cells', JSON.stringify(cells));
    };

    return (
        <div className="w-50 mx-auto">
            <div className="lead"><h1>Board</h1></div>
            <div className="table-container">
            <Card style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                { display === 'view' ? 
                    <Board cells={cells} editCell={editCell} /> : 
                    <BoardEditor title={display === 'edit' ? 'Edit Cell' : 'Add Cell'} handleSubmit={handleSubmit} handleRemove={remove} activeCell={activeCell} />}
                </Card.Body>
                </Card>
            </div>
            <div className="container mt-2">
                <ControlPanel handleSwitch={onOff} addCell={addCell} onSelect={handleBlink} saveConfig={saveConfig} />
            </div>
        </div>
    );
}
