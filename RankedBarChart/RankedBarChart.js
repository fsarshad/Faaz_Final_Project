

// Parse the Data
d3.csv("./RankedBarChart/Titles.csv", function(data) {
// set the dimensions and margins of the graph
    var margin = {top: 40, right: 30, bottom: 60, left: 90},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("body")
        .select("#RankedBarChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0,10])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 115)
        .attr("y", height + 50)
        .text("Number of Titles");
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (height / 20))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Countries that have won the most titles");

    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.Country; }))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))


    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "#ffae00")
        .style("opacity", 5)
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.Country); })
        .attr("width", function(d) { return x(d.Title); })
        .attr("height", y.bandwidth())
        .on("mouseover", function(d) {
            div.transition().duration(200).style("opacity", .9);
            div .html('Title: '+d.Title)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");})
        .on("mouseout", function(d) {div.transition().duration(500).style("opacity", 0);})



    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

})
