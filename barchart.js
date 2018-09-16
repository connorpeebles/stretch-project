function drawBarChart(data, options, element) {
  var chartArea = document.getElementById(element);

  var numBars = data.length;
  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;

  var maxValue = data[0];
  for (i = 1; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i];
    }
  }

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

  var barWidth = (chartWidth / numBars) - space;
  var barHeight;

  for (var i = 0; i < data.length; i++) {
    var bar = document.createElement("div");
    bar.setAttribute("class", "div2");

    barHeight = data[i] / maxValue * chartHeight;

    bar.style.width = barWidth + "px";
    bar.style.height = barHeight + "px";
    bar.style.marginLeft = (space + i * (barWidth + space)) + "px";
    bar.style.top = (chartHeight - barHeight + 50) + "px";
    chartArea.appendChild(bar);
  }
}

drawBarChart([1,2,4,8,16], {height:200, width:700, spacing:40}, "div1");
