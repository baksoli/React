import React, {useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";
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
    return (
        <div className={"row"}>
            <H/>
            <SearchBar/>
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

function SearchBar(){
    //useCallback
    return (
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"} placeholder={"Search"}/>
                </td>
            </tr>
        </table>
    )
}
//useMemo
const H=()=>{
    //memo
    return (
        <h1 className={"text-center"}>Music Top 50</h1>
    )
}

const H2=()=>{

}

export default App3;