const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

import('random').then((module) => {
    const random = module.default;

    const FILE_PATH = './data.json';

    const makeCommit = async (n) => {
        if (n === 0) return await simpleGit().push();

        const x = random.int(0, 54);
        const y = random.int(0, 6);
        const DATE = moment().subtract(3, 'y').add(1, 'd')
                        .add(x, 'w').add(y, 'd').format();

        const data = {
            date: DATE
        };

        console.log(DATE);

        await jsonfile.writeFile(FILE_PATH, data);

        const result = await simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE });
        console.log('Changes committed successfully:', result);

        await makeCommit(--n);
    };

    makeCommit(500);
});
