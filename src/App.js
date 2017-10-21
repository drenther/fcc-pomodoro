import React, { Component } from 'react';
import SnackBar from 'material-ui/Snackbar';
import { Timer, TimerInput, Button } from './components';
import { fetchFromCache, saveToCache } from './utils/helpers';

class App extends Component {
	constructor() {
		super();
		const { sessionLength, breakLength } = fetchFromCache();
		this.state = {
			state: 'stopped',
			sessionLength,
			breakLength,
			timeLeft: 0,
			session: false,
			toast: false,
			toastMsg: '',
		};
	}

	componentDidMount() {
		window.setInterval(this._timer, 1000);
	}

	componentWillUnmount() {
		window.clearInterval(this._timer);
	}

	_timer = () => {
		const { state, sessionLength, breakLength, session } = this.state;
		let timeLeft = this.state.timeLeft;
		if (state === 'running') {
			if (timeLeft === 0) {
				this.audio.play();
				if (session) this.setState({ timeLeft: breakLength, session: false });
				else this.setState({ timeLeft: sessionLength, session: true });
			} else {
				timeLeft--;
				this.setState({ timeLeft });
			}
		}
	};

	_change = (timer, step, type) => {
		const value = this.state[timer];
		const newValue =
			type === 'inc'
				? value + step >= 54000 ? value : value + step
				: value - step < 0 ? value : value - step;
		const newState = {
			state: 'stopped',
			session: false,
			timeLeft: 0,
			toast: true,
			toastMsg: 'Intervals reset!',
		};
		newState[timer] = newValue;
		this.setState({ ...newState }, () => {
			saveToCache(timer, newValue);
		});
	};

	_resetHandler = () => {
		const state = this.state.state;
		if (state === 'paused' || state === 'stopped') {
			this.setState({
				state: 'stopped',
				session: false,
				timeLeft: 0,
				toast: true,
				toastMsg: 'Timer reset done!',
			});
		} else {
			this.setState({
				toast: true,
				toastMsg: 'Pause timer for reset!',
			});
		}
	};

	_stateHandler = () => {
		if (this.state.state === 'paused' || this.state.state === 'stopped') {
			this.setState({
				state: 'running',
				toast: true,
				toastMsg: 'Timer Running!',
			});
		} else {
			this.setState({
				state: 'paused',
				toast: true,
				toastMsg: 'Timer Paused!',
			});
		}
	};

	_snackClose = () => this.setState({ toast: false });

	render() {
		const {
			state,
			toast,
			toastMsg,
			sessionLength,
			breakLength,
			timeLeft,
			session,
		} = this.state;
		const totalTime = session ? sessionLength : breakLength;
		return (
			<div className="app">
				<header className="header">
					<h1>Pomodoro Clock</h1>
				</header>
				<main>
					<div className="inputs-wrapper">
						<TimerInput
							name="break"
							secs={breakLength}
							changeHandler={this._change}
						/>
						<TimerInput
							name="session"
							secs={sessionLength}
							changeHandler={this._change}
						/>
					</div>
					<div className="buttons-wrapper">
						<Button
							name="state"
							state={state}
							clickHandler={this._stateHandler}
						/>
						<Button
							name="reset"
							state={state}
							clickHandler={this._resetHandler}
						/>
					</div>
					<div className="timer-wrapper">
						<Timer {...{ session, totalTime, timeLeft }} />
					</div>
				</main>
				<SnackBar
					open={toast}
					message={toastMsg}
					autoHideDuration={3000}
					onRequestClose={this._snackClose}
				/>
				<audio src="./mp3/alarm.mp3" ref={el => (this.audio = el)} />
			</div>
		);
	}
}

export default App;
