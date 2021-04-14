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
            default:
                break;
        }
    }

    parseFlagStartBlock() {
        return 'Start when flag is clicked';
    }

    parseKeyPressedStartBlock(block) {
        const key = block.fields.KEY_OPTION[0];

        return `Start when ${key === 'any' ? 'any key' : `the (${key}) key`} is pressed`;
    }

    parseMoveStepsBlock(block) {
        const stepCount = Number.parseInt(block.inputs.STEPS[1][1], 10);

        return `Move ${stepCount} step${stepCount === 1 ? '' : 's'}`;
    }

    parseTurnRightBlock(block) {
        const degrees = Number.parseInt(block.inputs.DEGREES[1][1], 10);

        return `Turn ${degrees} degree${degrees === 1 ? '' : 's'} to the right`;
    }

    parseTurnLeftBlock(block) {
        const degrees = Number.parseInt(block.inputs.DEGREES[1][1], 10);

        return `Turn ${degrees} degree${degrees === 1 ? '' : 's'} to the left`;
    }

    parseGotoXYBlock(block) {
        const x = Number.parseInt(block.inputs.X[1][1], 10);
        const y = Number.parseInt(block.inputs.Y[1][1], 10);

        return `Goto to X: ${x}, Y: ${y}`;
    }

    parseChangeXByBlock(block) {
        const x = Number.parseInt(block.inputs.DX[1][1], 10);

        return `Change X by ${x}`;
    }

    parseChangeYByBlock(block) {
        const y = Number.parseInt(block.inputs.DY[1][1], 10);

        return `Change Y by ${y}`;
    }

    parseSetXBlock(block) {
        const x = Number.parseInt(block.inputs.X[1][1], 10);

        return `Set X to ${x}`;
    }

    parseSetYBlock(block) {
        const y = Number.parseInt(block.inputs.Y[1][1], 10);

        return `Set Y to ${y}`;
    }

    parseSayBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];

        return `Say ${msg}`;
    }

    parseSayForBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];
        const seconds = Number.parseInt(block.inputs.SECS[1][1], 10);

        return `Say ${msg} for ${seconds} second${seconds === 1 ? '' : 's'}`;
    }

    parseThinkBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];

        return `Thinking about ${msg}`;
    }

    parseThinkForBlock(block) {
        const msg = block.inputs.MESSAGE[1][1];
        const seconds = Number.parseInt(block.inputs.SECS[1][1], 10);

        return `Thinking about ${msg} for ${seconds} second${seconds === 1 ? '' : 's'}`;
    }

    parseRepeatBlock(block, blocks) {
        return this.deepenInsideRepeatBlock(block, blocks);
    }

    deepenInsideRepeatBlock(block, blocks) {
        const times = Number.parseInt(block.inputs.TIMES[1][1], 10);

        let sequence = `Repeat for ${times} {\n`;

        const startBlockID = block.inputs.SUBSTACK[1];
        let next = blocks[startBlockID];

        while (next !== null && next !== undefined) {
            if (next.opcode !== 'control_repeat' && next.opcode !== 'control_repeat_until'
                && next.opcode !== 'control_forever' ) {
                sequence += this.parseOne(next) + '\n';
            } else if (next.opcode === 'control_repeat') {
                sequence += this.deepenInsideRepeatBlock(next, blocks);
            } else if (next.opcode === 'control_repeat_until') {
                // TODO: Handle repeat until
            } else if (next.opcode === 'control_forever') {
                sequence += this.deepenInsideForeverBlock(next, blocks);
            }

            if (next.next === null) {
                break;
            }

            next = blocks[next.next];
        }

        sequence += '}\n';

        return sequence;
    }

    parseForeverBlock(block, blocks) {
        return this.deepenInsideForeverBlock(block, blocks);
    }

    deepenInsideForeverBlock(block, blocks) {
        let sequence = `Repeat forever {\n`;

        const startBlockID = block.inputs.SUBSTACK[1];
        let next = blocks[startBlockID];

        while (next !== null && next !== undefined) {
            if (next.opcode !== 'control_repeat' && next.opcode !== 'control_repeat_until'
                && next.opcode !== 'control_forever' ) {
                sequence += this.parseOne(next) + '\n';
            } else if (next.opcode === 'control_repeat') {
                sequence += this.deepenInsideRepeatBlock(next, blocks);
            } else if (next.opcode === 'control_repeat_until') {
                // TODO: Handle repeat until
            } else if (next.opcode === 'control_forever') {
                sequence += this.deepenInsideForeverBlock(next, blocks);
            }

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

        return `Waiting for ${duration} second${duration === 1 ? '' : 's'}`;
    }

    getProject() {
        return this.project;
    }
}

module.exports = Parser;