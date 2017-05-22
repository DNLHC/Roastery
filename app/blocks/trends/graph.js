import $ from 'jquery';

export default class {
	constructor(root, years, animDuration = 280) {
		this.root = root;
		this.years = years;
		this.currentYear = Object.keys(this.years)[0];
		this.animDuration = animDuration;
	}

	initializeGraph() {
		this.getEl('#svg-graph')
			.attr({width: this.getParentWidth()});

		const controls = this.getEl('.js-trends-controls');

		$.each(this.years, index => {
			controls.append(
				`<button
					type='button'
					class='tabs__button'
					aria-selected='${index === '2013' ? 'true' : 'false'}'
					data-value='${index}'>${index}</button>`
			);
		});

		controls.children().on(
			'click',
			this.handleToggleClick.bind(this)
		);

		this.updateGraph();
	}

	getPercent() {
		return (this.getParentWidth() / 100) * this.years[this.currentYear];
	}

	getParentWidth() {
		return this.root.width();
	}

	setCurrentYear(value) {
		this.currentYear = value;
	}

	getEl(selector) {
		return this.root.find(selector);
	}

	handleToggleClick(evt) {
		const target = evt.target;
		const value = $(target).attr('data-value');

		if (value === this.currentYear) {
			return;
		}

		this.setCurrentYear(value);
		this.updateGraph();

		const buttons = this.getEl('.tabs__button');
		const valueLabel = this.getEl('.js-trends-value');

		buttons.each((_, button) => {
			$(button).attr('aria-selected', 'false');
		});

		$(target).attr('aria-selected', 'true');
		valueLabel.text(`${this.years[value]}%`);
	}

	updateGraph() {
		const percent = this.getPercent();
		const marker = this.getEl('.trends__marker');
		const graphRect = this.getEl('.graph-rect');

		marker.animate({
			left: (percent - (marker.width() / 2))
		}, this.animDuration);

		$({width: graphRect.attr('width')})
			.animate({width: percent}, {
				duration: this.animDuration,
				step(now) {
					graphRect.attr('width', now);
				}
			});
	}
}
