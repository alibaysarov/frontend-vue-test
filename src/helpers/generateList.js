const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generateRow = () => {
    const row = [];
    for (let i = 0; i < 10; i++) {
        row.push(generateRandomInt(0, 100))
    }
    return row;
}

export const generateList = (num = 100) => {
    const res = [];
    for (let i = 0; i < num; i++) {
        res.push(generateRow())
    }
    return res;
}