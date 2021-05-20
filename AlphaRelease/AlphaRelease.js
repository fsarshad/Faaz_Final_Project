

// Parse the Data
d3.csv("./BarChart/WorldCups.csv", function(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 30, bottom: 40, left: 90},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("body")
        .select("#BarChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Number of Goals Scored From 1930-2014");

// X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.Year; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

// Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 220])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d.GoalsScored); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.GoalsScored); })
        .attr("fill", "purple")
        .on("mouseover", function(d) {
        div.transition().duration(200).style("opacity", .9);
        div .html( 'Number of goals scored that year '+d.GoalsScored+' | '+'Number of Matches Played that year '+d.MatchesPlayed)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");})
        .on("mouseout", function(d) {div.transition().duration(500).style("opacity", 0);})
})
