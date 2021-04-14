#! /usr/bin/env node

'use strict';

const LoadJson = require('./toolkit/FileHandler').loadJSON;
const Parser = require('./toolkit/Parser');


const scratchProjectPath = process.argv[2];

const project = LoadJson(scratchProjectPath);

const parsedProject = new Parser(project);

parsedProject.parse();