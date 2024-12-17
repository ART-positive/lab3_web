const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

function getDayName(day) {
    switch (day) {
        case 0: return 'Воскресенье';
        case 1: return 'Понедельник';
        case 2: return 'Вторник';
        case 3: return 'Среда';
        case 4: return 'Четверг';
        case 5: return 'Пятница';
        case 6: return 'Суббота';
        default: return 'Неизвестный день';
    }
}

function updateDateTime() {
    const time = new Date();
    const thisMonth = months[time.getMonth()];
    const date = time.getDate();
    const thisYear = time.getFullYear();
    const day = time.getDay();

    document.getElementById('date').textContent = `${date} ${thisMonth} ${thisYear} года - ${getDayName(day)}`;

    const clockData = document.getElementById('clockData');
    clockData.innerHTML = time.toLocaleTimeString('ru-RU');
}