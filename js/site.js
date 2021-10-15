function getValues() {
    let loanAmount = document.getElementById("loanAmt").value;
    let numberOfPayments = document.getElementById("numPayments").value;
    let interestRate = document.getElementById("interestRate").value;

    loanAmount = parseFloat(loanAmount);
    numberOfPayments = parseFloat(numberOfPayments);
    interestRate = parseFloat(interestRate);

    if (!Number.isNaN(loanAmount) && !Number.isNaN(numberOfPayments) && !Number.isNaN(interestRate)) {
        let loanArray = calculateValues(loanAmount, numberOfPayments, interestRate);
        displayResults(loanArray);
    } else {
        alert("You must enter valid numbers");
    }
}

function calculateValues(loanAmount, numberOfPayments, interestRate) {
    let returnArray = [];
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
        returnArray.push(i);

        let monthlyPayment = (loanAmount * ((interestRate / 1200) / (1 - Math.pow(1 + (interestRate / 1200), (numberOfPayments * -1)))));
        returnArray.push(monthlyPayment);

        let interestPaid = remainingBalance * (interestRate / 1200);
        let principalPaid = monthlyPayment - interestPaid

        returnArray.push(principalPaid);

        returnArray.push(interestPaid);

        totalInterestPaid += interestPaid;
        returnArray.push(totalInterestPaid);

        remainingBalance -= principalPaid;
        returnArray.push(remainingBalance);
    }

    document.getElementById("monthlyPayment").classList.add("output-payment");
    document.getElementById("monthlyPayment").innerHTML = `$${returnArray[1].toFixed(2)}`;
    document.getElementById("totalPrincipal").innerHTML = `$${loanAmount}`;
    document.getElementById("totalInterest").innerHTML = `$${totalInterestPaid.toFixed(2)}`;
    let totalCost = totalInterestPaid + loanAmount;
    document.getElementById("totalCost").innerHTML = `$${totalCost.toFixed(2)}`;

    return returnArray;
}

function displayResults(loanArray) {
    //Get the table body element
    let tableBody = document.getElementById("results");

    //Get the template row
    let templateRow = document.getElementById("outputTemplate");

    //clear the table
    tableBody.innerHTML = "";

    for (let index = 0; index < loanArray.length; index += 6) {

        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = loanArray[index];
        rowCols[1].textContent = loanArray[index + 1].toFixed(2);
        rowCols[2].textContent = loanArray[index + 2].toFixed(2);
        rowCols[3].textContent = loanArray[index + 3].toFixed(2);
        rowCols[4].textContent = loanArray[index + 4].toFixed(2);
        rowCols[5].textContent = loanArray[index + 5].toFixed(2);

        tableBody.appendChild(tableRow);
    }
}