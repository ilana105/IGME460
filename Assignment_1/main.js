function rowConverter(row) {
  return {
    app_name: row.app_name,
    downloads: parseInt(row.downloads),
    average_rating: parseFloat(row.average_rating),
    thirty_day_keep: parseFloat(row.thirty_day_keep)
  }
}

function makeChart1(dataset) {

  let w = 800;
  let h = dataset.length * 30;

  // sort the data by downloads
  // uses built-in Array.sort() with comparator function
  dataset.sort((a,b) => b.downloads - a.downloads);

  let chart1 = d3.select('#chart1')
    .attr('width', w)
    .attr('height', h);

  // our range is limited from 0 to width - 160, 
  // which is for the 80 pixels on left for axis and 
  // 20 pixels on right for padding
  let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.downloads)])
    .rangeRound([0, w - 160]);

  // using scale band to work with nominal values 
  // the Array.map() call allows us to get a new array
  // by calling a function on each item of the source array 
  // here it pulls out the app_name
  let yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.app_name))
    .rangeRound([40, h - 30])
    .paddingInner(0.05);

  // d3 allows scaling between colors
  // This is here for demonstrating that you *can* do this, though
  // in this instance, it's not a particularly good use of color.  
  // In your assignment, I'd question using a color scale here to 
  // visualize a third data variable and instead replace this with
  // either static values, or change the domain/range to apply to 
  // a data variable already in use in the chart to reinforce a 
  // a data variable visually.
  let colorScale = d3.scaleLinear()
    .domain([4.5, 5])
    .range(['#88d', '#ccf']);

  chart1.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 100)
    .attr('y', (d) => yScale(d.app_name))
    .attr('width', (d) => xScale(d.downloads))
    .attr('height', yScale.bandwidth())
    .attr('fill', 'lightsteelblue');

  // AXES
  chart1.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(100, ${h - 28})`)
    .call(d3.axisBottom(xScale));

  chart1.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(100,-8 )`)
    .call(d3.axisLeft(yScale));
}

function makeChart2(dataset) {
  let w = 800;
  let h = dataset.length * 30;

  // sort the data by downloads
  // uses built-in Array.sort() with comparator function
  dataset.sort((a,b) => b.average_rating - a.average_rating);

  let chart2 = d3.select('#chart2')
                  .attr('width', w)
                  .attr('height', h);

  // our range is limited from 0 to width - 100, 
  // which is for the 80 pixels on left for axis and 
  // 20 pixels on right for padding
  let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.average_rating)])
    .rangeRound([20, w - 150]);

  // using scale band to work with nominal values 
  // the Array.map() call allows us to get a new array
  // by calling a function on each item of the source array 
  // here it pulls out the app_name
  let yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.app_name))
    .rangeRound([20, h - 20]);

  chart2.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', 100)
        .attr('y', (d) => yScale(d.app_name))
        .attr('width', (d) => xScale(d.average_rating))
        .attr('height', 20)
        .attr('fill', 'lightsalmon');

  // AXES
  chart2.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(80, ${h - 28})`)
        .call(d3.axisBottom(xScale));

  chart2.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(100,-8 )`)
        .call(d3.axisLeft(yScale));
}

function makeChart3(dataset) {
  let w = 800;
  let h = dataset.length * 30;

  // sort the data by downloads
  // uses built-in Array.sort() with comparator function
  dataset.sort((a,b) => b.thirty_day_keep - a.thirty_day_keep);

  let chart3 = d3.select('#chart3')
                  .attr('width', w)
                  .attr('height', h);

  // our range is limited from 0 to width - 100, 
  // which is for the 80 pixels on left for axis and 
  // 20 pixels on right for padding
  let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.thirty_day_keep)])
    .rangeRound([20, w - 150]);

  let pScale = d3.scaleLinear()
                  .domain([0,1])
                  .range([20, w - 140]);

  // using scale band to work with nominal values 
  // the Array.map() call allows us to get a new array
  // by calling a function on each item of the source array 
  // here it pulls out the app_name
  let yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.app_name))
    .rangeRound([20, h - 20]);

  chart3.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', 100)
        .attr('y', (d) => yScale(d.app_name))
        .attr('width', (d) => xScale(d.thirty_day_keep))
        .attr('height', 20)
        .attr('fill', 'darkseagreen');

  // AXES
  chart3.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(80, ${h - 28})`)
        .call(d3.axisBottom(pScale).tickFormat(d3.format(".0%")));

  chart3.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(100,-8 )`)
        .call(d3.axisLeft(yScale));  
}

function makeChart4(dataset) {
  let w = 800;
  let h = dataset.length * 30;

  // sort the data by downloads
  // uses built-in Array.sort() with comparator function
  let chart4 = d3.select('#chart4')
                  .attr('width', w)
                  .attr('height', h);

  let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.downloads)])
    .rangeRound([20, w - 150]);

  let yScale = d3.scaleLinear()
    .domain([4.5, 5])
    .rangeRound([20, h - 20]);

  let rScale = d3.scaleSqrt()
    .domain(dataset.map((d) => d.average_rating))
    .rangeRound([1, 5]);

  chart4.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr("r", (d) => rScale(d.average_rating))
        .attr('cx', (d) => xScale(d.downloads) + 80)
        .attr('cy', (d) => yScale(d.average_rating))
        .attr('fill', 'burlywood');

  chart4.selectAll('text')
        .data(dataset)
        .enter()
        .append("text")
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text((d) => d.app_name)
        .attr("x", (d) => xScale(d.downloads) + 80)
        .attr("y", (d) => yScale(d.average_rating) - rScale(d.average_rating) - 1);

  // AXES
  chart4.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(80, ${h - 28})`)
        .call(d3.axisBottom(xScale));

  chart4.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(100,-8 )`)
        .call(d3.axisLeft(yScale));    
}

function makeChart5(dataset) {
  let w = 800;
  let h = dataset.length * 30;

  // sort the data by downloads
  // uses built-in Array.sort() with comparator function
  let chart5 = d3.select('#chart5')
                  .attr('width', w)
                  .attr('height', h);

  // our range is limited from 0 to width - 100, 
  // which is for the 80 pixels on left for axis and 
  // 20 pixels on right for padding
  let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.downloads)])
    .rangeRound([20, w - 150]);

  // using scale band to work with nominal values 
  // the Array.map() call allows us to get a new array
  // by calling a function on each item of the source array 
  // here it pulls out the app_name
  let yScale = d3.scaleBand()
    .domain(dataset.map((d) => d.thirty_day_keep))
    .rangeRound([20, h - 20]);

  let rScale = d3.scaleSqrt()
    .domain(dataset.map((d) => d.thirty_day_keep))
    .rangeRound([1, 5]);

  let pScale = d3.scaleBand()
    .domain(dataset.map((d) => d.thirty_day_keep/100))
    .range([20, h - 20]);

  chart5.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr("r", (d) => rScale(d.thirty_day_keep))
        .attr('cx', (d) => xScale(d.downloads) + 80)
        .attr('cy', (d) => yScale(d.thirty_day_keep))
        .attr('fill', 'thistle');

  chart5.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text((d) => d.app_name)
        .attr("x", (d) => xScale(d.downloads) + 80)
        .attr("y", (d) => yScale(d.thirty_day_keep) - rScale(d.thirty_day_keep) - 1);


  // AXES
  chart5.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(80, ${h - 28})`)
        .call(d3.axisBottom(xScale));

  chart5.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(100,-8 )`)
        .call(d3.axisLeft(pScale).tickFormat(d3.format(".1%")));   
}

window.onload = function () {
  d3.csv('fake_app_download_rating.csv', rowConverter)
    .then((dataset) => {

      makeChart1(dataset);
      makeChart2(dataset);
      makeChart3(dataset);
      makeChart4(dataset);
      makeChart5(dataset);
    });
}
