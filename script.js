/* calculate results*/

function getInput(form, event){
    // get use input

    let principal = form.elements['principal'].value;
    if (principal === ''){
        document.getElementById('principal-error').textContent = "pricipal cannot be empty.";
        event.preventDefault()
        return false;
    }
    
    const term = form.elements['term'].value;
    if (term === ''){
        document.getElementById('term-error').textContent = "mortgage term cannot be empty.";
        event.preventDefault()
        return false;
    }
    const rate = form.elements['rate'].value;
    if (rate === ''){
        document.getElementById('rate-error').textContent = "interest rate cannot be empty.";
        event.preventDefault()
        return false;
    }
    const calcChoices = document.querySelectorAll('input[name="calc-choice"]');
    let selectedChoice;
    for (const choice of calcChoices){
    
        if (choice.checked) {
            selectedChoice = choice.value;
            break;
        }
    }
    if (!selectedChoice) {
        document.getElementById('choice-error').textContent = "must choose atleast one from calculation options provided.";
        event.preventDefault()
        return false;
    }

    const obj = {
            principal: principal,
            term: term,
            rate:rate,
            choice:selectedChoice,
     }

    return obj;
}

const form = document.getElementById('input-form')
function calculateMortage(event){
    //get user inputs
    event.preventDefault();

    userInput = getInput(form, event);
    let principal; 
    let term; 
    let rate; 
    let choice; 
    if (userInput){
        principal = userInput.principal;
        term = userInput.term;
        rate = userInput.rate;
        choice = userInput.choice;
        console.log('principal', principal);
        console.log('rate', rate);
        console.log('term', term);
    }
    else {
    
        return
    }

    const p = principal;
    const r = (rate / 12) / 100;  //convert montly interest payments
    const n = term * 12;          //num of monthly  payments
    const mortgatePayment = p * ( ( r * ( (1 + r)**n) ) / ( ((1 + r)**n) - 1 ) ); // pricipal and intersrate montly payments
    let monthlyPayment = mortgatePayment.toFixed(2);
    const totalPayment = (monthlyPayment * 12) * term
    console.log('total', totalPayment);
    
    if (choice !== 'Repayment'){
        const interest = totalPayment - principal;
        monthlyPayment = interest.toFixed(2);
        console.log('interest', monthlyPayment);

    }
    //show results
    const resultsCont = document.getElementById('calculated-results');
    const isHidden = resultsCont.classList.contains('hidden');
    if (isHidden){
        toggleResults(resultsCont);
        showResults(resultsCont, monthlyPayment, totalPayment);
    }
    else {
        showResults(resultsCont, monthlyPayment, totalPayment);
    }

}
function toggleResults(resultsCont){
    const emptyResults = document.getElementById('empty-results');
    emptyResults.classList.toggle('hidden');
    resultsCont.classList.toggle('hidden');
}

function showResults(resultsCont, monthlyPayment, totalPayment, interest=false){    
    
    const monthly = document.getElementById('monthly-pay');
    const total = document.getElementById('total-pay');
    let numMonthly = +monthlyPayment;
    let numTotal = +totalPayment;
    let formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
      });
    numMonthlyCurrency = formatter.format(numMonthly);
    numTotalCurrency = formatter.format(numTotal);
    monthly.textContent = numMonthlyCurrency;
    total.textContent = numTotalCurrency;

    return
}

function clearForm(event){
    document.getElementById('input-form').reset();
}


const calculateButton = document.getElementById('calc-button');
calculateButton.addEventListener('click', calculateMortage);
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearForm);