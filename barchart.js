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

function singleBarChart(data, options, element) {

  var values = data.values;
  var scale = data.scale;

  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;
  var colour = options.colour;
  var labelColour = options.labelColour;
  var labelAlign = options.labelAlign;

  $(element).css({width: (chartWidth + 100) + "px", height: (chartHeight + 300) + "px"});

  var chartArea = $("<div>").attr("id", "chartArea");
  $(chartArea).css({width: chartWidth + "px", height: chartHeight + "px"});
  $(element).append(chartArea);

  var maxY = findMaxY(values, scale);
  var barWidth = (chartWidth / values.length) - space;
  var barHeight;
  var i;

  for (i = 0; i < values.length; i++) {
    var bar = $("<div>").addClass("bar");

    barHeight = values[i] / maxY * chartHeight;

    $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight) + "px", background: colour, color: labelColour});
    $(bar).text(values[i]);

    if (barHeight < 16) {
      $(bar).text("");
    } else if (labelAlign === "center") {
      $(bar).css({lineHeight: barHeight + "px"});
    } else if (labelAlign === "bottom") {
      $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
    } else {
      $(bar).css({lineHeight: 20 + "px"});
    }

    $(chartArea).append(bar);
  }
}

function stackedBarChart(data, options, element) {

  var values = data.values;
  var scale = data.scale;
  var legend = data.legend;

  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;
  var labelColour = options.labelColour;
  var labelAlign = options.labelAlign;

  $(element).css({width: (chartWidth + 300) + "px", height: (chartHeight + 300) + "px"});

  var chartArea = $("<div>").attr("id", "chartArea");
  $(chartArea).css({width: chartWidth + "px", height: chartHeight + "px"});
  $(element).append(chartArea);

  var maxY = findMaxY(values, scale);
  var barWidth = (chartWidth / values.length) - space;
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
      } else if (labelAlign === "center") {
        $(bar).css({lineHeight: barHeight + "px"});
      } else if (labelAlign === "bottom") {
        $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
      } else {
        $(bar).css({lineHeight: 20 + "px"});
      }

      stackHeight += barHeight;

      $(chartArea).append(bar);
    }
  }
}

function drawXlabels(labels, options, element) {

  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;

  var barWidth = (chartWidth / labels.length) - space;

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

function drawYlabels(data, chartHeight, element) {

  var scale = data.scale;
  var maxY = findMaxY(data.values, scale);

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

function drawTitle(text, options, element) {

  var chartWidth = options.width;
  var colour = options.titleColour;
  var size = options.titleSize;

  var title = $("<div>").attr("id", "titleArea");

  $(title).css({width: chartWidth + "px", color: colour, fontSize: size + "pt"});
  $(title).text(text);

  $(element).append(title);
}

function drawLegend(legend, options, element) {

  var chartWidth = options.width;
  var chartHeight = options.height;

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

  if (!("width" in options)) {
    options.width = 500;
  }
  if (!("height" in options)) {
    options.height = 300;
  }
  if (!("spacing" in options)) {
    options.spacing = 5;
  }
  if (!("colour" in options)) {
    options.colour = "#008000";
  }
  if (!("labelColour" in options)) {
    options.labelColour = "#FFFFFF";
  }
  if (!("labelAlign" in options)) {
    options.labelAlign = "top";
  }
  if (!("titleColour" in options)) {
    options.titleColour = "#000000";
  }
  if (!("titleSize" in options)) {
    options.titleSize = "14";
  }

  var values = data.values;

  if (typeof(values[0]) === typeof(1)) {
    singleBarChart(data, options, element);
  }else if (typeof(values[0]) === typeof([])) {
    stackedBarChart(data, options, element);
    drawLegend(data.legend, options, element);
  }

  drawXlabels(data.labels, options, element);
  drawYlabels(data, options.height, element);
  drawTitle(data.title, options, element);
}
