// Currency list
const currencies = ["USD", "AED", "ARS", "AUD", "BGN", "BRL", "BSD", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "DOP", "EGP", "EUR", "FJD", "GBP", "GTQ", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "KZT", "MVR", "MXN", "MYR", "NOK", "NZD", "PAB", "PEN", "PHP", "PKR", "PLN", "PYG", "RON", "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "UYU", "ZAR"];

window.onload = function () {
    // DOM Elements
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const finalValue = document.querySelector(".finalValue");
    const finalAmount = document.getElementById("finalAmount");
    const convertBtn = document.getElementById("convert");
    const resetBtn = document.getElementById("reset");
    const amountInput = document.getElementById("amount");

    // Populate dropdowns
    function populateDropdowns() {
        const defaultOptionFrom = document.createElement("option");
        defaultOptionFrom.value = "";
        defaultOptionFrom.textContent = "Select Currency";
        fromCurrency.appendChild(defaultOptionFrom);

        const defaultOptionTo = document.createElement("option");
        defaultOptionTo.value = "";
        defaultOptionTo.textContent = "Select Currency";
        toCurrency.appendChild(defaultOptionTo);

        currencies.forEach(currency => {
            const optionFrom = document.createElement("option");
            const optionTo = document.createElement("option");

            optionFrom.value = currency;
            optionFrom.textContent = currency;
            optionTo.value = currency;
            optionTo.textContent = currency;

            fromCurrency.appendChild(optionFrom);
            toCurrency.appendChild(optionTo);
        });
    }

    populateDropdowns();

    // Event listener for conversion
    convertBtn.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || !from || !to) {
            alert("Please fill out all fields correctly.");
            return;
        }

        // Fetch conversion rate from the API
        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);

                finalValue.textContent = `${convertedAmount} ${to}`;
                finalAmount.style.display = "block";
            })
            .catch(error => {
                console.error("Error fetching the data:", error);
            });
    });

    // Reset functionality
    resetBtn.addEventListener("click", () => {
        amountInput.value = "";
        fromCurrency.value = "";
        toCurrency.value = "";
        finalAmount.style.display = "none";
    });
};