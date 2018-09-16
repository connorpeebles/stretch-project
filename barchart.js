function drawBarChart(data, element) {
  var chartCon = document.getElementById(element);
  chartCon.style.width = 300 + "px";

  for (var i = 0; i < data.length; i++) {
    var divElement = document.createElement("div");
    divElement.setAttribute("class", "div2");

    divElement.style.marginLeft = parseInt(i*2 + i*20) + "px";
    divElement.style.height = parseInt(data[i] * 10) + "px";
    divElement.style.width = parseInt(i*20) + "px";
    chartCon.appendChild(divElement);
  }
}

drawBarChart([5,20,30], "div1");
