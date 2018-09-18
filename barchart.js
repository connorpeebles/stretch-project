/**
drawBarChart is the main function called by the user to create the bar chart.
The function takes in three parameters:
  - data: object with three mandatory properties:
    - values: array of numbers representing the values of the bars
    - labels: array of strings representing the labels associated with each value to be displayed on the X-axis (must be same length as values)
    - scale:  number representing the scale at which the values on the Y-axis increase by
  - options: object with up to nine optional properties: height, width, spacing, colour, labelColour, labelAlign, title, titleColour, titleSize (see README file for details)
  - element: string representing the element that the chart is rendered into
**/
function drawBarChart(data, options, element) {
  var chartArea = document.getElementById(element);

  // extracts the parameters from 'data'
  var values = data.values;
  var labels = data.labels;
  var scale = data.scale;
  var numBars = values.length;

  // inititalizes the nine optional parameters from 'options' with default values
  var chartWidth = 500;
  var chartHeight = 300;
  var space = 5;
  var colour = "#008000";
  var textColour = "#FFFFFF";
  var textAlign = "top";
  var title = "Bar Chart";
  var titleColour = "#000000";
  var titleSize = 14;

  // checks if each of the nine optional properties are in 'options', and if so, updates the parameters from their default values
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

  if ("labelColour" in options === true) {
    textColour = options.labelColour;
  }

  if ("labelAlign" in options === true) {
    textAlign = options.labelAlign;
  }

  if ("title" in options === true) {
    title = options.title;
  }

  if ("titleColour" in options === true) {
    titleColour = options.titleColour;
  }

  if ("titleSize" in options === true) {
    titleSize = options.titleSize;
  }

  // runs through 'values' to determine the maximum value
  var maxValue = values[0];
  for (i = 1; i < values.length; i++) {
    if (values[i] > maxValue) {
      maxValue = values[i];
    }
  }

  // determines the largest value to be displayed on the Y-axis based on the maxValue and scale
  var maxY = maxValue + (scale - maxValue % scale);

  // determines the width of each bar and inititalizes the variable for barHeight
  var barWidth = (chartWidth / numBars) - space;
  var barHeight;

  // draws the bar for each value in 'values'
  for (var i = 0; i < values.length; i++) {
    var bar = document.createElement("div");
    bar.setAttribute("class", "div2");

    // determines the height of each bar
    barHeight = values[i] / maxY * chartHeight;

    // sets the width, height, placement, and colour of each bar
    bar.style.width = barWidth + "px";
    bar.style.height = barHeight + "px";
    bar.style.marginLeft = (space + i * (barWidth + space)) + "px";
    bar.style.top = (chartHeight - barHeight + 100) + "px";
    bar.style.background = colour;

    // labels each bar with its value sets the colour of the label
    bar.innerHTML = values[i];
    bar.style.color = textColour;

    // determines the placement of the label (top, center, or bottom of bar)
    if (values[i] === 0) {
      bar.innerHTML = "";
    } else if (textAlign === "center") {
      bar.style.lineHeight = barHeight + "px";
    } else if (textAlign === "bottom") {
      bar.style.lineHeight = (2 * barHeight - 20) + "px";
    } else {
      bar.style.lineHeight = 20 + "px";
    }

    // adds the bar to the chart area
    chartArea.appendChild(bar);
  }

  // calls drawXlabels to draw the labels on the X-axis
  drawXlabels(labels, chartWidth, barWidth, space, "div3");

  // calls drawYlabels to draw the labels on the Y-axis
  drawYlabels(scale, maxY, chartHeight, "div5");

  // calls drawTitle to draw the chart title
  drawTitle(title, titleSize, titleColour, chartWidth, "div7");
}

/**
drawXlabels is a helper function called by drawBarChart to create the labels on the X-axis.
The function takes in five parameters:
  - labels:     array of strings representing the labels associated with each value to be displayed on the X-axis
  - chartWidth: integer representing the width of the chart in pixels
  - barWidth:   integer representing the width of each bar in pixels
  - space:      integer representing the size of the space between the bars in pixels
  - element:    string representing element that the labels are rendered into
**/
function drawXlabels(labels, chartWidth, barWidth, space, element) {
  var labelArea = document.getElementById(element);

  // sets the width of the label area to match the width of the chart area
  labelArea.style.width = chartWidth + "px";

  // draws the label for each label in 'labels'
  for (var i = 0; i < labels.length; i++) {
    var label = document.createElement("div");
    label.setAttribute("class", "div4");

    // sets the text and placement of each label
    label.style.height = barWidth + "px";
    label.style.marginLeft = (space + i * (barWidth + space)) + "px";
    label.innerHTML = labels[i];
    label.style.lineHeight = barWidth + "px";

    // adds the label to the label area
    labelArea.appendChild(label);
  }
}

/**
drawYlabels is a helper function called by drawBarChart to create the labels on the Y-axis.
The function takes in four parameters:
  - scale:       number representing the scale at which the values on the Y-axis increase by
  - maxY:        number representing the largest value to be displayed on the Y-axis
  - chartHeight: integer representing the height of the chart in pixels
  - element:     string representing the element that the labels are rendered into
**/
function drawYlabels(scale, maxY, chartHeight, element) {
  var labelArea = document.getElementById(element);

  // sets the height of the label area to match the height of the chart area
  labelArea.style.height = (chartHeight + 13) + "px";

  // initializes the variable for labelHeight
  var labelHeight;

  // adds a label for each number between 0 and 'maxY' (inclusive)
  for (var i = 0; i <= maxY / scale; i++) {
    var label = document.createElement("div");
    label.setAttribute("class", "div6");

    // determines the label height
    labelHeight = ((i * scale) / maxY) * chartHeight;

    // sets the text and placement of the label
    label.innerHTML = (i * scale) + " -";
    label.style.marginBottom = labelHeight + "px";

    // adds the label to the label area
    labelArea.appendChild(label);
  }
}

/**
drawTitle is a helper function called by drawBarChart to create the title of the bar chart.
The function takes in five parameters:
  - text:       string representing the title to be displayed
  - size:       integer representing the font size of the text
  - colour:     string representing the colour of the text
  - chartWidth: integer representing the width of the chart in pixels
  - element:    string representing the element that the title in displayed in
**/
function drawTitle(text, size, colour, chartWidth, element) {
  var title = document.getElementById(element);

  // sets the text, font size, colour, and placement of the title
  title.innerHTML = text;
  title.style.fontSize = size + "pt";
  title.style.color = colour;
  title.style.width = chartWidth + "px";
}

drawBarChart({values: [1,2,3,4,5,6,7,8,9,10], labels: ["lol","look","at","my","text"], scale: 2}, {height:400, width:600, spacing:10, colour:"#800080", labelColour:"#C0C0C0", labelAlign:"top", title: "Lol Look at My Bar Chart", titleColour:"#00FF00", titleSize:16}, "div1");
