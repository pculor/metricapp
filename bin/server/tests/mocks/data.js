"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mockData = {
    sampleInput: {
        name: 'NFT',
        value: '20',
    },
    emptyInput: {
        name: '',
        value: '',
    },
    wrongInputValue: {
        name: 'NFT',
        value: 'string',
    },
    wrongInputName: {
        name: 123,
        value: 10,
    },
    wrongInputName2: {
        name: '123',
        value: 10,
    },
};
exports.default = mockData;
