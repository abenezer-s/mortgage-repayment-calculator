/* calculate results*/

function getInput(form, event){
    // get use input
    let error = false;
    let principal = form.elements['principal'].value;
    if (principal === ''){
        document.getElementById('principal-error').textContent = "This field is required..";
        field = document.getElementById('principal-field');
        currencySym = document.getElementById('currency');
        field.classList.add('field-error');
        currencySym.classList.add('field-error');
        event.preventDefault();
        error = true;
    }
    
    const term = form.elements['term'].value;
    if (term === ''){
        document.getElementById('term-error').textContent = "This field is required.";
        field = document.getElementById('term-field');
        year = document.getElementById('year');
        field.classList.add('field-error');
        year.classList.add('field-error');
        event.preventDefault();
        error = true;
     
    }
    const rate = form.elements['rate'].value;
    if (rate === ''){
        document.getElementById('rate-error').textContent = "This field is required.";
        field = document.getElementById('interest-field');
        percentage = document.getElementById('percentage');
        field.classList.add('field-error');
        percentage.classList.add('field-error');
        event.preventDefault();
        error = true;
     
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
        document.getElementById('choice-error').textContent = "This field is required.";
        event.preventDefault();
        error = true;
     
    } else {
        document.getElementById('choice-error').textContent = "";

    }

    const obj = {
            error: error,
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
    if (!userInput.error){
        principal = userInput.principal;
        term = userInput.term;
        rate = userInput.rate;
        choice = userInput.choice;
    }
    else {
        return
    }

    const p = principal;
    const r = (rate / 12) / 100;  //convert montly interest payments
    const n = term * 12;          //num of monthly  payments
    const mortgatePayment = p * ( ( r * ( (1 + r)**n) ) / ( ((1 + r)**n) - 1 ) ); // pricipal and intersrate montly payments
    let monthlyPayment = mortgatePayment.toFixed(2);
    let totalPayment = (monthlyPayment * 12) * term;
    
    if (choice !== 'Repayment'){
        const interest = totalPayment - principal;
        monthlyPayment = interest.toFixed(2) / n;
        totalPayment = interest;

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



const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', calculateMortage);
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearForm);

//remove error state once user starts typing again
const principal = document.getElementById('principal-field');
principal.addEventListener('input', function(event) {
    principal.classList.remove('field-error');
    const currency = document.getElementById('currency');
    currency.classList.remove('field-error');
    document.getElementById('principal-error').textContent = "";
    document.getElementById('choice-error').textContent = "";

});

const term = document.getElementById('term-field');
term.addEventListener('input', function(event) {
    term.classList.remove('field-error');
    const year = document.getElementById('year');
    year.classList.remove('field-error');
    document.getElementById('term-error').textContent = "";
    document.getElementById('choice-error').textContent = "";

});

const interest = document.getElementById('interest-field');
interest.addEventListener('input', function(event) {
    interest.classList.remove('field-error');
    const percentage = document.getElementById('percentage');
    percentage.classList.remove('field-error');
    document.getElementById('rate-error').textContent = "";
    document.getElementById('choice-error').textContent = "";
    

});
