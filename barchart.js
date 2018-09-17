function drawBarChart(data, options, element) {
  var chartArea = document.getElementById(element);

  var numBars = data.length;
  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;
  var colour = "#008000";
  var textColour = "#FFFFFF";
  var textAlign = "top";

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

  for (var i = 0; i < data.length; i++) {
    var bar = document.createElement("div");
    bar.setAttribute("class", "div2");

    barHeight = data[i] / maxValue * chartHeight;

    bar.style.width = barWidth + "px";
    bar.style.height = barHeight + "px";
    bar.style.marginLeft = (space + i * (barWidth + space)) + "px";
    bar.style.top = (chartHeight - barHeight + 50) + "px";
    bar.style.background = colour;
    bar.innerHTML = data[i];
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
}

drawBarChart([1,2,4,8,16], {height:500, width:500, spacing:10, colour:"#800080", text:"#C0C0C0", align:"center"}, "div1");
