import {React} from "./createElement";
console.log(React)

let com = document.createElement("div");
com.innerHTML="你好";
com.onclick = ()=>{
    console.log("hello world")
}
document.body.appendChild(com)
console.log(<div className="hello">
    <span></span>
</div>)

