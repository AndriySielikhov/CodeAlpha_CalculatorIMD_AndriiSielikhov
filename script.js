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
    // Приховуємо поточний екран і показуємо наступний
    document.getElementById('genderScreen').classList.remove('active-screen');
    document.getElementById('parametersScreen').classList.add('active-screen');
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

    // Приховуємо поточний екран і показуємо екран результатів
    document.getElementById('parametersScreen').classList.remove('active-screen');
    document.getElementById('resultScreen').classList.add('active-screen');
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'normal';
    if (bmi >= 25 && bmi <= 29.9) return 'overweight';
    return 'obese';
}

function showResult(bmi, category) {
    const bmiValueElem = document.getElementById('bmiValue');
    const categoryElem = document.getElementById('bmiCategory');

    // Оновлюємо значення BMI та категорію
    bmiValueElem.textContent = bmi;
    categoryElem.textContent = `(${category})`;

    // Приховуємо всі блоки
    document.querySelectorAll('.recommendation-box').forEach(box => {
        box.classList.remove('active');
    });

    // Показуємо потрібний блок
    document.querySelector(`.recommendation-box.${category}`).classList.add('active');

    // Додаємо клас категорії до контейнера результатів
    document.querySelector('.result-content').className = 
        `result-content ${category}`;
}

function getEmoji(category) {
    return {
        underweight: "⚠️",
        normal: "🎉",
        overweight: "🔥",
        obese: "❗"
    }[category];
}

function getRecommendationText(category, bmi) {
    if (category === 'underweight') {
        return `Need to gain ${(18.5 - bmi).toFixed(1)} kg/m²`;
    }
    if (category === 'overweight') {
        return `Aim to lose ${(bmi - 24.9).toFixed(1)} kg/m²`;
    }
    return "Keep up the good work!";
}

function restart() {
    document.getElementById('resultScreen').classList.remove('active-screen');
    document.getElementById('genderScreen').classList.add('active-screen');
    selectedGender = '';
    document.getElementById('continueButton').disabled = true;
    document.querySelectorAll('.gender-block').forEach(block => block.classList.remove('active'));
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
}

function updateSpeedometer(bmi) {
    const pointer = document.querySelector('.speedometer-pointer');
    let progress;

    if (bmi < 18.5) {
        progress = 0.2; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
        progress = 0.4; // Normal
    } else if (bmi >= 25 && bmi < 30) {
        progress = 0.6; // Overweight
    } else {
        progress = 0.8; // Obese
    }

    pointer.style.setProperty('--progress', progress);
}





