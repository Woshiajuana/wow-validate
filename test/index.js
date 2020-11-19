

describe('wow-reptile', () => {
    it ('downloadImage', () => {
        require('../utils/download')
            .downloadImage(
                'https://img.mukewang.com/5facde180001f82518720764.jpg',
                './dist/',
            );
    })
});

describe('wow-reptile', () => {
    it ('PQueue', () => {
        const PQueue = require('../utils/p-queue');
        const queue = new PQueue(1);

        function delay(time) {
            return new Promise((resolve)=>{
                setTimeout(() => resolve(Date.now()), time);
            })
        }

        for (let i = 0; i < 15; i++) {
            let time = 2000;
            queue.push(delay, null, time)
                .then(result => console.log('result', i, result))
                .catch(error => console.log(error))
        }
    })
});

