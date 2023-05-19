import { useEffect } from "react";
import { UndirectedGraph } from "graphology";
import { complete } from "graphology-generators/classic"
import { useLoadGraph } from "@react-sigma/core";
import _ from "lodash"
import "@react-sigma/core/lib/react-sigma.min.css";

function oneDigit(n: number): number {
  return n < 10 ? n : oneDigit([...n.toString()].map(Number).reduce((n, a) => a + n, 0));
}

function getNodePositions(size: number, selected: number):  {x: number, y: number}[] {
  return _.compact([...Array(size*size).keys()]
    .map(n => (n%size+1)*(Math.floor(n/size)+1))
    .map(n => oneDigit(n))
    .map((n, i) => n === selected && { x: i % size, y: size - Math.floor(i/size)}));
}

export default function Vedic({ size, selected }: { size: number, selected: number }) {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const arr = getNodePositions(size, selected);
    const iter = arr.values();

    const graph = complete(UndirectedGraph, arr.length);
    graph.updateEachNodeAttributes(_ => iter.next().value);
    
    loadGraph(graph);
  }, [loadGraph, size, selected]);

  return null;
};
