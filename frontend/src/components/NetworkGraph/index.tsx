import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

interface NetworkGraphProps {
  nodes: Node[];
  links: Link[];
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create the simulation with forces
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Add lines for links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    // Add circles for nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2');

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as unknown as Node).x!)
        .attr('y1', (d) => (d.source as unknown as Node).y!)
        .attr('x2', (d) => (d.target as unknown as Node).x!)
        .attr('y2', (d) => (d.target as unknown as Node).y!);

      node
        .attr('cx', (d) => d.x!)
        .attr('cy', (d) => d.y!);
    });

    // Cleanup function to stop the simulation
    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  return <svg ref={svgRef}></svg>;
};
