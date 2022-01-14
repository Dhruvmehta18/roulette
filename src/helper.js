const getReturnAmount = (amount, ratio) => {
    return amount * ratio;
}

const randomNumber = (min = 0, max = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    getReturnAmount,
    totalAmtToBePaid,
    randomNumber
}