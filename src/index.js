import  React  from "./bl";
import  ReactDOM  from "./bl";
import "./test.css";

class FuckApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      clas:"hello",
      text:"hello"
    };
    setInterval(
      function() {
        const color = [
          "#eee",
          "black",
          "red",
          "green",
          "blue",
          "grey",
          "#133234",
          "#123213",
          "222345",
          "998232"
        ];
        const rand = parseInt(Math.min(10, Math.random() * 10));
        this.setState({
          color: color[rand]
        });
      }.bind(this),
      1000
    );
    setTimeout(()=>{
        this.setState({clas:"world",text:"world"})
    },5000)
    setTimeout(()=>{
      this.setState({text:"hello"})  
      console.log("hello")
  },10000);

  }

  render() {
    return (
      <div className={this.state.clas} onClick={(e)=>{console.log("hhhhhh")}}>
        <div
          style={{
            height: "100px",
            width: "100px",
            background: this.state.color
          }}
          className="I am FuckApp component"
        >
        {this.props.hello}
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
