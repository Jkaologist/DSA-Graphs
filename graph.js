/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) { 
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) { 
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) { 
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) { 
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    } 
    this.nodes.delete(vertex)
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) { 
    let seen = new Set();
    let res = [];

    function traversal(vertex) {
      if (!vertex) {
        return null;
      }

      seen.add(vertex);
      res.push(vertex.value);

      for (let neighbor of vertex.adjacent) {
        if (!seen.has(neighbor)) {
          traversal(neighbor);
        }
      }
    }
    traversal(start)
    return res;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set();
    let res = [];
    let currentVertex;

    seen.add(start);

    while (queue.length) {
      currentVertex = queue.shift();
      res.push(currentVertex.value);

      for (let neighbor of currentVertex.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return res;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { 
    if (start === end) {
      return 0;
    }
    
    let queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];
    
    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = { Graph, Node }
