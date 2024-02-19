const RB=ReactBootstrap;
const firebaseConfig = {
    apiKey: "AIzaSyCEvT5vjYPX9ihc4FvKpZeO_dVmCrQ_fLM",
    authDomain: "web2566-d33c3.firebaseapp.com",
    projectId: "web2566-d33c3",
    storageBucket: "web2566-d33c3.appspot.com",
    messagingSenderId: "174639567626",
    appId: "1:174639567626:web:49c1c1cb88f3465f4ba0f3",
    measurementId: "G-B9ER4SFS9L"
  };
firebase.initializeApp(firebaseConfig);   
const db = firebase.firestore();


class App extends React.Component {
    title = (
      <RB.Alert variant="info">
        <b>Work6 :</b> Firebase
      </RB.Alert>
    );
    footer = (
      <div>
        By 653380101-6 Piyanat Roopsoong <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],

    }      
    render() {
      return (
        <RB.Card>
          <RB.Card.Header>{this.title}</RB.Card.Header>  
          <RB.Card.Body>
          <RB.Button onClick={()=>this.readData()}>Read Data</RB.Button>  
          <RB.Button onClick={()=>this.autoRead()} variant="warning">Auto Read</RB.Button>
          
            <table  class="table">
            <tr>
                <th scope="col">รหัสนักศึกษา</th>
                <th scope="col">คำนำหน้า</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">นามสกุล</th>
                <th scope="col">อีเมล</th>
            </tr>
            {this.state.students.map((std,index)=>(
                <tr >
                    <td>{std.id}</td>
                    <td>{std.title}</td>
                    <td>{std.fname}</td>
                    <td>{std.lname}</td>
                    <td>{std.email}</td>
                </tr>

            ))}
               
            </table>
          </RB.Card.Body>
          <RB.Card.Footer>{this.footer}</RB.Card.Footer>
        </RB.Card>          
      );
    }   
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }
    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }

   
  }


  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);

  root.render(<App />);
