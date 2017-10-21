import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toTitleCase } from '../utils/helpers';

class Button extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		clickHandler: PropTypes.func.isRequired,
	};

	render() {
		const { name, state, clickHandler } = this.props;
		const content = (() => {
			if (name === 'state') {
				if (state === 'paused') return 'resume';
				else if (state === 'stopped') return 'start';
				else return 'pause';
			}
			return name;
		})();
		return (
			<button className={`btn-${name}`} onClick={clickHandler}>
				{toTitleCase(content)}
			</button>
		);
	}
}

export default Button;
