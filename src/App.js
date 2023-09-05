import "./App.css";
import axios from "axios";
import {useState, useEffect} from 'react';

function List({data,setData}) {
  const remove = (id)=>{
    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res=>{
      setData(res.data);
    })
  }
  return(
    <>
      {
        data.map(obj=>(
          <li key={obj.id}>
            {obj.msg}
            <button onClick={()=>{remove(obj.id)}}>삭제</button>
          </li>
        ))
      }
        
    </>
  )
}



function Write({setData}) {

  const insert = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{msg})
    .then(res =>{
      setData(res.data)
    })


  }; // 저장을 누르면 작성한 메세지를 가져오기 

  return (
    <div>
      <form onSubmit={insert}>
        <input type="text" name="msg" />
        <input type="submit" value="저장" />
      </form>
    </div>
  );
}

function App() {
  const [data,setData] = useState([]);

  const getData = ()=>{
  axios.get(`${process.env.REACT_APP_SERVER}/abc`)
  .then((res) => {
      setData(res.data);
    });
 }
  useEffect(()=>{ 
    getData() // useEffect 를 사용하는 이유   getData() 를 밖에 쓰게되면 반복실행되기 때문 1번만 실행할수있도록 여기 안에 씀 
  },[]);



  /* axios.post('https://port-0-jsonserver-6w1j2alm48bafe.sel5.cloudtype.app/abc/insert',{id:1000,name:'신규데이터'})
                                            // 요청만 하려고 넣은거고 이 데이터는 안 들어감 
 */
  return (
    <>
      <div>
        <h2>한줄댓글({data.length})</h2>
        <Write setData={setData}/>
        {/* 컴포넌트를 한 페이지에서 분리해서 쓸 수도 있다 but 가독성 떨어질수있음 */}
        <ul>
          <List data={data} setData={setData}/>
        </ul>
      </div>
    </>
  );
}
export default App;
