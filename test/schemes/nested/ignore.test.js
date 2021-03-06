'use strict';

const test = require('ava');
const mockFs = require('mock-fs');
const toArray = require('stream-to-array');

const walk = require('../../../lib/index');

const options = {
    levels: {
        blocks: { scheme: 'nested' }
    }
};

test.afterEach('restore fs', () => {
    mockFs.restore();
});

test('should end if levels are not specified', t => {
    mockFs({});

    return toArray(walk([], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore empty level', t => {
    mockFs({
        blocks: {}
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore files without extension', t => {
    mockFs({
        blocks: {
            block: {
                block: ''
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore files with no BEM basename in block dir', t => {
    mockFs({
        blocks: {
            block: {
                '^_^.tech': ''
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore files with no BEM basename in mod dir', t => {
    mockFs({
        blocks: {
            block: {
                _mod: {
                    '^_^.tech': ''
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore files with no BEM basename in elem dir', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    '^_^.tech': ''
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore files with no BEM basename in elem mod dir', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    _mod: {
                        '^_^.tech': ''
                    }
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore dirs with no BEM basename in block dir', t => {
    mockFs({
        blocks: {
            block: {
                '^_^': {}
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore dirs with no BEM basename in mod dir', t => {
    mockFs({
        blocks: {
            block: {
                _mod: {
                    '^_^': {}
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore dirs with no BEM basename in elem dir', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    '^_^': {}
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore dirs with no BEM basename in elem mod dir', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    _mod: {
                        '^_^': {}
                    }
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore file in root of level', t => {
    mockFs({
        blocks: {
            'block.tech': ''
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore block if filename not match with dirname', t => {
    mockFs({
        blocks: {
            block: {
                'other-block.tech': ''
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore block mod if filename not match with dirname', t => {
    mockFs({
        blocks: {
            block: {
                _mod: {
                    'block_other-mod.tech': ''
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore elem if filename not match with dirname', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    'block__other-elem.tech': ''
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});

test('should ignore elem mod if filename not match with dirname', t => {
    mockFs({
        blocks: {
            block: {
                __elem: {
                    _mod: {
                        'block__elem_other-mod.tech': ''
                    }
                }
            }
        }
    });

    return toArray(walk(['blocks'], options))
        .then(files => t.deepEqual(files, []));
});
