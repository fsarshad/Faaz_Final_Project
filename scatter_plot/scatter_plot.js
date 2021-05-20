

//Read the data
d3.csv("./scatter_plot/WorldCups.csv", function(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 90, right: 30, bottom: 40, left: 100},
        width = 520 - margin.left - margin.right,
        height = 520 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("body")
        .select("#scatter_plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")


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

    // // Add X axis
    // var x = d3.scaleLinear()
    //     .domain([1930, 2015])
    //     .range([ 0, width ])
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).ticks(25).tickFormat(d3.format(".4r")))
    //     //.tickSize(-height*1).ticks(20))
    //     .select(".domain").remove()



    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 70])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add Y axis

    // var y = d3.scaleLinear()
    //     .domain([12, 65])
    //     .range([ height, 30])
    //     .nice()
    // svg.append("g")
    //     .call(d3.axisLeft(y).ticks(25).tickValues(['', '15','20', '25', '30', '35', '40','45',
    //         '50', '55', '60', '65']))
    //     .select(".domain").remove()


    // Customization
    // svg.selectAll(".tick line").attr("stroke", "grey")

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Year");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 45)
        .attr("x", -margin.top - height/2 + 150)
        .text("MatchesPlayed")

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -margin.left + 45)
        // .attr("y", 0 - (margin.top / 400))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Matches Played from 1930-2014");


    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Year);})
        .attr("cy", function (d) { return y(d.MatchesPlayed);})
        .attr("r", 5)
        .style("fill","#619CFF")

})
