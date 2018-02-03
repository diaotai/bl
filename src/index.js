import { React } from "./createElement";
import { ReactDOM } from "./render";
import "./test.css";
import { setTimeout } from "timers";

class FuckApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      clas:"hello"
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
        this.setState({clas:"world"})
    },5000)
  }
//   click(e) {
//     this.setState({
//       clas:this.state.clas=="hello"?"world":"hello"
//     })
//   }

  render() {
    return (
      <div className={this.state.clas} >
        <div
          style={{
            height: "100px",
            width: "100px",
            background: this.state.color
          }}
          className="I am FuckApp component"
        />
      </div>
    );
  }
}

let root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

ReactDOM.render(<FuckApp />, document.getElementById("root"));
