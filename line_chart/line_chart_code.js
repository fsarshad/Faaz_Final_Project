//Read the data
d3.csv("./line_chart/WorldCups.csv",
    // Now I can use this dataset:
    function(data) {
        // set the dimensions and margins of the graph
        var margin = {top: 40, right: 80, bottom: 60, left: 60},
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
        var svg = d3.select("body").select("#line_chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Add X axis --> it is a date format

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


        // var x = d3.scaleLinear()
        //     .domain([1930,2014])
        //     .range([ 0, width ]);
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x).tickFormat(d3.format(".4r")));
        // svg.append("text")
        //     .attr("class", "x label")
        //     .attr("text-anchor", "end")
        //     .attr("x", width - 200)
        //     .attr("y", height + 40)
        //     .text("Years");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 4000000])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function(d) { return x(d.Year) })
                .y(function(d) { return y(d.Attendance) }))

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (height / 30))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("World Cup in Years by Attendance");

    })
