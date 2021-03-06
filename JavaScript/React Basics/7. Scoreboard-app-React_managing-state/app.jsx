// here we are managing state manually (w/o using a pattern like Flux or a library like Redux)
// we moved our score into a 'state object' from 'props object'
// so next we can modify it from inside the component
var PLAYERS = [
	{
		name: "Masha Blair",
		score: 30,
		id: 1
	},
	{
		name: "Sophie Blair",
		score: 33,
		id: 2
	},
	{
		name: "Elijah Blair",
		score: 37,
		id: 3
	}
]

function Header(props) {
	return (
		<header className="header">
        	<h1>{props.title}</h1>
      	</header>
	);
}

Header.propTypes = {
	title: React.PropTypes.string.isRequired,
};

// Counter as React class
var Counter = React.createClass({
	// so since we naw have 'state', we no longer need propTypes for score -- delete it:
	// but we can keep using propTypes as empty object too
	// let's add initialScore props and then update it every time <Counter /> is used
	propTypes: {
		//score: React.PropTypes.number.isRequired,
		initialScore: React.PropTypes.number.isRequired,
	},
	
	// this is how we manage state in React:
	getInitialState: function() {
		return {
			score: this.props.initialScore,
		}
	},
	
	// we will update our state here:
	// this method is connected with 'onClick' inside the increment button
	incrementScore: function(e) {
		// console.log('incrementScore', e);
		this.setState({
			score: (this.state.score + 1),
		});
	},
	
	decrementScore: function() {
		this.setState({
			score: (this.state.score -1),
		});
	},
	
	// state is data in our app that can change (score)
	// here we replace 'props' with 'state'
	render: function() {
		// in normal JS: onClick={this.decrementScore} -- 'this' will lose it's assotiation with the object instate, and instead become Window or null
		// so in normal JS we would have to use: 
		// onClick={this.decrementScore.bind(this)}
		// to keep this association. in React class we can also use it, but React will give us an warning saying that it's unnecessary -- this binding is done automatically
		return (
			<div className="counter">
			  <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
			  <div className="counter-score"> {this.state.score} </div>
			  <button className="counter-action increment" onClick={this.incrementScore}> + </button>
			</div>
		);
	}
});

// Counter as ES6 class
// here we add state
//class Counter extends React.Component {
//	constructor(props) {
//		super(props);
//		this.state = { score: 0 }
//	}
//	
//	// this has special meaning in React component class
//	// don't forget to add 'this.props.score'
//	render() {
//		return (
//			<div className="counter">
//			  <button className="counter-action decrement"> - </button>
//			  <div className="counter-score"> {this.state.score} </div>
//			  <button className="counter-action increment"> + </button>
//			</div>
//		);
//	}
//}

Player.propTypes = {
	name: React.PropTypes.string.isRequired,
	score: React.PropTypes.number.isRequired,
};

function Player(props) {
	// and delete 'score={props.score}' from <Counter />
	// and replace it instead with 'initialScore={props.score}' b/c we want to get those from our PLAYER array
	return (
		<div className="player">
		  <div className="player-name">
			{props.name}
		  </div>
		  <div className="player-score">
			<Counter initialScore={props.score} />
		  </div>
		</div>
	);
}

Player.propTypes = {
	name: React.PropTypes.string.isRequired,
	score: React.PropTypes.number.isRequired,
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
    
      <div className="players">
		  {props.players.map(function(player) {
			  return <Player name={player.name} score={player.score} key={player.id} />
		  })}
      </div>
    </div>
  );
}

Application.propTypes = {
	title: React.PropTypes.string,
	players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	players: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		score: React.PropTypes.number.isRequired,
	})).isRequired,
};

Application.defaultProps = {
	title: "Scoreboard",
}

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));



