d3.csv("merged_movies_dataset.csv").then(data => {
    const svg = d3.select("#bubble-chart svg");
    const width = +svg.attr("width") - 100;
    const height = +svg.attr("height") - 100;
    const margin = {top: 40, right: 40, bottom: 60, left: 80};

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.budget_x)])
        .range([margin.left, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.revenue)])
        .range([height, margin.top]);

    const r = d3.scaleSqrt()
        .domain([0, d3.max(data, d => +d.revenue)])
        .range([5, 30]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("$.2s")))
        .attr("color", "#1e3a8a");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("$.2s")))
        .attr("color", "#1e3a8a");

    svg.selectAll("circle")
        .data(data.filter(d => d.budget_x && d.revenue))
        .enter()
        .append("circle")
        .attr("cx", d => x(+d.budget_x))
        .attr("cy", d => y(+d.revenue))
        .attr("r", d => r(+d.revenue))
        .attr("fill", "#0ea5e9")
        .attr("opacity", 0.6);
});

    