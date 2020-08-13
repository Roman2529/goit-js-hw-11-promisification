//---------task-01

// const delay = ms => {
//     const promise = new Promise((res) => {
//         setTimeout(() => {
//             res(ms);
//         }, ms);
//     });
//     return promise;
// };

// const logger = time => console.log(`Resolved after ${time}ms`);

// // Вызовы функции для проверки
// delay(2000).then(logger); // Resolved after 2000ms
// delay(1000).then(logger); // Resolved after 1000ms
// delay(1500).then(logger); // Resolved after 1500ms

//----------task-02

// const users = [
//     { name: 'Mango', active: true },
//     { name: 'Poly', active: false },
//     { name: 'Ajax', active: true },
//     { name: 'Lux', active: false },
// ];

// const toggleUserState = (allUsers, userName, callback) => {
//     const updatedUsers = allUsers.map(user =>
//         user.name === userName ? { ...user, active: !user.active } : user,
//     );

//     callback(updatedUsers);
// };
// const toggleUserState2 = (allUsers, userName) => {
//     return new Promise((res, rej) => {
//         const updatedUsers = allUsers.map(user =>
//             userName === userName ? { ...user, active: !user.active } : user
//         );
//         res(updatedUsers);
//     })
// }

// const logger = updatedUsers => console.table(updatedUsers);

// /*
//  * Сейчас работает так
//  */
// toggleUserState(users, 'Mango', logger);
// toggleUserState(users, 'Lux', logger);

// /*
//  * Должно работать так
//  */
// toggleUserState2(users, 'Mango').then(logger);
// toggleUserState2(users, 'Lux').then(logger);

//--------task-03

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction, onSuccess, onError) => {
    const delay = randomIntegerFromInterval(200, 500);

    setTimeout(() => {
        const canProcess = Math.random() > 0.3;

        if (canProcess) {
            onSuccess(transaction.id, delay);
        } else {
            onError(transaction.id);
        }
    }, delay);
};
//--promise

const makeTransaction2 = transaction => {
    const delay = randomIntegerFromInterval(200, 500);
    return new Promise((res, rej) => {
        const id = transaction.id;
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;
            if (canProcess) {
                const result = { id, delay };
                res(result);
            } else {
                rej(transaction.id);
            }  
        }, delay);
    });
};

const logSuccess = (id, time) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logSuccess2 = (result) => {
    console.log(`Transaction ${result.id} processed in ${result.delay}ms`);
}

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Работает так
 */
makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction2({ id: 70, amount: 150 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 71, amount: 230 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 72, amount: 75 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 73, amount: 100 })
    .then(logSuccess2)
    .catch(logError);

