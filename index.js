// Your code here
function createEmployeeRecord(row) {
	let employeeDetails;
	employeeDetails = {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
	return employeeDetails;
}

function createEmployeeRecords(row) {
	const newEmployeeArray = row.map(createEmployeeRecord);
	return newEmployeeArray;
}

function createTimeInEvent(employeeRecord, dateStamped) {
	let timeIn = {
		type: "TimeIn",
		hour: parseInt(dateStamped.split(" ")[1]),
		date: dateStamped.split(" ")[0],
	};
	employeeRecord.timeInEvents.push(timeIn);
	return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamped) {
	let timeOut = {
		type: "TimeOut",
		hour: parseInt(dateStamped.split(" ")[1]),
		date: dateStamped.split(" ")[0],
	};
	employeeRecord.timeOutEvents.push(timeOut);
	return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
	const gotIn = employeeRecord.timeInEvents.find(
		(gotIn) => gotIn.date === date
	);
	const gotOut = employeeRecord.timeOutEvents.find(
		(gotOut) => gotOut.date === date
	);
	return Math.abs(gotOut.hour - gotIn.hour) / 100;
}
function wagesEarnedOnDate(employeeRecord, date) {
	return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
	let wagesArray = [];
	const dates = employeeRecord.timeInEvents.map((timeIn) => timeIn.date);
	for (let date of dates) {
		wagesArray.push(wagesEarnedOnDate(employeeRecord, date));
	}
	return wagesArray.reduce((prev, curr) => prev + curr);
}

function calculatePayroll(employeeArray) {
	let sumOfPayOwed = employeeArray
		.map((obj) => allWagesFor(obj))
		.reduce((a, b) => (a = a + b), 0);
	return sumOfPayOwed;
}
