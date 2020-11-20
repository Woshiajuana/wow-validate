'use strict';

let validator = require('validator');

function nonempty(value) {
    return typeof value !== 'undefined' && value !== '' && value !== null && !Number.isNaN(value);
}

class Validate {
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.regular = Object.assign({ nonempty }, validator, this.config.regular);
        this._log('start register');
    }
    initResult(expect) {
        this.sucResult = Object.prototype.toString.call(expect) === '[object Array]' ? [] : {};
        this.errResult = [];
    }
    async check(source, expect, config = {}) {
        let { mode, errPrompt, trim } = Object.assign({}, this.config, config);
        delete config.regular;
        if (typeof expect === 'function') {
            expect = expect(this.regular);
        }
        this.initResult(expect);
        try {
            let isValidate = true;
            forEach(expect, (uses, key) => {
                let value = source[key];
                const valueType = typeof value;
                const isUndefined = valueType === 'undefined';
                if (valueType === 'string' && trim) value = value.trim();

                /**
                 * 校验没有，直接赋值返回
                 * */
                if (!uses || !uses.length) {
                    return !isUndefined && (this.sucResult[key] = value);
                }

                /**
                 * 判断
                 * */
                forEach(uses, (use) => {
                    let typeString = Object.prototype.toString.apply(use);
                    let ruleFn, prompt;

                    /**
                     * 如果是对象
                     * 拆分规则
                     * 判断是否需要对值进行默认赋值、类型转换
                     * */
                    if (typeString === '[object Object]') {
                        prompt = use.prompt;
                        typeString = Object.prototype.toString.apply(use);
                        if (use.type === 'Number') {
                            value = +value;
                        }
                        if (typeof use.default !== 'undefined' && !this.regular.nonempty(value)) {
                            value = use.default;
                        }
                        use = use.rule;
                    }
                    if (typeString === '[object RegExp]') {
                        ruleFn = use.text;
                    } else if (typeString === '[object String]') {
                        ruleFn = this.regular[use];
                    } else if (typeString === '[object Function]') {
                        ruleFn = use;
                    }
                    if (ruleFn && !ruleFn(value)) {
                        this.errResult.push(`${prompt || errPrompt[use] || errPrompt.common}:${key}`);
                        if (mode === 'one') throw '';
                        isValidate = false;
                        return null;
                    }
                });
                !isUndefined && (this.sucResult[key] = value);
            });
            if (!isValidate) throw '';
            return Promise.resolve(this.sucResult);
        } catch (err) {
            this.errResult = this.errResult.length ? this.errResult.join(',') : typeof err === 'object' ? JSON.stringify(err) : err;
            return Promise.reject(this.errResult);
        }
    }
    _log(str) {
        let { useLog = true } = this.config;
        useLog && this.app.logger.info(`[egg-wow-validate] ${str}`);
    }
}

function forEach(obj, callback) {
    if (Object.prototype.toString.call(obj) === '[object Array]') return obj.forEach(callback);
    for (let key in obj) {
        callback && callback(obj[key], key);
    }
}

function createClient(config, app) {
    return new Validate(app, config);
}

module.exports = app => {
    app.addSingleton('validate', createClient);
};
