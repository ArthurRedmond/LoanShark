function getValues() {
    let loanAmount = document.getElementById("loanAmt").value;
    let numberOfPayments = document.getElementById("numPayments").value;
    let interestRate = document.getElementById("interestRate").value;

    loanAmount = parseFloat(loanAmount);
    numberOfPayments = parseFloat(numberOfPayments);
    interestRate = parseFloat(interestRate);

    if (!Number.isNaN(loanAmount) && !Number.isNaN(numberOfPayments) && !Number.isNaN(interestRate)) {
        let loanArray = calculateValues(loanAmount, numberOfPayments, interestRate);
        displayResults(loanAmount, loanArray);
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
        // (loanAmount * ((interestRate/1200) / (1-Math.pow(1+(interestRate/1200),(numberOfPayments * -1)))))
        returnArray.push(monthlyPayment.toFixed(2));

        let interestPaid = remainingBalance * (interestRate / 1200);
        let principalPaid = monthlyPayment - interestPaid

        returnArray.push(principalPaid.toFixed(2));

        returnArray.push(interestPaid.toFixed(2));

        totalInterestPaid += interestPaid;
        returnArray.push(totalInterestPaid.toFixed(2));

        remainingBalance -= principalPaid;
        returnArray.push(remainingBalance.toFixed(2));
    }

    let totalCost = totalInterestPaid + loanAmount;
    document.getElementById("totalCost").innerHTML = `${totalCost.toFixed(2)}`;

    return returnArray;
}

function displayResults(loanAmount, loanArray) {
    let tableBody = document.getElementById("results");

    let tableRow = document.getElementById("outputTemplate");

    tableBody.innerHTML = "";
    //monthlyPayment
    //totalPrincipal
    //totalInterest
    //totalCost


}