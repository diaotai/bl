import  React  from "./bl";
import  ReactDOM  from "./bl";
import "./test.css";


let i =0;
class FuckApp extends React.Component {
  // shouldComponentUpdate(nextProps,nextState){
  //   return false;
  // }
  // componentWillUpdate(nextProps,nextState){
  //   console.log("I am from update",nextState)
  // }
  // componentDidUpdate(nextProps,preState){
  //   console.log("updated",preState)
  // }
  // componentWillMount(){
  //   console.log("I will mount");
  // }
  componentDidMount(){
    console.log("mounted");
    this.setState({text:"world666"})
  }
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      clas:"hello",
      text:"hello"
    };
    // setInterval(
    //   function() {
    //     const color = [
    //       "#eee",
    //       "black",
    //       "red",
    //       "green",
    //       "blue",
    //       "grey",
    //       "#133234",
    //       "#123213",
    //       "222345",
    //       "998232"
    //     ];
    //     const rand = parseInt(Math.min(10, Math.random() * 10));
    //     this.setState({
    //       color: color[rand]
    //     });
    //   }.bind(this),
    //   1000
    // );

  }

  render() {
   // console.log("render!!!",this.state)
    return (
      <div className={this.state.clas} onClick={(e)=>{console.log(i,"iiiiiiii"); this.setState({text:++i})}}>
        <div
          style={{
            height: "100px",
            width: "100px",
            background: this.state.color
          }}
          className="I am FuckApp component"
        >
        {this.state.text}
        </div>
      </div>
    );
  }
}
FuckApp.defaultProps={
  hello:"hello"
}

let root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

ReactDOM.render(<FuckApp />, document.getElementById("root"));
