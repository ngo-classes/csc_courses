// public/assets/js/view.js
const WIDTH  = 1600;
const HEIGHT =  900;

export function renderGraph (courses) {
  // --- transform data -------------------------------------------------------
  const nodes = courses.map(c => ({ id: c.id, label: c.name }));
  const links = courses.flatMap(c =>
      c.prerequisites.map(p => ({ source: p, target: c.id })));

  // --- set up SVG -----------------------------------------------------------
  const svg = d3.select('#graph')
                .append('svg')
                .attr('width',  WIDTH)
                .attr('height', HEIGHT)
                .call(d3.zoom().on('zoom', ({transform}) =>
                      g.attr('transform', transform)));

  const g = svg.append('g');          // zoomable container

  // --- force simulation -----------------------------------------------------
  const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(WIDTH/2, HEIGHT/2));

  // --- draw links -----------------------------------------------------------
  const link = g.append('g')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2)
      .selectAll('line')
      .data(links).enter().append('line');

  // --- draw nodes -----------------------------------------------------------
  const node = g.append('g')
      .selectAll('g')
      .data(nodes).enter().append('g')
      .call(d3.drag()
        .on('start', dragStart)
        .on('drag',  dragged)
        .on('end',   dragEnd));

  node.append('circle')
      .attr('r', 25)
      .attr('fill', '#4682b4');

  node.append('text')
      .attr('x', 0)
      .attr('y', 5)
      .attr('text-anchor', 'middle')
      .text(d => d.id);

  // --- simulation tick ------------------------------------------------------
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  // --- helpers --------------------------------------------------------------
  function dragStart (event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  }
  function dragged (event, d) { d.fx = event.x; d.fy = event.y; }
  function dragEnd (event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null; d.fy = null;
  }
}

