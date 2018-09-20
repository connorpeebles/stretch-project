function drawBarChart(data, options, element) {

  // extracts the parameters from 'data'
  var values = data.values;
  var labels = data.labels;
  var scale = data.scale;
  var title = data.title;
  var numBars = values.length;

  // inititalizes the eight optional parameters from 'options' with default values
  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;
  var colour = "#008000";
  var labelColour = "#FFFFFF";
  var labelALign = "top";
  var titleColour = "#000000";
  var titleSize = 14;

  // checks if each of the eight optional properties are in 'options', and if so, updates the parameters from their default values
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

  // determines the largest value to be displayed on the Y-axis based on the maxValue and scale
  var maxY = findMaxY(values, scale);

  // determines the width of each bar and inititalizes the variable for barHeight
  var barWidth = (chartWidth / numBars) - space;

  // calls singleBarChart or stackedBarChart, depending on the data given
  if (typeof(values[0]) == typeof(1)) {
    singleBarChart(values, chartWidth, chartHeight, barWidth, maxY, space, colour, labelColour, labelALign, element);
  } else if (typeof(values[0]) == typeof([])) {
    var legend = data.legend;
    stackedBarChart(values, legend, chartWidth, chartHeight, barWidth, maxY, space, labelColour, labelALign, element);
    drawLegend(chartWidth, chartHeight, legend, "div8");
  }

  // calls drawXlabels to draw the labels on the X-axis
  drawXlabels(labels, chartWidth, chartHeight, barWidth, space, element);

  // calls drawYlabels to draw the labels on the Y-axis
  drawYlabels(scale, maxY, chartHeight, element);

  /**
  // calls drawTitle to draw the chart title
  drawTitle(title, titleSize, titleColour, chartWidth, "div7");
  **/
}

function findMaxY(values, scale) {
  var maxValue = 0;

  if (typeof(values[0]) == typeof(1)) {
    for (var i = 0; i < values.length; i++) {
      if (values[i] > maxValue) {
        maxValue = values[i];
      }
    }
  } else if (typeof(values[0]) == typeof([])) {
    for (var i = 0; i < values.length; i++) {
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

  $(element).css({width: chartWidth + "px", height: chartHeight + "px"});

  var barHeight;

  for (var i = 0; i < values.length; i++) {
    var bar = $("<div>").addClass("div2");

    barHeight = values[i] / maxY * chartHeight;

    $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight + 100) + "px", background: colour, color: labelColour});
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

    $(element).append(bar);
  }
}

function drawXlabels(labels, chartWidth, chartHeight, barWidth, space, element) {

  var labelArea = $("<div>").attr("id","div3");

  $(labelArea).css({width: chartWidth + "px", marginTop: (chartHeight + 1) + "px"});

  $(element).append(labelArea);

  for (var i = 0; i < labels.length; i++) {
    var label = $("<div>").addClass("div4");

    $(label).css({height: barWidth + "px", marginLeft: (space + i * (barWidth + space)) + "px", lineHeight: barWidth + "px"});
    $(label).text(labels[i]);

    $(labelArea).append(label);
  }
}

function drawYlabels(scale, maxY, chartHeight, element) {

  var labelArea = $("<div>").attr("id","div5");

  $(labelArea).css({height: chartHeight});

  $(element).append(labelArea);

  var labelHeight;

  for (var i = 0; i <= maxY / scale; i++) {
    var label = $("<div>").addClass("div6");

    labelHeight = ((i * scale) / maxY) * chartHeight;

    $(label).css({marginBottom: (labelHeight - 13) + "px"});
    $(label).text((i * scale) + " -");

    $(labelArea).append(label);
  }
}

drawBarChart({values: [1,2,3,4], labels: ["L1","L2","L3","L4"], scale: 1, title: "Title"}, {width: 600, height: 400}, $("#div1")[0]);
