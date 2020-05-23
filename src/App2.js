import React, {useState, useEffect} from 'react'
import axios from 'axios'
/*
    <useState>
    const [변수명, 메소드]=userState("[]") :배열 ("{}") :오브젝트 ("0") :일반 (false) :bool
                    ======= setter
          [music, setMusic]
    useEffect(()=>{
        처리 => 데이터 읽기 axios, fetch...
    });

    componentDidMount
    componentDidUpdate
    ==================
    useEffect(()=>{
        처리 => 데이터 읽기 axios, fetch ..
    });

    componentDidMount
    useEffect(()=>{
        처리 => 데이터 읽기 axios, fetch ..
    },[])

 */
/*
    class App extends Component
    {
        constructor()          ============> const [music, setMusic] =useState([]);
        {
            this.state={
                music:[]
            }
        }
        componentDidMount()
        {
            this.setState({music:res.data})
        }

        ===============================>
                                        useEffect(()=>{
                                            처리 => 데이터 읽기 axios, fetch ..
                                        },[])
        render()
        {
            this.state.map((m)=>

            )
            return (
                html
            )
        }
    }

 */
function App2()
{
    //let music=[];
    const [music, setMusic] =useState([]);
    useEffect(()=>{
    axios.get('http://localhost:3000/music.json')
        .then((res)=>{
            setMusic(res.data);
            console.log(res.data)
        })
    },[])

    // 이벤트
    // 이벤트는 function 안에 있어야 한다.
    const handleChange=(e)=>{
        console.log(e.target.value);
    }
    //console.log(music);
    // render()
    // for() if()
    // html 내 다중 조건문은 아래와 같이 작성해야한다.
    const html = music.map((m)=>
        <tr>
            <td>{m.rank}</td>
            <td>
                {
                    m.state==="상승" &&
                        <span style={{"color":"red"}}>▲{m.idcrement}</span>
                }
                {
                    m.state==="하강" &&
                        <span style={{"color":"blue"}}>▼{m.idcrement}</span>
                }
                {
                    m.state==="유지" &&
                    <span style={{"color":"grey"}}>-</span>
                }

            </td>
            <td><img src={m.poster} width={"35"} height={"35"}/></td>
            <td>{m.title}</td>
            <td>{m.singer}</td>
        </tr>
    )
    return (
        // html 출력
        <div className={"row"}>
            <H2/>
            <div style={{"height":"30px"}}></div>
            <table className={"table"}>
                <tr>
                    <td>
                        <input type={"text"} className={"input-sm"} size={"25"}
                        onChange={handleChange}
                        />
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <thead>
                    <tr className={"success"}>
                        <th>순위</th>
                        <th>등폭</th>
                        <th></th>
                        <th>노래명</th>
                        <th>가수명</th>
                    </tr>
                </thead>
                <tbody>
                    {html}
                </tbody>
                </table>
        </div>
    )
}

// 함수 만드는 방법 3가지
function H1(){
    return (
        <h1 className={"text-center"}>Music Top 50</h1>
    )
}
const H2=()=>{
    const color=["red","orange","pink","yellow","blue"];
    const no=parseInt(Math.random()*5); //random(0.0~0.99)
    return (
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
}
const H3=function () {
    return (
        <h1 className={"text-center"}>Music Top 50</h1>
    )
}

export default App2;