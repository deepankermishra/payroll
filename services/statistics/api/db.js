/* NOTE:
*     Will be maintained in a DB in production and would be multi-tenanted. For simplicity we
*     are maintaining it in memory assuming single tenant.
*/

const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const EMPLOYEE_TABLE = {};

class Employee {
    constructor({ name, salary, currency, department, on_contract, sub_department }) {
        this.id = uuidv4();
        this.name = name;
        this.salary = salary;
        this.currency = currency;
        this.department = department;
        this.on_contract = on_contract === 'true';
        this.sub_department = sub_department;
    }

    describe() {
        return `${this.name} works in the ${this.department}/${this.sub_department} department and earns ${this.currency} ${this.salary} per year. Contract: ${this.on_contract ? 'Yes' : 'No'}`;
    }
}

function addRecord(employeeData) {
    const newEmployee = new Employee(employeeData);
    EMPLOYEE_TABLE[newEmployee.id] = newEmployee;
    return newEmployee.id;
}

function deleteRecord(empId) {
    return _.has(EMPLOYEE_TABLE, empId) ? !!_.unset(EMPLOYEE_TABLE, empId) : false;
}

function getAllRecords() {
    return _.values(EMPLOYEE_TABLE);
}

function getAllRecordsSalary() {
    return _.map(getAllRecords(), 'salary');
}

function getContractRecordsSalary() {
    return _.map(_.filter(getAllRecords(), { on_contract: true }), 'salary');
}

function getRecordsByDepartmentsSalary() {
    return _.mapValues(_.groupBy(getAllRecords(), 'department'), records => _.map(records, 'salary'));
}

function getRecordsByDepartmentAndSubDepartmentSalary() {
    return _.mapValues(_.groupBy(getAllRecords(), rec => `${rec.department}/${rec.sub_department}`), records => _.map(records, 'salary'));
}

module.exports = {
    addRecord,
    deleteRecord,
    getAllRecords,
    getAllRecordsSalary,
    getContractRecordsSalary,
    getRecordsByDepartmentsSalary,
    getRecordsByDepartmentAndSubDepartmentSalary
};
