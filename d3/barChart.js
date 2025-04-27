d3.csv("merged_movies_dataset.csv").then(data => {
    data.sort((a, b) => +b.worldwide_gross - +a.worldwide_gross);
    const top10 = data.slice(0, 10);

    const svg = d3.select("#bar-chart svg");
    const width = +svg.attr("width") - 100;
    const height = +svg.attr("height") - 100;
    const margin = {top: 50, right: 20, bottom: 100, left: 200};

    const x = d3.scaleLinear()
        .domain([0, d3.max(top10, d => +d.worldwide_gross)])
        .range([margin.left, width]);

    const y = d3.scaleBand()
        .domain(top10.map(d => d.movie_name))
        .range([margin.top, height])
        .padding(0.3);

    // Axis
    svg.append("g")
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(5).tickFormat(d3.format("$.2s")))
        .attr("color", "#1e3a8a");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .attr("color", "#1e3a8a");

    // Axis labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Worldwide Gross Revenue ($)")
        .attr("fill", "#1e3a8a")
        .style("font-weight", "bold");

    // Tooltip
    const tooltip = d3.select("#bar-chart")
        .append("div")
        .style("position", "absolute")
        .style("background", "#1e3a8a")
        .style("color", "white")
        .style("padding", "8px 12px")
        .style("border-radius", "8px")
        .style("opacity", 0)
        .style("font-size", "14px");

    svg.selectAll("rect")
        .data(top10)
        .enter()
        .append("rect")
        .attr("x", margin.left)
        .attr("y", d => y(d.movie_name))
        .attr("height", y.bandwidth())
        .attr("width", 0) // Start from 0 for animation
        .attr("fill", "#38bdf8")
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(`<strong>${d.movie_name}</strong><br/>Gross: $${(+d.worldwide_gross).toLocaleString()}`)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0))
        .transition()
        .duration(800)
        .attr("width", d => x(+d.worldwide_gross) - margin.left);
});

