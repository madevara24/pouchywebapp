import React from 'react';
import taskStore from '../store/task';
import BaseComponent from '../component/base';

class TaskCard extends BaseComponent {
    deleteTask = async (id) => {
        taskStore.deleteItem(id);
    }

    finishTask = async (task) => {
        console.log(task)
        task.finished = true
        taskStore.editItem(task._id, task);
    }

    render() {
        return (
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

export default TaskCard;