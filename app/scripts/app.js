import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Graph from '../blocks/trends/graph';


$(() => {
	svg4everybody();

	const years = {
		2013: 23,
		2014: 33,
		2015: 46,
		2016: 54
	};

	const graph = new Graph($('.js-trends'), years);
	graph.initializeGraph();
});
