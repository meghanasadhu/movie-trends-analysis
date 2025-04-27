// d3/treemap.js
d3.csv("merged_movies_dataset.csv").then(data => {
  const svg = d3.select("#treemap svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

  // Group by primary genre and count movies
  const genreCount = d3.rollup(data, v => v.length, d => d.primary_genre);
  const genres = Array.from(genreCount, ([genre, count]) => ({genre, count}));

  // Create a hierarchy
  const root = d3.hierarchy({children: genres})
      .sum(d => d.count)
      .sort((a, b) => b.value - a.value);

  // Treemap layout
  d3.treemap()
    .size([width, height])
    .paddingInner(2)
    (root);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const g = svg.append("g");

  // Create tooltip div
  const tooltip = d3.select("#treemap")
    .append("div")
    .style("position", "absolute")
    .style("background", "#ffffff")
    .style("border", "1px solid #ccc")
    .style("padding", "8px")
    .style("border-radius", "6px")
    .style("opacity", 0)
    .style("pointer-events", "none");

  const nodes = g.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  // Draw rectangles
  nodes.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.data.genre))
    .attr("stroke", "#fff")
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`<strong>${d.data.genre}</strong><br/>Movies: ${d.data.count}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(300).style("opacity", 0);
    });

  // Add text for bigger rectangles only
  nodes.filter(d => (d.x1 - d.x0) > 60 && (d.y1 - d.y0) > 20)
    .append("text")
    .attr("x", 5)
    .attr("y", 20)
    .text(d => d.data.genre)
    .attr("font-size", "12px")
    .attr("fill", "#ffffff")
    .attr("pointer-events", "none");
});



