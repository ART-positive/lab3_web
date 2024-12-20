const canvas = document.getElementById('canvas');
function drawPoint(ctx, point, color = "#000", axes_offset = 50) {
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.ellipse(getPointCanvasX(ctx, point, axes_offset), getPointCanvasY(ctx, point, axes_offset), 4, 4, Math.PI * 2, 0, Math.PI * 2);
    ctx.fill();
}

function getPointCanvasX(ctx, point, axes_offset = 50){
    const cx = ctx.canvas.width / 2, cy = ctx.canvas.height / 2;
    const first_graph_value_offset = (cx - axes_offset) * (2 / 3);
    return cx + point.x * first_graph_value_offset / point.r;
}

function getPointCanvasY(ctx, point, axes_offset = 50){
    const cx = ctx.canvas.width / 2, cy = ctx.canvas.height / 2;
    const first_graph_value_offset = (cy - axes_offset) * (2 / 3);
    return cy - point.y * first_graph_value_offset / point.r;
}

function drawAxes(R, ctx, axes_offset = 50, angle = 0) {
    const width = ctx.canvas.width, height = ctx.canvas.height;
    const cx = width / 2, cy = height / 2;

    ctx.beginPath();
    ctx.font = "16px monospace";
    ctx.strokeStyle = "#000";

    drawGraphValues(R, ctx, axes_offset);

    drawArrow(ctx, cx - (cx - axes_offset) * Math.cos(angle), cy - (cy - axes_offset) * Math.sin(angle), cx + (cx - axes_offset) * Math.cos(angle), cy + (cy - axes_offset) * Math.sin(angle));//Ox

    drawArrow(ctx, cx - (cx - axes_offset) * Math.sin(angle), cy + (cy - axes_offset) * Math.cos(angle), cx + (cx - axes_offset) * Math.sin(angle), cy - (cy - axes_offset) * Math.cos(angle));//Oy

    ctx.strokeText("x", cx + 10 * Math.sin(angle) + (cx - axes_offset + 5) * Math.cos(angle), cy - 10 * Math.cos(angle) + (cy - axes_offset + 5) * Math.sin(angle));

    ctx.strokeText("y", cx + 10 * Math.cos(angle) + (cx - axes_offset + 5) * Math.sin(angle), cx - 10 * Math.sin(angle) - (cy - axes_offset + 5) * Math.cos(angle));
}

function drawArrow(ctx, from_x, from_y, to_x, to_y, arrow_size = 10, color = "#000") {
    const angle = Math.atan2(to_y - from_y, to_x - from_x)
    ctx.strokeStyle = color;
    const width = ctx.lineWidth;
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.moveTo(from_x, from_y);
    ctx.lineTo(to_x, to_y);

    ctx.lineTo(to_x + arrow_size * Math.sin(angle - Math.PI / 4), to_y - arrow_size * Math.cos(angle - Math.PI / 4));
    ctx.lineTo(to_x, to_y);


    ctx.lineTo(to_x - arrow_size * Math.sin(angle + Math.PI / 4), to_y + arrow_size * Math.cos(angle + Math.PI / 4));
    ctx.lineTo(to_x, to_y);

    ctx.stroke();
    ctx.lineWidth = width;
}

function drawGraphValues(R, ctx, axes_offset = 100) {
    const width = ctx.canvas.width, height = ctx.canvas.height;
    const cx = width / 2, cy = height / 2;
    const first_pos = 2 / 3, //Position of the first value of the graph relative to zero until the end of the axis line
        second_pos = 1 / 3;

    ctx.fillStyle = "#3399ff";
    ctx.fillRect(cy - (cy - axes_offset) * second_pos, cx - (cx - axes_offset) * first_pos, (cy - axes_offset) * second_pos, (cx - axes_offset) * first_pos);

    ctx.moveTo(cx, cy);
    ctx.arc(cx, cx, (cy - axes_offset) * first_pos, 0, Math.PI / 2);
    ctx.fill();

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, height - axes_offset - (cy - axes_offset) * second_pos);
    ctx.lineTo(axes_offset + (cx - axes_offset) * first_pos, cy);
    ctx.fill();

    ctx.fillStyle = "#000";
    R = R.toString().replace(',', '.');
    R = parseFloat(R);
    ctx.beginPath();
    //Ox
    ctx.moveTo(axes_offset + (width / 2 - axes_offset) * second_pos, height / 2 + 10);
    ctx.lineTo(axes_offset + (width / 2 - axes_offset) * second_pos, height / 2 - 10);
    ctx.strokeText((-R).toString(), axes_offset + (width / 2 - axes_offset) * second_pos, height / 2 - 10);

    ctx.moveTo(axes_offset + (width / 2 - axes_offset) * first_pos, height / 2 + 10);
    ctx.lineTo(axes_offset + (width / 2 - axes_offset) * first_pos, height / 2 - 10);
    ctx.strokeText((-R / 2).toString(), axes_offset + (width / 2 - axes_offset) * first_pos, height / 2 - 10);

    ctx.moveTo(width - axes_offset - (width / 2 - axes_offset) * second_pos, height / 2 + 10);
    ctx.lineTo(width - axes_offset - (width / 2 - axes_offset) * second_pos, height / 2 - 10);
    ctx.strokeText((R).toString(), width - axes_offset - (width / 2 - axes_offset) * second_pos, height / 2 - 10);

    ctx.moveTo(width - axes_offset - (width / 2 - axes_offset) * first_pos, height / 2 + 10);
    ctx.lineTo(width - axes_offset - (width / 2 - axes_offset) * first_pos, height / 2 - 10);
    ctx.strokeText((R / 2).toString(), width - axes_offset - (width / 2 - axes_offset) * first_pos, height / 2 - 10);
    //Oy
    ctx.moveTo(width / 2 + 10, axes_offset + (height / 2 - axes_offset) * second_pos);
    ctx.lineTo(width / 2 - 10, axes_offset + (height / 2 - axes_offset) * second_pos);
    ctx.strokeText((R).toString(), width / 2 + 10, axes_offset + (height / 2 - axes_offset) * second_pos);

    ctx.moveTo(width / 2 + 10, axes_offset + (height / 2 - axes_offset) * first_pos);
    ctx.lineTo(width / 2 - 10, axes_offset + (height / 2 - axes_offset) * first_pos);
    ctx.strokeText((R / 2).toString(), width / 2 + 10, axes_offset + (height / 2 - axes_offset) * first_pos);

    ctx.moveTo(width / 2 + 10, height - axes_offset - (height / 2 - axes_offset) * first_pos);
    ctx.lineTo(width / 2 - 10, height - axes_offset - (height / 2 - axes_offset) * first_pos);
    ctx.strokeText((-R / 2).toString(), width / 2 + 10, height - axes_offset - (height / 2 - axes_offset) * first_pos);

    ctx.moveTo(width / 2 + 10, height - axes_offset - (height / 2 - axes_offset) * second_pos);
    ctx.lineTo(width / 2 - 10, height - axes_offset - (height / 2 - axes_offset) * second_pos);
    ctx.strokeText((-R).toString(), width / 2 + 10, height - axes_offset - (height / 2 - axes_offset) * second_pos);
    ctx.stroke();
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
const AXES_OFFSET = 15;
function onCanvasClick(e){
    const tooltip = document.getElementById("tooltip");
    const canvas = document.getElementsByTagName("canvas")[0];
    if (!validateNumber(document.getElementById('dataForm:r'), minR, maxR)) {
        tooltip.innerText = "Радиус не указан!";
        tooltip.style.top = (e.pageY - tooltip.offsetHeight - 10) + "px";
        tooltip.style.left = (e.pageX - tooltip.offsetWidth / 2) + "px";
        return false;
    }

    let r = document.getElementById("dataForm:r").value;
    r = +r.toString().replace(',', '.');
    if(isNaN(r)) {
        showNotification("R не может быть NaN!");
        return false;
    }
    const graph_length = (canvas.width / 2 - AXES_OFFSET) * 2 / 3;
    const x = Math.floor((e.offsetX - canvas.width / 2) / graph_length * r * 100) / 100;
    const y = Math.floor(-(e.offsetY - canvas.height / 2) / graph_length * r * 100) / 100;
    console.log(graph_length, e.offsetX, e.offsetY, canvas.width, canvas.height);
    if (isNaN(x) || isNaN(y)) {
        showNotification("X и/или Y не может быть NaN!");
        return false;
    }

    tooltip.innerText = "➡️ x: " + x + ", y: " + y + ", r: " + r + " ⬅️";
    tooltip.style.top = (e.pageY - tooltip.offsetHeight - 10) + "px";
    tooltip.style.left = (e.pageX - tooltip.offsetWidth / 2) + "px";

    document.getElementById("hidden-canvas-form:x").value = x;
    document.getElementById("hidden-canvas-form:y").value = y;
    document.getElementById("hidden-canvas-form:r").value = r;

    return true;
}