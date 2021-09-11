import React from 'react';
import taskStore from '../store/task';
import BaseComponent from '../component/base';
import TaskCard from '../component/taskCard';

class Home extends BaseComponent {
    state = {
        newTaskContent: '',
        newTaskTags: ''
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
            content: this.state.newTaskContent,
            tags: tags,
            finished: false,
            createdDate: new Date().toISOString()
        }
        console.log("Add task", task)
        await taskStore.addItem(task);
        this.setState({ newTaskContent: '', newTaskTags: '' });
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

    render() {
        return (
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

export default Home