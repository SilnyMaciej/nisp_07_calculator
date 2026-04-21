// Deklaracja zmiennych przechowujących aktualny stan kalkulatora
let currentInput = '0';     // Aktualnie wpisywana liczba (domyślnie 0 na starcie)
let previousInput = '';     // Poprzednio wpisana liczba (przed użyciem operatora)
let currentOperation = null;// Aktualnie wybrane działanie (+, -, *, /)

// Pobieranie elementów z HTML
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Funkcja aktualizująca zawartość ekranu kalkulatora
function updateDisplay() {
    display.textContent = currentInput;
}

// Funkcja czyszcząca kalkulator (Przycisk "C")
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}

// Funkcja dodająca cyfrę do aktualnego ciągu znaków
function appendNumber(number) {
    // Jeśli na ekranie jest tylko zero, zastępujemy je wpisaną liczbą.
    // W przeciwnym razie dopisujemy kolejną cyfrę na koniec.
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput = currentInput + number;
    }
    updateDisplay();
}

// Funkcja rejestrująca wybrane działanie matematyczne
function chooseOperation(operator) {
    if (currentInput === '') return;
    
    // Jeśli mieliśmy już poprzednią liczbę, obliczamy wynik przed przejściem dalej
    if (previousInput !== '') {
        calculateResult();
    }
    
    currentOperation = operator;
    previousInput = currentInput;
    currentInput = ''; // Resetujemy aktualne wejście, by można było wpisać drugą liczbę
}

// Główna funkcja wykonująca obliczenia
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput); // Zamiana tekstu na liczbę
    const current = parseFloat(currentInput); // Zamiana tekstu na liczbę

    // Sprawdzamy, czy mamy liczby do działania. Jeśli nie, przerywamy.
    if (isNaN(prev) || isNaN(current)) return;

    // Pełna obsługa działań zgodnie z wytycznymi
    switch (currentOperation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
           result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert("Pamiętaj cholero nie dziel przez zero!");
                clearCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Zamieniamy wynik z powrotem na tekst, czyścimy poprzednie stany
    currentInput = result.toString();
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

// Nasłuchiwanie kliknięć na wszystkie przyciski
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Sprawdzamy jaki typ akcji przypisaliśmy do przycisku w HTML
        const action = button.dataset.action;
        const value = button.dataset.value;

        // Decydujemy, którą funkcję odpalić na podstawie tego, co zostało kliknięte
        if (!action) {
            // Jeśli przycisk nie ma data-action, znaczy to, że jest to liczba
            appendNumber(value);
        } else if (action === 'clear') {
            clearCalculator();
        } else if (action === 'calculate') {
            calculateResult();
        } else {
            // Pozostałe przypadki to operator matematyczny (+, -, *, /)
            chooseOperation(action);
        }
    });
});