

const validate = require('../src/validate');

describe('validate', () => {
    it ('validateArr', () => {

        const source = {
            name: '',
        };

        const expect = {
            name: [
                'required'
            ],
            age: [
                {
                    required: true,
                },
            ],

        };

        validate(source, expect)

    });

    it ('validateObject', () => {
        const source = {
            name: {
                value: '',
                _v: false,
                rules: [
                    { rule: '', prompt: '' },
                ],
            },
        };
        validate(source, exports);
    });
});
