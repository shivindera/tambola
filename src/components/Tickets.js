import React, { useContext, useState, useEffect } from 'react';
import { TambolaContext } from '../contexts/TambolaContext';
import createTickets from '../data/ticketGenerator';

const getTicketHtml = (ticket, ticketNum) => {
    return (
        <div className='ticket-container' key={ticketNum}>
            <p className='ticket-head'>#{ticketNum + 1}</p>
            <table key={ticketNum} className='ticket'>
                <tbody>
                    {ticket.map((row, index) => (
                        <tr key={`${ticketNum}${index}`}>
                            {row.map((num, ind) => (
                                <td key={`${ticketNum}${index}${ind}`}>{num ? num : ''}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const getTickets = (tickets) => {
    if (tickets.length === 0) return null;
    return [...Array(Math.ceil(tickets.length / 6))].map((el, index) => (
        <div className='ticket-sheet-container' key={index}>
            {tickets
                .filter((el, ind) => ind >= index * 6 && ind < (index + 1) * 6)
                .map((ticket, i) => getTicketHtml(ticket, index * 6 + i))}
        </div>
    ));
};

const Tickets = () => {
    const [count, setCount] = useState(36);
    const [loading, setLoading] = useState(false);
    const { tambola, setTambola } = useContext(TambolaContext);

    const { tickets } = tambola;

    useEffect(() => {
        setLoading(false);
    }, [tickets]);

    useEffect(() => {
        if (loading) {
            setTambola({
                tickets: [...Array(Math.ceil(count / 6))].reduce((acc) => [...acc, ...createTickets()], []),
            });
        }
    }, [count, loading, setTambola]);

    return (
        <div className='tambola-tickets'>
            <h1>Tambola Tickets</h1>
            <div className={`tickets-input-container${loading ? ' tickets-input-container--loading' : ''}`}>
                <input type='number' onChange={(e) => {
                    let val = e.target.value;
                    val = val > 1000 ? 1000 : val;
                    val = val < 1 ? 1 : val;
                    setCount(val);
                }} value={count} />
                <button onClick={() => setLoading(true)}>Generate</button>
            </div>
            <div className='tickets-container'>{getTickets(tickets)}</div>
        </div>
    );
};

export default Tickets;
