const _ = require('lodash');
const express = require('express');
const db = require('../db/in_memory');
const utils = require('./utils');

const router = express.Router();

// API to fetch SS for all salaries
router.get('/stats', (req, res) => {
    res.json(utils.calculateSS(db.getAllRecordsSalary()));
});

// API to fetch SS for "on_contract" employees
router.get('/stats/contract', (req, res) => {
    res.json(utils.calculateSS(db.getContractRecordsSalary()));
});

// API to fetch SS for each department
router.get('/stats/departments', (req, res) => {
    const departmentRecords = db.getRecordsByDepartmentsSalary();
    const departmentStats = _.mapValues(departmentRecords, utils.calculateSS);
    res.json(departmentStats);
});

// API to fetch SS for each department and sub-department
router.get('/stats/departments/subdepartments', (req, res) => {
    const deptSubDeptRecords = db.getRecordsByDepartmentAndSubDepartmentSalary();
    const deptSubDeptStats = _.mapValues(deptSubDeptRecords, utils.calculateSS);
    res.json(deptSubDeptStats);
});

module.exports = router;
