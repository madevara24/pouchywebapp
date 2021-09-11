import React from 'react';
import taskStore from '../store/task';
import BaseComponent from '../component/base';

class TaskCard extends BaseComponent {
    state = {
        isEditing: false,
        editedTaskContent:"",
        editedTaskTags:""
    }

    async componentDidMount() {
        this.setState({
            isEditing: false,
            editedTaskContent: this.props.task.content,
            editedTaskTags: this.props.task.tags.toString(),
        });
      }

    deleteTask = async (id) => {
        taskStore.deleteItem(id);
    }

    finishTask = async (task) => {
        console.log(task)
        task.finished = true
        taskStore.editItem(task._id, task);
    }

    editTask = async() => {
        this.state.isEditing = !this.state.isEditing;
        this.rerender();
    }

    setTaskContent = (event) => {
        this.setState({
            editedTaskContent: event.target.value,
        });
    }

    setTaskTags = (event) => {
        this.setState({
            editedTaskTags: event.target.value
        });
    }

    updateTask = async (event) => {
        event.preventDefault();
        console.log("Update task")
        let tags = this.state.editedTaskTags.split(",")
        let task = this.props.task;
        task.content = this.state.editedTaskContent;
        task.tags = tags;
        console.log("Edited task", task)
        await taskStore.editItem(this.props.task._id, task);
        this.state.isEditing = !this.state.isEditing;
        this.rerender();
    }

    render() {
        return (
            <div class="card">
                <h4>Task Section</h4>
                <button onClick={() => this.finishTask(this.props.task)}>Finish</button>
                <button onClick={() => this.deleteTask(this.props.task._id)}>Delete</button>
                {
                    this.state.isEditing ?
                    <div>
                        <button onClick={() => this.editTask()}>Undo Edit</button>
                        <form onSubmit={this.updateTask}>
                            <p><label for="task_content">Task Content</label><textarea id="task_content" type='text' value={this.state.editedTaskContent} onChange={this.setTaskContent} /></p>
                            <p><label for="task_tags">Task Tags (Seperate with comma)</label><input id="task_tags" type='text' value={this.state.editedTaskTags} onChange={this.setTaskTags} /></p>
                            <p><button>Update</button></p>
                        </form>
                    </div>
                    :
                    <div>
                        <button onClick={() => this.editTask()}>Edit</button>
                        <p key={this.props.task._id}>{this.props.task.content}</p>
                        <p>{this.props.task.finished ? 'Finished' : 'Not finished'}</p>
                        <p>{taskStore.checkIsUploaded(this.props.task) ? 'Uploaded' : 'Not Uploaded'}</p>
                        <p>Created at {this.props.task.createdAt}</p>
                        <ul>
                            {
                                this.props.task.tags.map((tag) => (
                                    <li>{tag}</li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

export default TaskCard;