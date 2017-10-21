import React, { Component } from 'react';
import CircularProgess from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import { percent, toTitleCase, toMinsSecs } from '../utils/helpers';

class Timer extends Component {
	static propTypes = {
		session: PropTypes.bool.isRequired,
		timeLeft: PropTypes.number.isRequired,
		totalTime: PropTypes.number.isRequired,
	};
	render() {
		const { session, timeLeft, totalTime } = this.props;
		const timerState = session ? 'session' : 'break';
		return (
			<div className={`timer ${timerState}`}>
				<div className="info">
					<h3 className="timerstate">{toTitleCase(timerState)}</h3>
					<h4 className="timeleft">{toMinsSecs(timeLeft)}</h4>
				</div>
				<CircularProgess
					min={0}
					max={100}
					mode="determinate"
					size={100}
					thickness={5}
					value={percent(totalTime - timeLeft, totalTime)}
				/>
			</div>
		);
	}
}

export default Timer;
