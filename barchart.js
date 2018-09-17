function drawBarChart(data, options, element) {
  var chartArea = document.getElementById(element);

  var values = data.values;
  var labels = data.labels;
  var scale = data.scale;

  var numBars = values.length;
  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;
  var colour = "#008000";
  var textColour = "#FFFFFF";
  var textAlign = "top";

  var maxValue = values[0];
  for (i = 1; i < values.length; i++) {
    if (values[i] > maxValue) {
      maxValue = values[i];
    }
  }

  var maxY = maxValue + (scale - maxValue % scale);

  if ("width" in options === true) {
    chartArea.style.width = options.width + "px";
    chartWidth = options.width;
  }

  if ("height" in options === true) {
    chartArea.style.height = options.height + "px";
    chartHeight = options.height;
  }

  if ("spacing" in options === true) {
    space = options.spacing;
  }

  if ("colour" in options === true) {
    colour = options.colour;
  }

  if ("text" in options === true) {
    textColour = options.text;
  }

  if ("align" in options === true) {
    textAlign = options.align;
  }

  var barWidth = (chartWidth / numBars) - space;
  var barHeight;

  for (var i = 0; i < values.length; i++) {
    var bar = document.createElement("div");
    bar.setAttribute("class", "div2");

    barHeight = values[i] / maxY * chartHeight;

    bar.style.width = barWidth + "px";
    bar.style.height = barHeight + "px";
    bar.style.marginLeft = (space + i * (barWidth + space)) + "px";
    bar.style.top = (chartHeight - barHeight + 100) + "px";
    bar.style.background = colour;
    bar.innerHTML = values[i];
    bar.style.color = textColour;

    if (textAlign === "center") {
      bar.style.lineHeight = barHeight + "px";
    } else if (textAlign === "bottom") {
      bar.style.lineHeight = (2 * barHeight - 20) + "px";
    } else {
      bar.style.lineHeight = 20 + "px";
    }

    chartArea.appendChild(bar);
  }

  drawXlabels(labels, chartWidth, barWidth, space, "div3");

  drawYlabels(scale, maxY, chartHeight, "div5");

  drawTitles("div7", "XTitle", "YTitle", chartHeight, chartWidth);
}

function drawXlabels(labels, chartWidth, barWidth, space, element) {
  var labelArea = document.getElementById(element);
  labelArea.style.width = chartWidth + "px";

  for (var i = 0; i < labels.length; i++) {
    var label = document.createElement("div");
    label.setAttribute("class", "div4");

    label.style.height = barWidth + "px";
    label.style.marginLeft = (space + i * (barWidth + space)) + "px";
    label.innerHTML = labels[i];
    label.style.lineHeight = barWidth + "px";

    labelArea.appendChild(label);
  }
}

function drawYlabels(scale, maxY, chartHeight, element) {
  var labelArea = document.getElementById(element);
  labelArea.style.height = (chartHeight + 13) + "px";

  for (var i = 0; i <= maxY / scale; i++) {
    var label = document.createElement("div");
    label.setAttribute("class", "div6");

    var labelHeight = ((i * scale) / maxY) * chartHeight;

    label.innerHTML = (i * scale) + " -";
    label.style.marginBottom = labelHeight + "px";

    labelArea.appendChild(label);
  }
}

function drawTitles(chartElement, XElement, YElement, chartHeight, chartWidth) {
  var chartTitle = document.getElementById(chartElement);
  chartTitle.style.width = chartWidth + "px";
  chartTitle.innerHTML = "Bar Chart";
}

drawBarChart({values: [1,2,4,8,16], labels: ["lol","look","at","my","text"], scale: 2}, {height:400, width:600, spacing:10, colour:"#800080", text:"#C0C0C0", align:"top"}, "div1");
