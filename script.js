
let selectedGender = '';

function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll('.gender-block').forEach(block => block.classList.remove('active'));
    document.querySelector(`.gender-block.${gender}`).classList.add('active');
    document.getElementById('continueButton').disabled = false;
}

function goToNextScreen() {
    if (!selectedGender) {
        alert('Please select your gender first.');
        return;
    }
    document.getElementById('genderScreen').classList.remove('active-screen');
    document.getElementById('parametersScreen').classList.add('active-screen');
}

function adjustWeight(change) {
    const weightInput = document.getElementById('weight');
    let weight = parseInt(weightInput.value) + change;
    if (weight < 30) weight = 30;
    if (weight > 200) weight = 200;
    weightInput.value = weight;
}

function adjustAge(change) {
    const ageInput = document.getElementById('age');
    let age = parseInt(ageInput.value) + change;
    if (age < 10) age = 10;
    if (age > 100) age = 100;
    ageInput.value = age;
}

function updateHeightValue() {
    const heightInput = document.getElementById('height');
    const heightValue = document.getElementById('heightValue');
    heightValue.textContent = heightInput.value;
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight.');
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    showResult(bmi, getBMICategory(bmi));

    document.getElementById('parametersScreen').classList.remove('active-screen');
    document.getElementById('resultScreen').classList.add('active-screen');
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'normal';
    if (bmi >= 25 && bmi <= 29.9) return 'overweight';
    return 'obese';
}

// Оновлення значення росту під час руху слайдера
function updateHeightValue() {
    const heightInput = document.getElementById('height'); // Отримуємо слайдер
    const heightValue = document.getElementById('heightValue'); // Отримуємо елемент для відображення значення
    heightValue.textContent = heightInput.value; // Оновлюємо текст значення
}

// Викликаємо функцію при завантаженні сторінки, щоб встановити початкове значення
window.onload = function () {
    updateHeightValue(); // Оновлюємо значення росту при завантаженні сторінки
};


function showResult(bmi, category) {
    const bmiValueElem = document.getElementById('bmiValue');
    const categoryElem = document.getElementById('bmiCategory');

    bmiValueElem.textContent = bmi;
    categoryElem.textContent = `(${category})`;

    document.querySelectorAll('.recommendation-box').forEach(box => {
        box.classList.remove('active');
    });

    document.querySelector(`.recommendation-box.${category}`).classList.add('active');
    document.querySelector('.result-content').className = `result-content ${category}`;
}

function restart() {
    document.getElementById('resultScreen').classList.remove('active-screen');
    document.getElementById('genderScreen').classList.add('active-screen');
    selectedGender = '';
    document.getElementById('continueButton').disabled = true;
    document.querySelectorAll('.gender-block').forEach(block => block.classList.remove('active'));
    document.getElementById('height').value = 170;
    document.getElementById('heightValue').textContent = 170;
    document.getElementById('weight').value = 65;
    document.getElementById('age').value = 26;
}