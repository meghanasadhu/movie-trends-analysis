// d3/stackedAreaChart.js
d3.csv("merged_movies_dataset.csv").then(data => {
    // Set up dimensions
    const margin = {top: 50, right: 150, bottom: 50, left: 60},
          width = 900 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#stacked-area-chart svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data
    data.forEach(d => {
        d.year = +d.year;
        d.primary_genre = d.primary_genre || "Other";
    });

    // Filter years >= 2000
    data = data.filter(d => d.year >= 2000);

    // Group: year -> genre -> count
    const genreCounts = d3.rollup(data, 
        v => d3.rollup(v, v => v.length, d => d.primary_genre),
        d => d.year
    );

    // Stackable format
    const years = Array.from(genreCounts.keys()).sort((a,b) => a-b);
    const genres = new Set(data.map(d => d.primary_genre));
    const stackedData = years.map(year => {
        const row = {year: year};
        genres.forEach(genre => {
            row[genre] = genreCounts.get(year)?.get(genre) || 0;
        });
        return row;
    });

    // Scales
    const x = d3.scaleLinear()
        .domain([2000, d3.max(years)]) // start from year 2000
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(genres)
        .range(d3.schemeTableau10);

    // Stack generator
    const stack = d3.stack()
        .keys(Array.from(genres))
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    let series = stack(stackedData);

    // Update y domain
    y.domain([0, d3.max(series, s => d3.max(s, d => d[1]))]);

    // Area generator
    const area = d3.area()
        .x(d => x(d.data.year))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));

    // Tooltip div
    const tooltip = d3.select("#stacked-area-chart")
      .append("div")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Area paths
    const paths = svg.selectAll("path")
        .data(series)
        .join("path")
        .attr("fill", d => color(d.key))
        .attr("d", area)
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1);
            d3.select(this).style("stroke", "#000").style("stroke-width", 1.5);
        })
        .on("mousemove", function(event, d) {
            tooltip.html(`<strong>Genre:</strong> ${d.key}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
            tooltip.style("opacity", 0);
            d3.select(this).style("stroke", "none");
        });

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Labels

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Year");

    svg.append("text")
        .attr("x", -height/2)
        .attr("y", -40)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Number of Movies");

    // Interactive Legend
    const legend = svg.selectAll(".legend")
        .data(Array.from(genres))
        .join("g")
        .attr("class", "legend")
        .attr("transform", (d,i) => `translate(${width + 10},${i * 25})`)
        .style("cursor", "pointer")
        .on("click", function(event, genre) {
            // Toggle visibility
            const currentOpacity = d3.selectAll(`.area-${genre.replace(/\s/g, '')}`).style("opacity");
            d3.selectAll(`.area-${genre.replace(/\s/g, '')}`)
              .transition()
              .duration(500)
              .style("opacity", currentOpacity == 1 ? 0 : 1);
        });

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d));

    legend.append("text")
        .attr("x", 24)
        .attr("y", 13)
        .text(d => d);

    // Assign unique class to each area
    svg.selectAll("path")
        .attr("class", d => `area-${d.key.replace(/\s/g, '')}`);

});





