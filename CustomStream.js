const { Transform } = require('stream');//імпорт класу

class CustomStream extends Transform { //клас трансформації
    _transform(chunk, encoding, callback) { //функція переходу даних
        const result = chunk.toString().replace(/[a-z]/g, function (c) {
            return c.toUpperCase();
        });

        console.log(result);
        this.push(result);
        callback();
    }
}

module.exports = CustomStream;
