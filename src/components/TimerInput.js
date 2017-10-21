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
				<h4 className="timer-title">{toTitleCase(name)} Length</h4>
				<div className="controls-wrapper">
					<div className="btn-group">
						<button
							className="ten-dec dec"
							onClick={() => changeHandler(timerName, 600, 'dec')}
						>
							-10
						</button>
						<button
							className="one-dec dec"
							onClick={() => changeHandler(timerName, 60, 'dec')}
						>
							-1
						</button>
					</div>
					<div className="display">{toMins(secs)}</div>
					<div className="btn-group">
						<button
							className="ten-inc inc"
							onClick={() => changeHandler(timerName, 600, 'inc')}
						>
							+10
						</button>
						<button
							className="one-inc inc"
							onClick={() => changeHandler(timerName, 60, 'inc')}
						>
							+1
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TimerInput;
