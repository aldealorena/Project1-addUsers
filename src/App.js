import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#6dbbc0',
      color:'#222222',
      users: [], 
      posts: [],
      showUsers: true,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const usersFilter = users.filter(user => user.id < 7);
        users.forEach(user => {
          user.isGoldClient = false;
        });
        this.setState({users: usersFilter});
      })

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response=> response.json())
      .then(posts => {
        const postsFilter = posts.filter(post => post.id < 8);
        this.setState({posts: postsFilter});
        // console.log(posts);
      })



  }

  // for background color
  handleBackgroundColor(event) {
    this.setState({background: event.target.value});
  }

  // for text color
  handleColor(event){
    this.setState({color: event.target.value});
  }



  handleAddUsers()  {
    this.setState((prevState) => {
      return {users: prevState.users, showUsers: true};
    });
  }


  handleAddPosts(){
    this.setState((prevState) => {
      return {posts: prevState.posts, showUsers: false };
    }); 

  }




  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();
    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient
          }
        ]
      }
    });
  }


  clearItems(name, email, isGoldClient) {
    this.setState({
      name: '',
      email: '',
      isGoldClient: false
    });   
  }

  deleteUser(id){
    const newUsers = this.state.users.filter((user) => {
      return user.id !== id
    });
    
    this.setState({users: newUsers})   

  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color:this.state.color}}>
        <h1> Proiectul 1- Lorena Aldea</h1>

  

        {/* changes for text and background!*/}
        <div className="change-things">
          <div className="change-background">
            <p>Let's chage the background guys!</p>
            <input type="color" onChange={(event) => this.handleBackgroundColor(event)}/>
          </div>

          <div className="change-text-color">
            <p>Let's change the text color!</p>
            <input type="color" onChange={(event) => this.handleColor(event)}/>
          </div>




        </div>

        <div className="app-button-position">
         
         <button 
           className={this.state.showUsers === true ? "app-button-list button-active" : "app-button-list button-not-active"} 
           onClick={()=> this.handleAddUsers()}>Show Users!!!!!
         </button>

         <button 
           className={this.state.showUsers === false ? "app-button-list button-active" : "app-button-list button-not-active"}  
           onClick={()=> this.handleAddPosts()}>Show Posts!!!!!         
         </button>

       </div>




        {/* let's show the users ORR the posts */}
        <div>
        {this.state.showUsers === true 
          ? <div className="app-boxes-position">
              <UserAddForm submitAddForm={(event, name, email, isGoldClient) => this.submitAddForm(event, name, email, isGoldClient)} clearItems={( name, email, isGoldClient)=> this.clearItems( name, email, isGoldClient)}/>
              <UserList users={this.state.users} salary={`550E`} img="https://images.unsplash.com/photo-1472068996216-8c972a0af9bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80" alt="profile" deleteUser={(id)=>this.deleteUser(id)}/>
            </div>          
          : <PostList posts={this.state.posts} /> 
          } 


        </div>
        
      
      </div>
    );
  }
}

export default App;
