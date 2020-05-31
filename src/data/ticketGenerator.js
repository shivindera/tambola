/* eslint-disable no-loop-func */
const sortTicketNum = (ticket) => {
    let col = 0;
    let arr = [];
    while (col < 9) {
        arr = [ticket[0][col], ticket[1][col], ticket[2][col]];
        for (let i = 0; i < 3; i++) {
            for (let j = i + 1; j < 3; j++) {
                if (arr[i] !== 0 && arr[j] !== 0) {
                    if (arr[i] > arr[j]) {
                        const temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }
        ticket[0][col] = arr[0];
        ticket[1][col] = arr[1];
        ticket[2][col] = arr[2];
        col++;
    }
    return ticket;
};

const createTicket = (nums) => {
    let col;
    let row;
    let countCol = 0;
    let countRow = 0;
    let ticket;
    let flag = true;
    let i = 0;
    let count = 0;
    while (count !== 15) {
        ticket = [...Array(3)].map(() => [...Array(9)].map(() => 0));
        nums.forEach((num) => {
            flag = true;
            i = 0;
            while (flag && i <= 500) {
                col = num === 90 ? 8 : Math.floor(num / 10);
                row = Math.floor(Math.random() * 3);
                countCol = [0, 1, 2].reduce((acc, val) => (ticket[val][col] > 0 ? acc + 1 : acc), 0);
                countRow = ticket[row].reduce((acc, val) => (val > 0 ? acc + 1 : acc), 0);
                if (countRow < 5 && countCol < 3 && ticket[row][col] === 0) {
                    ticket[row][col] = num;
                    flag = false;
                }
                i++;
            }
        });
        count = ticket.reduce((elR, r) => elR + r.reduce((elAcc, el) => (el > 0 ? elAcc + 1 : elAcc), 0), 0);
    }
    return sortTicketNum(ticket);
};

const createTickets = () => {
    let all = [...Array(90).keys()].map((el) => el + 1);
    let tickets = [...Array(6)].map(() => ({
        indexes: Array(9).fill(0),
        nums: [],
    }));
    let indexFlags = Array(9).fill(false);
    let count = 0;
    let index;
    let num;
    let numIndex;
    let i = 0;
    while (count !== 90) {
        all = [...Array(90).keys()].map((el) => el + 1);
        tickets = [...Array(6)].map(() => ({
            indexes: Array(9).fill(0),
            nums: [],
        }));
        indexFlags = Array(9).fill(false);
        count = 0;
        i = 0;
        while (count !== 90 && i <= 5000) {
            index = Math.floor(Math.random() * 90);
            num = all[index];
            if (num === 0) {
                continue;
            }
            numIndex = num === 90 ? 8 : Math.floor(num / 10);
            let flag = true;
            tickets.forEach((ticket) => {
                if (
                    ((!indexFlags[numIndex] && ticket.indexes[numIndex] === 0) ||
                        (indexFlags[numIndex] && ticket.indexes[numIndex] < 3)) &&
                    ticket.nums.length < 15 &&
                    flag
                ) {
                    ticket.nums.push(num);
                    ticket.indexes[numIndex] += 1;
                    all[index] = 0;
                    count++;
                    flag = false;
                }
            });
            indexFlags[numIndex] = !!tickets.reduce((acc, ticket) => acc && ticket.indexes[numIndex], true);
            i++;
        }
    }
    return tickets.map((ticket) => createTicket(ticket.nums));
};

export default createTickets;
