import { React } from "./createElement";
import { ReactDOM } from "./render";

let com = document.createElement("div");
com.innerHTML = "你好";
com.onclick = () => {
  console.log("hello world");
};
document.body.appendChild(com);
ReactDOM.render(
    <div style={{
        background: '#eee',
        height: '100px',
        width: '100px'
    }} className='fuck'
    >
        <div
            className='bitch'
            style={{
                background: 'red',
                height: '40px',
                width: '40px'
            }} />
             <div
            className='bitch'
            style={{
                background: 'red',
                height: '40px',
                width: '40px'
            }} />
    </div>,
  document.body
);
