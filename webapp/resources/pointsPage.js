window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if(document.getElementById('dataForm:r').value === '') {
    drawAxes(1, ctx, AXES_OFFSET);
    document.getElementById('dataForm:r').value = 1;
  }
  else drawAxes(document.getElementById('dataForm:r').value, ctx, AXES_OFFSET);

  if (document.cookie.indexOf('dataCleared=true') !== -1) {
    showNotification('Данные успешно очищены');
    document.cookie = 'dataCleared=; path=/; max-age=0';
  }
  hideTooltip();
  function hideTooltip() {
    document.getElementById("tooltip").style.top = "-1000px";
    document.getElementById("tooltip").style.left = "-1000px";
  }

  redrawPoints();
  function redrawPoints() {
    if (!document.getElementById('dataForm:r').reportValidity()) return;

    let r = document.getElementById('dataForm:r').value;
    r = +r.toString().replace(',', '.');

    clearCanvas(ctx);
    drawAxes(r, ctx, AXES_OFFSET);

    const table_body = document.getElementById("resultsTable").getElementsByTagName("table")[0].tBodies[0];
    for (let i = 0; i < table_body.rows.length; i++) {
      if (table_body.rows[i].childElementCount >= 3) {
        const point = {
          x: table_body.rows[i].children[0].innerText,
          y: table_body.rows[i].children[1].innerText,
          r: r
        };
        drawPoint(ctx, point, table_body.rows[i].classList.contains("success-text") ? "#00c905" : "red", AXES_OFFSET);
      }
    }
  }

  document.getElementById('dataForm:r').addEventListener('input', redrawPoints);

  let observer = new MutationObserver(mutationRecords => {
    redrawPoints();
  });

  // наблюдать за всем, кроме атрибутов
  observer.observe(document.getElementById('observer'), {
    childList: true, // наблюдать за непосредственными детьми
    subtree: true, // и более глубокими потомками
    characterDataOldValue: true // передавать старое значение в колбэк
  });
};

function validateNumber(input, min, max) {
  const maxDigits = 6;
  if (input.value.length > maxDigits) {
    input.value = input.value.slice(0, maxDigits);
  }
  // проверяем что строка является числом вида: [-][0-9].[0-9] (заменяя запятые на точки)
  const isValidNumber = /^-?\d+(\.\d+)?$/.test(input.value.trim().replace(',', '.'));
  if (!isValidNumber) {
    input.setCustomValidity('Введите корректное число 🤨');
    input.reportValidity();
    return false;
  }
  const value = parseFloat(input.value);
  if (value < min) {
    input.setCustomValidity(`Значение должно быть не меньше ${min} 🥺`);
    input.reportValidity();
    return false;
  }
  if (value > max) {
    input.setCustomValidity(`Значение должно быть не больше ${max} 🥺`);
    input.reportValidity();
    return false;
  }
  input.setCustomValidity('');
  return true;
}
const minY = -3;
const maxY = 5;
const minR = 1;
const maxR = 5;
const input_y = document.getElementById('dataForm:y');
input_y.addEventListener("input", () => validateNumber(input_y, minY, maxY));
validateNumber(input_y, minY, maxY);

const input_r = document.getElementById('dataForm:r');
input_r.addEventListener("input", () => validateNumber(input_r, minR, maxR));
validateNumber(input_r, minR, maxR);
document.getElementById('dataForm:clearData').addEventListener('click', (event) => {
  input_y.setCustomValidity('');
  input_r.setCustomValidity('');
});

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;

  document.getElementById('notification-container').appendChild(notification);
  setTimeout(() => {
    document.getElementById('notification-container').removeChild(notification);
  }, 4000);
}

document.getElementById('dataForm:clearData').onclick = function (event) {
  document.cookie = 'dataCleared=true; path=/; max-age=3600';
};

setInterval(updateDateTime, 1000);
updateDateTime();