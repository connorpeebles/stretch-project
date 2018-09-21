/**
findMaxY is a function called to determine the maximum value to be displayed on the Y axis of a bar chart
The function takes in two parameters:
  - values: can be an array of numbers[>=0] representing the values of the bars, or an array of arrays of numbers[>=0]
            where each array represents a bar and each number represents the values of the individual stacks within the
            bar (arrays must be of equal length)
  - scale:  number representing the scale at which the values on the Y-axis increase by
**/
function findMaxY(values, scale) {
  var maxValue = 0;
  var i;

  // determines the maximum height of a bar in a single or stacked bar chart
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

  // determines the maximum value to be displayed on the Y axis such that it is larger than maxValue by at most scale
  var maxY = maxValue + (scale - maxValue % scale);
  return maxY;
}

/**
singleBarChart is a function called by drawBarChart to draw the chart area for a single bar chart.
The function takes in three parameters:
  - data:    object with four properties: values, labels, scale, and title (as defined for drawBarChart)
  - options: object with eight properties: width, height, spacing, colour, labelColour, labelAlign, titleColour, and
             titleSize (as defined for drawBarChart)
  - element: jQuery element that the chart is rendered into
**/
function singleBarChart(data, options, element) {

  // extracts needed information from data
  var values = data.values;
  var scale = data.scale;

  // extracts needed information from options
  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;
  var colour = options.colour;
  var labelColour = options.labelColour;
  var labelAlign = options.labelAlign;

  // updates the size of the area the the chart is rendered into
  $(element).css({width: (chartWidth + 100) + "px", height: (chartHeight + 300) + "px"});

  // creates the chart area that the bars are rendered to
  var chartArea = $("<div>").attr("id", "chartArea");
  $(chartArea).css({width: chartWidth + "px", height: chartHeight + "px"});
  $(element).append(chartArea);

  // determines the maximum value to be displayed on the Y axis of the chart and the width of the bars to be displayed
  var maxY = findMaxY(values, scale);
  var barWidth = (chartWidth / values.length) - space;
  var barHeight;
  var i;

  for (i = 0; i < values.length; i++) {
    // creates a bar for each value in values
    var bar = $("<div>").addClass("bar");

    // determines the bar's height
    barHeight = values[i] / maxY * chartHeight;

    // updates the position, colours, and text displayed for the bar
    $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight) + "px", background: colour, color: labelColour});
    $(bar).text(values[i]);

    // determines the position of the labels within the bar ("top", "center", or "bottom")
    if (barHeight < 16) {
      $(bar).text("");
    } else if (labelAlign === "center") {
      $(bar).css({lineHeight: barHeight + "px"});
    } else if (labelAlign === "bottom") {
      $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
    } else {
      $(bar).css({lineHeight: 20 + "px"});
    }

    // appends the bar to the chart area
    $(chartArea).append(bar);
  }
}

/**
stackedBarChart is a function called by drawBarChart to draw the chart area for a stacked bar chart.
The function takes in three parameters:
  - data:    object with five properties: values, labels, scale, title, and legend (as defined for drawBarChart)
  - options: object with seven properties: width, height, spacing, labelColour, labelAlign, titleColour, and titleSize
             (as defined for drawBarChart)
  - element: jQuery element that the chart is rendered into
**/
function stackedBarChart(data, options, element) {

  // extracts needed information from data
  var values = data.values;
  var scale = data.scale;
  var legend = data.legend;

  // extracts needed information from options
  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;
  var labelColour = options.labelColour;
  var labelAlign = options.labelAlign;

  // updates the size of the area the the chart is rendered into
  $(element).css({width: (chartWidth + 300) + "px", height: (chartHeight + 300) + "px"});

  // creates the chart area that the bars are rendered to
  var chartArea = $("<div>").attr("id", "chartArea");
  $(chartArea).css({width: chartWidth + "px", height: chartHeight + "px"});
  $(element).append(chartArea);

  // determines the maximum value to be displayed on the Y axis of the chart and the width of the bars to be displayed
  var maxY = findMaxY(values, scale);
  var barWidth = (chartWidth / values.length) - space;
  var barHeight;
  var i;
  var j;

  for (i = 0; i < values.length; i++) {
    // stackHeight keeps track of the current height of each stack
    var stackHeight = 0;

    for (j = 0; j < values[i].length; j++) {
      // creates a bar for each value in each array of values
      var bar = $("<div>").addClass("bar");

      // determines the bar's height
      barHeight = values[i][j] / maxY * chartHeight;

      // updates the position, colours, and text displayed for the bar
      $(bar).css({width: barWidth + "px", height: barHeight + "px", marginLeft: (space + i * (barWidth + space)) + "px", top: (chartHeight - barHeight - stackHeight) + "px", background: legend[j][1], color: labelColour});
      $(bar).text(values[i][j]);

      // determines the position of the labels within the bar ("top", "center", or "bottom")
      if (barHeight < 16) {
        $(bar).text("");
      } else if (labelAlign === "center") {
        $(bar).css({lineHeight: barHeight + "px"});
      } else if (labelAlign === "bottom") {
        $(bar).css({lineHeight: (2 * barHeight - 20) + "px"});
      } else {
        $(bar).css({lineHeight: 20 + "px"});
      }

      // increases the height of the stack by the height of the current bar
      stackHeight += barHeight;

      // appends the bar to the chart area
      $(chartArea).append(bar);
    }
  }
}

/**
drawXlabels is a function called by drawBarChart to draw the X axis labels for a bar chart.
The function takes in three parameters:
  - labels:  array of strings representing the labels associated with each value to be displayed on the X-axis
  - options: object with eight properties: width, height, spacing, colour, labelColour, labelAlign, titleColour, and
             titleSize (as defined for drawBarChart)
  - element: jQuery element that the chart is rendered into
**/
function drawXlabels(labels, options, element) {

  // extracts needed information from options
  var chartWidth = options.width;
  var chartHeight = options.height;
  var space = options.spacing;

  // determines the width of the bars displayed
  var barWidth = (chartWidth / labels.length) - space;

  // creates the label area that the labels are rendered to
  var labelArea = $("<div>").attr("id", "xArea");
  $(labelArea).css({width: chartWidth + "px", marginTop: (chartHeight + 101) + "px"});
  $(element).append(labelArea);

  var i;

  for (i = 0; i < labels.length; i++) {
    // creates a label for each label in labels
    var label = $("<div>").addClass("xLabel");

    // updates the position and text displayed for the label
    $(label).css({height: barWidth + "px", marginLeft: (space + i * (barWidth + space)) + "px", lineHeight: barWidth + "px"});
    $(label).text(labels[i]);

    // appends the label to the label area
    $(labelArea).append(label);
  }
}

/**
drawYlabels is a function called by drawBarChart to draw the Y axis labels for a bar chart.
The function takes in three parameters:
  - data:        object with four properties: values, labels, scale, and title (as defined for drawBarChart)
  - chartHeight: positive integer representing the height of the chart area (excluding titles, labels, etc.) in pixels
  - element:     jQuery element that the chart is rendered into
**/
function drawYlabels(data, chartHeight, element) {

  // extracts scale from data
  var scale = data.scale;

  // determines the maximum value to be displayed on the Y axis of the chart
  var maxY = findMaxY(data.values, scale);

  // creates the label area that the labels are rendered to
  var labelArea = $("<div>").attr("id", "yArea");
  $(labelArea).css({height: chartHeight + "px"});
  $(element).append(labelArea);

  var labelHeight;
  var i;

  for (i = 0; i <= maxY / scale; i++) {
    // creates a label for each multiple of scale less than or equal to maxY
    var label = $("<div>").addClass("yLabel");

    // determines the label height
    labelHeight = ((i * scale) / maxY) * chartHeight;

    // updates the position and text displayed for the label
    $(label).css({marginBottom: (labelHeight - 13) + "px"});
    $(label).text((i * scale) + " -");

    // appends the label to the label area
    $(labelArea).append(label);
  }
}

/**
drawTitle is a function called by drawBarChart to draw the title for a bar chart.
The function takes in three parameters:
  - text:    string representing the title to be displayed on the top of the bar chart
  - options: object with eight properties: width, height, spacing, colour, labelColour, labelAlign, titleColour, and
             titleSize (as defined for drawBarChart)
  - element: jQuery element that the chart is rendered into
**/
function drawTitle(text, options, element) {

  // extracts needed information from options
  var chartWidth = options.width;
  var colour = options.titleColour;
  var size = options.titleSize;

  // creates the title area that the text is rendered to
  var title = $("<div>").attr("id", "titleArea");
  $(element).append(title);

  // updates the position and text displayed for the title
  $(title).css({width: chartWidth + "px", color: colour, fontSize: size + "pt"});
  $(title).text(text);
}

/**
drawLegend is a function called by drawBarChart to draw the legend for a stacked bar chart.
The function takes in three parameters:
  - legend:  array of arrays of length two, where the first element is a string representing the key to be displayed
             in the legend for that stack, and the second element is a string representing the colour of that stack
             in hex
  - options: object with eight properties: width, height, spacing, colour, labelColour, labelAlign, titleColour, and
             titleSize (as defined for drawBarChart)
  - element: jQuery element that the chart is rendered into
**/
function drawLegend(legend, options, element) {

  // extracts needed information from options
  var chartWidth = options.width;
  var chartHeight = options.height;

  // creates the legend area that the legend keys are rendered to
  var legendArea = $("<div>").attr("id", "legendArea");
  $(element).append(legendArea);

  // updates the position of the legend and gives it a title
  $(legendArea).css({height: chartHeight + "px", marginLeft: (chartWidth + 125) + "px"});
  $(legendArea).text("Legend:");

  var i;

  for (i = 0; i < legend.length; i++) {
    // creates a colour box and a text box for each key in legend
    var colourBox = $("<div>").addClass("legendLabel");
    var textBox = $("<div>").addClass("legendLabel");

    // updates the position and colour of each colour box
    $(colourBox).css({background: legend[i][1], marginTop: (40 * i + 10) + "px"});

    // updates the position of each text box
    $(textBox).css({width: 170 + "px", marginTop: (40 * i + 10) + "px", marginLeft: 30 + "px"});
    $(textBox).text(legend[i][0]);

    // appends the colour box and text box to the legend area
    $(legendArea).append(colourBox, textBox);
  }
}

/**
drawBarChart is the main function called by the user to create the bar chart.
The function takes in three parameters:
  - data: object with four to five mandatory properties:
    - values: can be an array of numbers[>=0] representing the values of the bars, or an array of arrays of numbers[>=0]
              where each array represents a bar and each number represents the values of the individual stacks within the
              bar (arrays must be of equal length)
    - labels: array of strings representing the labels associated with each value to be displayed on the X-axis (must be
              same length as values)
    - scale:  number representing the scale at which the values on the Y-axis increase by
    - title:  string representing the title to be displayed on the top of the bar chart
    - legend: ONLY REQUIRED FOR A STACKED BAR CHART - array of arrays of length two, where the first element is a string
              representing the key to be displayed in the legend for that stack, and the second element is a string
              representing the colour of that stack in hex (must be same length as each element in values)
  - options: object with up to eight optional properties:
    - width:       positive integer representing the width of the chart area (excluding titles, labels, etc.) in pixels
    - height:      positive integer representing the height of the chart area (excluding titles, labels, etc.) in pixels
    - spacing:     positive integer representing the width of whitespace between all the bars in pixels
    - colour:      ONLY USED FOR NON-STACKED BAR CHART - string representing the colour of the bars in hex
    - labelColour: string representing the colour of the labels displayed within each bar in hex
    - labelAlign:  string representing the position of the labels displayed within each bar - accepts "top", "center", or
                   "bottom"
    - titleColour: string representing the colour of the title displayed at the top of the chart in hex
    - titleSize:   positive integer representing the pt size of the font for the title
  - element: jQuery element that the chart is rendered into
**/
function drawBarChart(data, options, element) {

  // adds default values to any options that were not specified by the user
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

  // extracts values from data
  var values = data.values;

  // draws a single bar chart if values is a list of numbers, or draws a stacked bar chart if values is a list of list of numbers
  if (typeof(values[0]) === typeof(1)) {
    singleBarChart(data, options, element);
  }else if (typeof(values[0]) === typeof([])) {
    stackedBarChart(data, options, element);
    drawLegend(data.legend, options, element);
  }

  // draws the labels on the X and Y axes and the chart title
  drawXlabels(data.labels, options, element);
  drawYlabels(data, options.height, element);
  drawTitle(data.title, options, element);
}
