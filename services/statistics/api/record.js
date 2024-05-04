const express = require('express');
const { body: validationBody, validationResult } = require('express-validator');
const  db = require('../db/in_memory');

const router = express.Router();

// Validation rules
const recordValidationRules = [
    validationBody('name').isString().trim().notEmpty().withMessage('Name must be a non-empty string'),
    validationBody('salary').isNumeric().withMessage('Salary must be a numeric string'),
    validationBody('currency').isString().trim().withMessage('Currency must be a valid currency code string'),
    validationBody('department').isString().trim().notEmpty().withMessage('Department must be a non-empty string'),
    validationBody('sub_department').isString().trim().notEmpty().withMessage('Sub-department must be a non-empty string'),
    validationBody('on_contract').optional().isString().withMessage('on_contract must either "true" or "false" when specified')
];


router.post('/records', recordValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const record = {
        ...req.body,
        salary: parseFloat(req.body.salary)  // Ensure salary is stored as a number.
    };
    
    id = db.addRecord(record);
    res.status(200).json({ id });
});


router.delete('/records/:id', (req, res) => {
    const { id } = req.params;
    db.deleteRecord(id);
    res.sendStatus(200);
});


router.get('/records', (req, res) => {
    const records = db.getAllRecords()
    res.status(200).json({ records })
})

module.exports = router;