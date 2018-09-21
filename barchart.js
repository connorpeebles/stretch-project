function findMaxY(values, scale) {
  var maxValue = 0;
  var i;

  if (typeof(values[0]) === typeof(1)) {
    for (i = 0; i < values.length; i++) {
      if (values[i] > maxValue) {
        maxValue = values[i];
      }
    }
  } else if (typeof(values[0]) === typeof([])) {
    for (i = 0; i < values.length; i++) {
      var sum = 0;
      for (var j = 0; j < values[i].length; j++) {
        sum += values[i][j];
      }
      if (sum > maxValue) {
        maxValue = sum;
      }
    }
  }

  var maxY = maxValue + (scale - maxValue % scale);
  return maxY;
}

function singleBarChart(values, chartWidth, chartHeight, barWidth, maxY, space, colour, labelColour, labelALign, element) {

  $(element).css({width: (chartWidth + 100) + "px", height: (chartHeight + 300) + "px"});

  var chartArea = $("<div>").attr("id", "chartArea");

  $(element).append(chartArea);

  $(chartArea).css({width: chartWidth + "px", height: chartHeight + "px"});

  var barHeight;
  var i;

  for (i = 0; i < values.length; i++) {
    var bar = $("<div>").addClass("bar");

    barHeight = values[i] / maxY * chartHeight;

    $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight) + "px", background: colour, color: labelColour});
    $(bar).text(values[i]);

    if (barHeight < 16) {
      $(bar).text("");
    } else if (labelALign === "center") {
      $(bar).css({lineHeight: barHeight + "px"});
    } else if (labelALign === "bottom") {
      $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
    } else {
      $(bar).css({lineHeight: 20 + "px"});
    }

    $(chartArea).append(bar);
  }
}

function stackedBarChart(values, legend, chartWidth, chartHeight, barWidth, maxY, space, labelColour, labelALign, element) {

  $(element).css({width: (chartWidth + 300) + "px", height: (chartHeight + 300) + "px"});

  var chartArea = $("<div>").attr("id", "chartArea");

  $(element).append(chartArea);

  $(chartArea).css({width: (chartWidth) + "px", height: (chartHeight) + "px"});

  var barHeight;
  var i;
  var j;

  for (i = 0; i < values.length; i++) {
    var stackHeight = 0;

    for (j = 0; j < values[i].length; j++) {
      var bar = $("<div>").addClass("bar");

      barHeight = values[i][j] / maxY * chartHeight;

      $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight - stackHeight) + "px", background: legend[j][1], color: labelColour});
      $(bar).text(values[i][j]);

      if (barHeight < 16) {
        $(bar).text("");
      } else if (labelALign === "center") {
        $(bar).css({lineHeight: barHeight + "px"});
      } else if (labelALign === "bottom") {
        $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
      } else {
        $(bar).css({lineHeight: 20 + "px"});
      }

      stackHeight += barHeight;

      $(chartArea).append(bar);
    }
  }
}

function drawXlabels(labels, chartWidth, chartHeight, barWidth, space, element) {

  var labelArea = $("<div>").attr("id", "xArea");

  $(labelArea).css({width: chartWidth + "px", marginTop: (chartHeight + 101) + "px"});

  $(element).append(labelArea);

  var i;

  for (i = 0; i < labels.length; i++) {
    var label = $("<div>").addClass("xLabel");

    $(label).css({height: barWidth + "px", marginLeft: (space + i * (barWidth + space)) + "px", lineHeight: barWidth + "px"});
    $(label).text(labels[i]);

    $(labelArea).append(label);
  }
}

function drawYlabels(scale, maxY, chartHeight, element) {

  var labelArea = $("<div>").attr("id", "yArea");

  $(labelArea).css({height: chartHeight + "px"});

  $(element).append(labelArea);

  var labelHeight;
  var i;

  for (i = 0; i <= maxY / scale; i++) {
    var label = $("<div>").addClass("yLabel");

    labelHeight = ((i * scale) / maxY) * chartHeight;

    $(label).css({marginBottom: (labelHeight - 13) + "px"});
    $(label).text((i * scale) + " -");

    $(labelArea).append(label);
  }
}

function drawTitle(text, size, colour, chartWidth, element) {

  var title = $("<div>").attr("id", "titleArea");

  $(title).css({width: chartWidth + "px", color: colour, fontSize: size + "pt"});
  $(title).text(text);

  $(element).append(title);
}

function drawLegend(chartWidth, chartHeight, legend, element) {

  var legendArea = $("<div>").attr("id", "legendArea");

  $(legendArea).css({height: chartHeight + "px", marginLeft: (chartWidth + 125) + "px"});
  $(legendArea).text("Legend:");

  $(element).append(legendArea);

  var i;

  for (i = 0; i < legend.length; i++) {
    var colourBox = $("<div>").addClass("legendLabel");
    var textBox = $("<div>").addClass("legendLabel");

    $(colourBox).css({background: legend[i][1], marginTop: (40 * i + 10) + "px"});
    $(textBox).css({width: 170 + "px", marginTop: (40 * i + 10) + "px", marginLeft: 30 + "px"});
    $(textBox).text(legend[i][0]);

    $(legendArea).append(colourBox, textBox);
  }
}

function drawBarChart(data, options, element) {

  var values = data.values;
  var labels = data.labels;
  var scale = data.scale;
  var title = data.title;
  var numBars = values.length;

  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;
  var colour = "#008000";
  var labelColour = "#FFFFFF";
  var labelALign = "top";
  var titleColour = "#000000";
  var titleSize = 14;

  if ("width" in options === true) {
    chartWidth = options.width;
  }

  if ("height" in options === true) {
    chartHeight = options.height;
  }

  if ("spacing" in options === true) {
    space = options.spacing;
  }

  if ("colour" in options === true) {
    colour = options.colour;
  }

  if ("labelColour" in options === true) {
    labelColour = options.labelColour;
  }

  if ("labelAlign" in options === true) {
    labelALign = options.labelAlign;
  }

  if ("titleColour" in options === true) {
    titleColour = options.titleColour;
  }

  if ("titleSize" in options === true) {
    titleSize = options.titleSize;
  }

  var maxY = findMaxY(values, scale);

  var barWidth = (chartWidth / numBars) - space;

  if (typeof(values[0]) === typeof(1)) {
    singleBarChart(values, chartWidth, chartHeight, barWidth, maxY, space, colour, labelColour, labelALign, element);
  } else if (typeof(values[0]) === typeof([])) {
    var legend = data.legend;
    stackedBarChart(values, legend, chartWidth, chartHeight, barWidth, maxY, space, labelColour, labelALign, element);
    drawLegend(chartWidth, chartHeight, legend, element);
  }

  drawXlabels(labels, chartWidth, chartHeight, barWidth, space, element);
  drawYlabels(scale, maxY, chartHeight, element);
  drawTitle(title, titleSize, titleColour, chartWidth, element);
}
