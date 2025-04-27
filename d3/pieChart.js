d3.csv("merged_movies_dataset.csv").then(data => {
    const svg = d3.select("#pie-chart svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          radius = Math.min(width, height) / 2;

    const genreCount = d3.rollup(data, v => v.length, d => d.primary_genre);
    const genres = Array.from(genreCount, ([genre, count]) => ({genre, count}));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 20);

    const g = svg.append("g")
      .attr("transform", `translate(${radius + 20},${height/2})`);

    const tooltip = d3.select("#pie-chart")
      .append("div")
      .style("position", "absolute")
      .style("background", "#ffffff")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "6px")
      .style("opacity", 0);

    g.selectAll("path")
      .data(pie(genres))
      .join("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.genre))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.data.genre}</strong><br/>Movies: ${d.data.count}`)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));

// ---- ADD LEGEND ----
const legend = svg.append("g")
  .attr("transform", `translate(${radius * 2 + 100}, 30)`)  // nicely beside pie
  .selectAll("g")
  .data(genres)
  .join("g")
  .attr("transform", (d, i) => `translate(0, ${i * 20})`);

legend.append("rect")
  .attr("width", 18)
  .attr("height", 18)
  .attr("fill", d => color(d.genre));

legend.append("text")
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", "0.35em")
  .text(d => d.genre)
  .style("font-size", "12px");

    });





