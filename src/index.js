import { React } from "./createElement";
import { ReactDOM } from "./render";

class FuckApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red'
        }
        setInterval(function () {
            const color = ['#eee', 'black', 'red', 'green', 'blue','grey','#133234','#123213','222345','998232']
            const rand = parseInt(Math.min(10, Math.random() * 10))
            this.setState({
                color: color[rand]
            })
        }.bind(this), 1000);
    }
    

    render() {
        return <div
            style={{ height: '100px', width: '100px', background: this.state.color }}
            className='I am FuckApp component' />
    }
}

let root = document.createElement("div");
root.setAttribute("id","root");
document.body.appendChild(root)

ReactDOM.render(
    <FuckApp />,
  document.getElementById("root")
);
