'use strict';

class Parser {

    constructor(project) {

        if (project === null || project === undefined) {
            throw new Error('No project was passed');
        }

        this.project = project;
        this.sprites = [];

        this.getSprites();
    }

    getSprites() {
        const targets = this.project.targets;

        targets.forEach(e => {
            if (!e.isStage) {
                this.sprites.push(e)
            }
        });
    }

    parse() {
        this.sprites.forEach(e => {
            console.log(`Sprite: ${e.name} action list\n------------`);

            const startBlockID = Object.keys(e.blocks)[0];
            let next = e.blocks[startBlockID];

            while (next !== null && next !== undefined) { // undefined is a fail-safe, interior null check of next ID should break the loop
                console.log(this.parseOne(next, e.blocks));

                if (next.next === null) {
                    break;
                }

                next = e.blocks[next.next];
            }

            console.log('--------');
        });
    }

    parseOne(block, blocks) {
        switch (block.opcode) {
            case 'event_whenflagclicked':
                return this.parseFlagStartBlock(block);
            case 'event_whenkeypressed':
                return this.parseKeyPressedStartBlock(block);
            case 'motion_movesteps':
                return this.parseMoveStepsBlock(block);
            case 'motion_turnright':
                return this.parseTurnRightBlock(block);
            case 'motion_turnleft':
                return this.parseTurnLeftBlock(block);
            case 'motion_gotoxy':
                return this.parseGotoXYBlock(block);
            case 'motion_changexby':
                return this.parseChangeXByBlock(block);
            case 'motion_changeyby':
                return this.parseChangeYByBlock(block);
            case 'motion_setx':
                return this.parseSetXBlock(block);
            case 'motion_sety':
                return this.parseSetYBlock(block);
            case 'looks_say':
                return this.parseSayBlock(block);
            case 'looks_sayforsecs':
                return this.parseSayForBlock(block);
            case 'looks_think':
                return this.parseThinkBlock(block);
            case 'looks_thinkforsecs':
                return this.parseThinkForBlock(block);
            case 'control_repeat':
                return this.parseRepeatBlock(block, blocks);
            case 'control_repeat_until':
                break;
            case 'control_forever':
                return this.parseForeverBlock(block, blocks);
            case 'control_wait':
                return this.parseWaitBlock(block);
            case 'operator_add':
                return this.parseAddBlock(block, blocks);
            case 'operator_subtract':
                return this.parseSubtractBlock(block, blocks);
            case 'operator_multiply':
                return this.parseMultiplyBlock(block, blocks);
            case 'operator_divide':
                return this.parseDivideBlock(block, blocks);
            case 'operator_random':
                return this.parseRandomBlock(block, blocks);
            default:
                break;
        }
    }

    parseFlagStartBlock() {
        return 'Start when flag is clicked\n';
    }

    parseKeyPressedStartBlock(block) {
        const key = block.fields.KEY_OPTION[0];

        return `Start when ${key === 'any' ? 'any key' : `the (${key}) key`} is pressed\n`;
    }

    parseMoveStepsBlock(block) {
        const stepCount = Number.parseInt(block.inputs.STEPS[1][1], 10);

        return `Move ${stepCount} step${stepCount === 1 ? '' : 's'}\n`;
    }

    parseTurnRightBlock(block) {
        const degrees = Number.parseInt(block.inputs.DEGREES[1][1], 10);

        return `Turn ${degrees} degree${degrees === 1 ? '' : 's'} to the right\n`;
    }

    parseTurnLeftBlock(block) {
        const degrees = Number.parseInt(block.inputs.DEGREES[1][1], 10);

        return `Turn ${degrees} degree${degrees === 1 ? '' : 's'} to the left\n`;
    }

    parseGotoXYBlock(block) {
        const x = Number.parseInt(block.inputs.X[1][1], 10);
        const y = Number.parseInt(block.inputs.Y[1][1], 10);

        return `Goto to X: ${x}, Y: ${y}\n`;
    }

    parseChangeXByBlock(block) {
        const x = Number.parseInt(block.inputs.DX[1][1], 10);

        return `Change X by ${x}\n`;
    }

    parseChangeYByBlock(block) {
        const y = Number.parseInt(block.inputs.DY[1][1], 10);

        return `Change Y by ${y}\n`;
    }

    parseSetXBlock(block) {
        const x = Number.parseInt(block.inputs.X[1][1], 10);

        return `Set X to ${x}\n`;
    }

    parseSetYBlock(block) {
        const y = Number.parseInt(block.inputs.Y[1][1], 10);

        return `Set Y to ${y}\n`;
    }

    parseSayBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];

        return `Say ${msg}\n`;
    }

    parseSayForBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];
        const seconds = Number.parseInt(block.inputs.SECS[1][1], 10);

        return `Say ${msg} for ${seconds} second${seconds === 1 ? '' : 's'}\n`;
    }

    parseThinkBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];

        return `Thinking about ${msg}\n`;
    }

    parseThinkForBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];
        const seconds = Number.parseInt(block.inputs.SECS[1][1], 10);

        return `Thinking about ${msg} for ${seconds} second${seconds === 1 ? '' : 's'}\n`;
    }

    parseRepeatBlock(block, blocks) {
        const times = Number.parseInt(block.inputs.TIMES[1][1], 10);

        let sequence = `Repeat for ${times} {\n`;

        const startBlockID = block.inputs.SUBSTACK[1];
        let next = blocks[startBlockID];

        while (next !== null && next !== undefined) {
            sequence += this.parseOne(next, blocks);

            if (next.next === null) {
                break;
            }

            next = blocks[next.next];
        }

        sequence += '}\n';

        return sequence;
    }

    parseForeverBlock(block, blocks) {
        let sequence = `Repeat forever {\n`;

        const startBlockID = block.inputs.SUBSTACK[1];
        let next = blocks[startBlockID];

        while (next !== null && next !== undefined) {
            sequence += this.parseOne(next, blocks);

            if (next.next === null) {
                break;
            }

            next = blocks[next.next];
        }

        sequence += '}\n';

        return sequence;
    }

    parseWaitBlock(block) {
        const duration = Number.parseInt(block.inputs.DURATION[1][1], 10);

        return `Waiting for ${duration} second${duration === 1 ? '' : 's'}\n`;
    }

    checkOperands(inputs) {
        const NUM1 = inputs.NUM1;
        const NUM2 = inputs.NUM2;

        const op1_type = NUM1[0];
        const op1 = op1_type === 1 ? Number.parseInt(NUM1[1][1]) : NUM1[1]; // 1 = User input, 3 = Recursive operators
        if (op1 === null || op1 === undefined || op1 === '') {
            throw new Error(`Incorrect value for operand one: ${op1}`);
        }


        const op2_type = NUM2[0];
        const op2 = op2_type === 1 ? Number.parseInt(NUM2[1][1]) : NUM2[1];
        if (op2 === null || op2 === undefined || op2 === '') {
            throw new Error(`Incorrect value for operand two: ${op1}`);
        }

        return [op1_type, op1, op2_type, op2];
    }

    parseAddBlock(block, blocks) {
        const [op1_type, op1, op2_type, op2] = this.checkOperands(block.inputs);
        let str = '';

        if (op1_type === 1) {
            str += `(${op1} + `;
        } else {
            const next = blocks[op1];

            str += this.parseOne(next, blocks) + ' + ';
        }

        if (op2_type === 1) {
            str += op2;
        } else {
            const next = blocks[op2];

            str += this.parseOne(next, blocks);
        }

        str += ')';

        return str;
    }

    parseSubtractBlock(block, blocks) {
        const [op1_type, op1, op2_type, op2] = this.checkOperands(block.inputs);
        let str = '';

        if (op1_type === 1) {
            str += `(${op1} - `;
        } else {
            const next = blocks[op1];

            str += this.parseOne(next, blocks) + ' - ';
        }

        if (op2_type === 1) {
            str += op2;
        } else {
            const next = blocks[op2];

            str += this.parseOne(next, blocks);
        }

        str += ')';

        return str;
    }

    parseMultiplyBlock(block, blocks) {
        const [op1_type, op1, op2_type, op2] = this.checkOperands(block.inputs);
        let str = '';

        if (op1_type === 1) {
            str += `(${op1} * `;
        } else {
            const next = blocks[op1];

            str += this.parseOne(next, blocks) + ' * ';
        }

        if (op2_type === 1) {
            str += op2;
        } else {
            const next = blocks[op2];

            str += this.parseOne(next, blocks);
        }

        str += ')';

        return str;
    }

    parseDivideBlock(block, blocks) {
        const [op1_type, op1, op2_type, op2] = this.checkOperands(block.inputs);
        let str = '';

        if (op1_type === 1) {
            str += `(${op1} / `;
        } else {
            const next = blocks[op1];

            str += this.parseOne(next, blocks) + ' / ';
        }

        if (op2_type === 1) {
            str += op2;
        } else {
            const next = blocks[op2];

            str += this.parseOne(next, blocks);
        }

        str += ')';

        return str;
    }

    parseRandomBlock(block, blocks) {
        /*
         * the form of the random block input is {FROM, TO}
         * to save the hassle of re-typing the code, re-name FROM to NUM1 and TO to NUM2 and pass the inputs to
         * checkOperands function
         */
        block.inputs.NUM1 = block.inputs.FROM;
        delete block.inputs.FROM;

        block.inputs.NUM2 = block.inputs.TO;
        delete block.inputs.TO;

        const [op1_type, op1, op2_type, op2] = this.checkOperands(block.inputs);

        let str = '(Choose a random number from: ';

        if (op1_type === 1) {
            str += `${op1} to `;
        } else {
            const next = blocks[op1];

            str += this.parseOne(next, blocks) + ' to ';
        }

        if (op2_type === 1) {
            str += op2;
        } else {
            const next = blocks[op2];

            str += this.parseOne(next, blocks);
        }

        str += ')'

        return str;
    }

    getProject() {
        return this.project;
    }
}

module.exports = Parser;