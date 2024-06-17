let days = document.querySelectorAll('#days li');
let classes = {
    "Понеділок": ['Алгебра', 'Англійська', 'Історія', 'Фізкультура'],
    "Вівторок": ['Фізика', 'Хімія', 'Українська мова', "Інформатика"],
    "Середа": ['Географія', 'Мистецтво', 'Українська література'],
    "Четвер": ['Геометрія', 'Українська мова', 'Інформатика'],
    "П'ятниця": [ 'Англійська', 'Алгебра', 'Фізкультура']
};

// Об'єкт для зберігання домашніх завдань
let homework = {
    "Понеділок": {},
    "Вівторок": {},
    "Середа": {},
    "Четвер": {},
    "П'ятниця": {}
};



// Додаємо обробник подій для кожного дня
for (let i = 0; i < days.length; i++) {
    days[i].addEventListener('click', function() {
        let selectedDay = days[i].innerHTML;
        highlightActiveDay(days[i]); // Підсвічуємо обраний день
        updateClassList(selectedDay); // Оновлюємо список занять
        updateHomeworkList(selectedDay); // Оновлюємо список домашніх завдань
        // Встановлюємо кнопку для додавання домашнього завдання
        let addHomeworkButton = document.querySelector('#add-homework');
        addHomeworkButton.onclick = function() {
            let selectedSubject = document.querySelector('#subject-select').value;
            let newHomework = document.querySelector('#new-homework').value;
            if (selectedSubject && newHomework) {
                homework[selectedDay][selectedSubject] = newHomework; // Додаємо або перезаписуємо домашнє завдання
                updateHomeworkList(selectedDay); // Оновлюємо список домашніх завдань
                document.querySelector('#new-homework').value = ''; // Очищуємо поле вводу
            }
        };
    });
}

// Функція для підсвічування обраного дня
function highlightActiveDay(activeDay) {
    for (let i = 0; i < days.length; i++) {
        days[i].classList.remove('active');
    }
    activeDay.classList.add('active');
}



// Функція для оновлення списку занять
function updateClassList(day) {
    document.querySelector('#day-name').innerHTML = day;// Оновлюємо назву обраного дня
    let classList = document.querySelector('#classes');
    classList.innerHTML = '';
    let subjectSelect = document.querySelector('#subject-select');
    subjectSelect.innerHTML = '<option value="" disabled selected>Select subject</option>';
    for (let k = 0; k < classes[day].length; k++) {
        let classItem = classes[day][k];
        classList.innerHTML += `<li>${k+1}. ${classItem}</li>`;
        let option = `<option value="${classItem}">${classItem}</option>`;
        subjectSelect.innerHTML += option;
    }
}

// Функція для оновлення списку домашніх завдань
function updateHomeworkList(day) {
    let homeworkList = document.querySelector('#homework-list');
    homeworkList.innerHTML = '';
    for (let subject in homework[day]) {
        if (homework[day].hasOwnProperty(subject)) {
            let hw = homework[day][subject];
            homeworkList.innerHTML += `<li><input type="checkbox">${subject}:  ${hw}</li>`;
        }
    }
}
