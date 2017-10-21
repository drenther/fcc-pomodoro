import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toTitleCase, toMins } from '../utils/helpers';

class TimerInput extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		secs: PropTypes.number.isRequired,
		changeHandler: PropTypes.func.isRequired,
	};
	render() {
		const { name, secs, changeHandler } = this.props;
		const timerName = `${name}Length`;
		return (
			<div className="timer-wrapper">
				<h3 className="timer-title">{toTitleCase(name)} Length</h3>
				<div className="controls-wrapper">
					<div className="btn-group">
						<button
							className="ten-dec"
							onClick={() => changeHandler(timerName, 600, 'dec')}
						>
							--
						</button>
						<button
							className="one-dec"
							onClick={() => changeHandler(timerName, 60, 'dec')}
						>
							-
						</button>
					</div>
					<div className="display">{toMins(secs)}</div>
					<div className="btn-group">
						<button
							className="ten-inc"
							onClick={() => changeHandler(timerName, 600, 'inc')}
						>
							++
						</button>
						<button
							className="one-inc"
							onClick={() => changeHandler(timerName, 60, 'inc')}
						>
							+
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TimerInput;
