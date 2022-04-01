import React from 'react';
import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import '../../css/DataPage.css';
import '../../css/Mainview.css';
import logout from '../../images/logout.png';
import Pagenation  from '../Pagenation/Pagenation';
import Posts from '../Posts/Posts';

const DataPage = () => {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts =(tmp:any) => {
      let currentPosts = 0;
      currentPosts = tmp.slice(indexOfFirst, indexOfLast);

      return currentPosts;
    }

    const{projectId} = useParams() //라우팅 처리용 함수?(현진쓰)
    
    const [data_list, setData] = useState<any>([//테이블 데이터 받아주는 배열
    ])
    //const pageList = data_list.map((data:any)=><li key={data.data_id}>{data.data_id}</li>);

   
    
    const [fileImage, setFileImage] = useState<any>([]);
   
    const imgName = [...data_list]
    const nextId = data_list.length // list 개수


    const onCheck = (e:any) => {
        //개별 체크박스를 선택, 해제 시켜주는 함수
        if(e.target.checked){
            e.target.checked = true;
        
        }
        else{
            e.target.checked = false;
       
        }
     
    }

    const onCheckAll = (e:any) => {
        //모든 체크박스를 선택, 해제 시켜주는 함수

        var ele:any =  document.getElementsByClassName('check');

        if(e.target.checked){
            for(var i = 0; i<ele.length; i++){
                ele[i].checked = true;
  
             
            }
        }

        else{
            for(var i = 0; i<ele.length; i++){
                ele[i].checked  = false;
             
                
            }
        }
    }
    const onDelete = () => {
        
        var chk:any = document.getElementsByClassName('check');
        var th:any = document.getElementById('tablelength'); //테이블 행 갯수 5
   
                    for(let i = th.rows.length - 1; i < th.rows.length; i--){
                 
                   if(chk[i].checked == true){
                            chk[i].parentElement.parentElement.remove();      
                   }
        }
       //setData([]);
    }
    
    const ImageUpload = (e:any) => {

        const file = e.target.files;
        const nowImageUrl = [...fileImage]
        
     
        for(let i = 0; i< file.length; i++){
            
            const name = file[i].name.toString()  
            const result = name.replace(/(.png|.jpg|.jpeg|.gif)$/, ''); //이미지 확장자 제거하는 replace 함수
            const url = URL.createObjectURL(file[i]);
            imgName.push({'data_id' :  i + data_list.length , 'name' : result }) 
           // imgName2.push({'name' : URL.createObjectURL(file[i]).toString()})
           // console.log(URL.createObjectURL(file[i]));
           // setFileImage([...fileImage,URL.createObjectURL(file[i])]);
            nowImageUrl.push(url)
            setData(imgName)
            setFileImage(nowImageUrl)
           
         
            
        }
        console.log('name', imgName) //이름 확인
        console.log('fileimg', nowImageUrl) //이름 확인
        console.log('next_id', nextId)
      

  //썸네일이 다 똑같이바뀜...setFileImage useState를 배열로 선언?
        e.target.value = '' //중복 파일 초기화를 위한 처리 
    }


    const Navigate = useNavigate();

    const onClickHandler = () => {
        axios.get('/api/users/logout')
          .then(response => {
       if(response.data.success) {
         console.log('logout')
        Navigate('/')
       }else {
         alert("Logout Failed")
       }
      }
      )
    }


    return (
        <div>
            <header>
                <title>메인뷰 페이지</title>
                </header>
                <nav className="sidebar">
                <Sidebar>                                        
                    </Sidebar>
                 </nav>
                    <div className="view"  style = {{display:'fixed'}}> {/*body 오류 떠서 div로 바꿨는디.. */}
                        <div className="view_header">
                        <h2 className="dashboard" >'{projectId}' 데이터 리스트</h2>
                      
                        <button  className="logout" onClick = {onClickHandler}><img className="icon" src={logout}></img></button>
                        <h3 className="welcome">원우연님 환영합니다</h3>
                        <div className="menu">
                        <input multiple id= "data" className="inputHide" type="file" accept="image/*" onChange={ImageUpload}></input>
                        <label htmlFor = "data" className="addData">이미지 업로드
                        </label>
                        <button className="del" onClick={onDelete}>선택 데이터 삭제</button>
                      
                        </div>
                        </div>
                        <div className="tables">
                        <Table  striped bordered hover >
                            <thead>
                                <tr>
                                    <th className="checks"><input className="boxs" type="checkbox" value='select' onClick={onCheckAll}></input>
                                        <label htmlFor="allCheck">전체 선택</label></th>
                                    <th>번호</th>
                                    <th>이미지 썸네일</th>
                                <th>데이터 명</th>
                                </tr>
                            </thead>

                            <tbody className="files" id="tablelength">
                            {
                               currentPosts(
                                  (data_list.map(
                                        (data: {name: String, data_id:any}) => (
                                            <tr key={data.data_id}>
                                                <td><input id = {data.data_id} className="check"  type="checkbox" onChange={onCheck}></input></td>
                                                <td>{data.data_id+1}</td>
                                                <td >{fileImage && (<img className="imgThumb" src={fileImage[data.data_id]}/>)}</td>
                                                <td>{data.name}</td>
                                            </tr>
                                        )
                                    )
                                  )
                               )
                            }
                            </tbody>
                            </Table>
                            <Pagenation postsPerPage={postsPerPage} totalPosts={data_list.length} paginate={setCurrentPage}></Pagenation>
                        </div>
                <div>
                    
                </div>
                    </div> 
                    
                    <footer>
                  
                    </footer>
        </div>
      );
    }

export default DataPage;