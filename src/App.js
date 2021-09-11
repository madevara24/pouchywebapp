import './App.css';
import React from 'react';
import taskStore from './store/task';

class BaseComponent extends React.PureComponent {
  rerender = () => {
    this.setState({
      _rerender: new Date(),
    });
  }
}

class App extends BaseComponent {
  render() {
    return (
      <Home />
    );
  }

  async componentDidMount() {
    if (!taskStore.isInitialized) {
      console.log('popup initialize all offline data...');
      taskStore.setName("devara")
      await taskStore.initialize();
      console.log('popup done');
    }
  }
}

class Home extends BaseComponent{
  state = {
    newTaskContent : '',
    newTaskTags : ''
  }

  componentDidMount() {
    this.unsubTask = taskStore.subscribe(this.rerender);
  }

  componentWillUnmount() {
    this.unsubTask();
  }

  addTodo = async (event) => {
    event.preventDefault();
    let tags = this.state.newTaskTags.split(",")
    let task = {
      content:this.state.newTaskContent,
      tags:tags,
      finished:false,
      createdDate: new Date().toISOString()
    }
    console.log("Add task",task)
    await taskStore.addItem(task);
    this.setState({ newTaskContent : '', newTaskTags : '' });
    console.log(taskStore.data)
  }

  setTaskContent = (event) => {
    this.setState({
      newTaskContent: event.target.value,
    });
  }

  setTaskTags = (event) => {
    this.setState({
      newTaskTags: event.target.value
    });
  }

  uploadTasks = async () => {
    console.log('uploading...');
    try {
      await taskStore.upload();
      console.log('upload done');
    } catch (err) {
      alert(err.message);
      console.log('upload failed');
    }
  }

  render(){
    return(
      <div>
        <p>
          last upload: {taskStore.dataMeta.tsUpload}
        </p>
        <button onClick={() => this.uploadTasks()}>Upload</button>
        <h2>Add new task</h2>
        <form onSubmit={this.addTodo}>
          <p><label for="task_content">Task Content</label><textarea id="task_content" type='text' value={this.state.newTaskContent} onChange={this.setTaskContent} /></p>
          <p><label for="task_tags">Task Tags (Seperate with comma)</label><input id="task_tags" type='text' value={this.state.newTaskTags} onChange={this.setTaskTags} /></p>
          <p><button>submit</button></p>
        </form>
        {
          taskStore.data.map((task) => (
            <TaskCard task={task} />
          ))
        }
      </div>
    )
  }
}

class TaskCard extends BaseComponent{
  deleteTask = async (id) => {
    taskStore.deleteItem(id);
  }

  finishTask = async (task) => {
    console.log(task)
    task.finished = true
    taskStore.editItem(task._id, task);
  }

  render(){
    return(
      <div class="card">
        <h4>Task Section</h4>
        <button onClick={() => this.finishTask(this.props.task)}>Finish</button>
        <button onClick={() => this.deleteTask(this.props.task._id)}>Delete</button>
        <p key={this.props.task._id}>{this.props.task.content}</p>
        <p>{this.props.task.finished ? 'Finished' : 'Not finished'}</p>
        <p>{taskStore.checkIsUploaded(this.props.task) ? 'Uploaded' : 'Not Uploaded'}</p>
        <ul>
          {
            this.props.task.tags.map((tag) => (
              <li>{tag}</li>
            ))
          }
      </ul>
      </div>
    )
  }
}

export default App;
