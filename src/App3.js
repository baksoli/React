import React, {useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";

// 함수형 컴포넌트 - useState, useEffect, useCallback, useMemo
//container

function App3(){
    // 데이터 읽는 곳
    // 변수 설정 useState
    const [music, setMusic]=useState([]);
    const [ss, setSs]=useState("");
    // 변수 초기 값 useEffect
    useEffect(()=>{
        axios.get("http://localhost:3000/music.json").then((res)=>{
            setMusic(res.data);
        })
    }, []) // mount할 때만 실행 => componentDidMount, componentDidUpdate
    // 이벤트 등록
    const handleUserInput=useCallback((ss)=>{
        setSs(ss);
    },[ss]) //,[ss] ss가 변경될 경우에만 호출. 
    // ss : 입력한 단어 => ss가 변경될 때만 호출
    return (
        <div className={"row"}>
            <H2/>
            <SearchBar ss={ss} onUserInput={handleUserInput}/>
            <div sytle={{"height":"30px"}}></div>
            <MusicTable music1={music} ss={ss}/>
        </div>
    )

}
/*
    var s = "abcdefg";
    var n = s.indexOf(a)
    n=0
    var k = s.indexOf(k)
    k=-1

 */
/*
    CallBack : 함수의 주소 기억.
    Memo : 함수의 리턴형을 기억.

 */
function MusicTable(props){
    //row 몇개를 넣을것인가
    let row=[];
    props.music1.forEach((m)=> {
        if(m.title.indexOf(props.ss)==-1)
        {
            return;
        }
        // 배열에 추가
        row.push(<MusicRow music={m}/>);
    })
    return (
        <table className={"table"}>
            <thead>
                <tr className={"danger"}>
                    <th>순위</th>
                    <th></th>
                    <th>노래명</th>
                    <th>가수명</th>
                </tr>
            </thead>
            <tbody>
                {row}
            </tbody>
        </table>
    )
}

function MusicRow(props){
    return(
        <tr>
            <td>{props.music.rank}</td>
            <td><img src={props.music.poster} width={"30"} height={"30"}/></td>
            <td>{props.music.title}</td>
            <td>{props.music.singer}</td>
        </tr>
    )
}

function SearchBar(props){
    //useCallback
    const onChange=(e)=>{
        props.onUserInput(e.target.value); //App3
    }
    return (
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"} placeholder={"Search"}
                           onChange={onChange} value={props.ss}/>
                </td>
            </tr>
        </table>
    )
}

const H=()=>{

    const color=["red","blue","green","yellow","pink"];
    const no=parseInt(Math.random()*5);
    // Math.random() => 0.0 ~ 0.99 => 5*0.0=>0.0 ~ 0.99*5 ==> 4.9999
    // -> parseInt -> 0~4 random 출력
    return (
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
}
//useMemo
//반복으로 동일한 데이터를 가져올 경우 memo 사용
//주로 header, footer
const H2=React.memo(()=>{
    //memo
    const color=["red","blue","green","yellow","pink"];
    const no=parseInt(Math.random()*5);
    // Math.random() => 0.0 ~ 0.99 => 5*0.0=>0.0 ~ 0.99*5 ==> 4.9999
    // -> parseInt -> 0~4 random 출력
    return (
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
});

export default App3;