// d3/lineChart.js

const svg = d3.select("#line-chart svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      margin = { top: 50, right: 50, bottom: 50, left: 70 };

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("merged_movies_dataset.csv").then(data => {
  // Parse and clean
  data = data.map(d => ({
    year: +d.Year,
    rating: d.Rating ? parseFloat(d.Rating.split('/')[0]) : NaN
  })).filter(d => !isNaN(d.year) && !isNaN(d.rating));

  const avgRatingsByYear = Array.from(
    d3.rollup(
      data,
      v => d3.mean(v, d => d.rating),
      d => d.year
    ),
    ([year, avgRating]) => ({ year, avgRating })
  ).sort((a, b) => a.year - b.year);

  // Scales
  const x = d3.scaleLinear()
    .domain(d3.extent(avgRatingsByYear, d => d.year))
    .range([0, chartWidth]);

  const y = d3.scaleLinear()
    .domain([0, 10])
    .nice()
    .range([chartHeight, 0]);

  // Axis
  g.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  g.append("g")
    .call(d3.axisLeft(y));

  // Line
  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.avgRating))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(avgRatingsByYear)
    .attr("fill", "none")
    .attr("stroke", "#1e3a8a")
    .attr("stroke-width", 3)
    .attr("d", line);

  // Tooltip setup
  const tooltip = d3.select("#line-chart")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background", "white")
    .style("padding", "8px")
    .style("border", "1px solid #ccc")
    .style("border-radius", "6px");

  g.selectAll("circle")
    .data(avgRatingsByYear)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.avgRating))
    .attr("r", 5)
    .attr("fill", "#38bdf8")
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(`Year: ${d.year}<br/>Avg Rating: ${d.avgRating.toFixed(2)}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => tooltip.transition().duration(300).style("opacity", 0));
});


