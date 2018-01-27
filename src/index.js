import { React } from "./createElement";
import { ReactDOM } from "./render";

class FuckApp extends React.Component {
    render() {
        return <div className='I am FuckApp component' style={{backgroundColor:"red",height:"100px",width:"100px"}}></div>
    }
}

let root = document.createElement("div");
root.setAttribute("id","root");
document.body.appendChild(root)

ReactDOM.render(
    <FuckApp />,
  document.getElementById("root")
);
