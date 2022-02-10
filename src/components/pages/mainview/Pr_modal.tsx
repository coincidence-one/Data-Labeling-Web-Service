/* body 타입스크립트 파일, 리액트 연결
 <Button variant="danger">프로젝트 생성 </Button> 프로젝트 생성 버튼
 <input className="pro_search" placeholder='프로젝트 검색'></input>프로젝트 검색창*/
 
 import React, {useState, FC} from 'react';
 import '../../css/Pr_main.css';
 import Pr_add from './Pr_add';
 
 const Body:FC = () => {
     const [proModal, setproModal] = useState(false);
     return(
       <>
       <div className="Body">
       <Pr_add show ={proModal} onHide={()=>setproModal(false)} />
          <input className="pro_search" placeholder='프로젝트 검색'></input>
         <button className="pr_add_btn" onClick={ ()=>setproModal(true)} >프로젝트 생성 </button> 
      
     </div>
     </>
     );
 }
 
 export default Body;