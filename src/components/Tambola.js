import React, { useContext, useState } from 'react';
import { TambolaContext } from '../contexts/TambolaContext';

const getDrawSequence = () => {
    let count = 0;
    let obj = {};
    let arr = [];
    let num;
    while (count !== 90) {
        num = Math.ceil(Math.random() * 90);
        if (!(num in obj)) {
            arr.push(num);
            obj[num] = 1;
            count = arr.length;
        }
    }
    return arr;
}

const getBoardHtml = (sequence) => {
    return (
        <table className='board'>
            <tbody>
                {[...Array(9)].map((row, index) => (
                    <tr key={index}>
                        {[...Array(10)].map((num, index2) => {
                            const nmbr = Number(index2 !== 9 ? `${index}${index2 + 1}` : `${index + 1}0`);
                            return (
                                <td
                                    key={nmbr}
                                    className={`board-number${sequence.includes(nmbr) ? '' : ' board-number-done'}`}
                                >
                                    {nmbr}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Tambola = () => {
    const [num, setNum] = useState(0);
    const { tambola, setTambola } = useContext(TambolaContext);

    const { sequence } = tambola;

    return (
        <div className='tambola-board'>
            <h1>Tambola Board</h1>
            <div className='board-current-number'>
                <span>{num ? num : ''}</span>
            </div>
            <div className='board-button-container'>
                <button
                    disabled={sequence.length === 0}
                    onClick={() => {
                        setNum(sequence.shift());
                        setTambola({
                            sequence,
                        });
                    }}
                >
                    Next
                </button>
            </div>
            <div className='board-container'>{getBoardHtml(sequence)}</div>
            <div className='board-reset-container'>
                <button
                    onClick={() => {
                        setNum(0);
                        setTambola({
                            sequence: getDrawSequence(),
                        });
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Tambola;
