class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate, status, priority) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            priority: priority
        };

        this.tasks.push(task);
    }
    // Method to update task status as done
    updateTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id == id) {
                task.status = "Done";
                break;
            }
        }
    }
    // Method to update task status as done
    deleteTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id == id) {
                var removed = this.tasks.splice(i, 1);
                break;
            }
        }
    }

    // Create the render method
    render() {

        // Create an array to store the tasks' HTML
        const tasksHtmlList = [];
        var display;
        if (this.tasks.length == 0) {
            const taskHtml = createEmptyTasksHtml();
            tasksHtmlList.push(taskHtml);
        } else {

            // Loop over our tasks and create the html, storing it in the array
            for (let i = 0; i < this.tasks.length; i++) {
                // Get the current task in the loop
                const task = this.tasks[i];
                console.log(JSON.stringify(task, null, 4));
                // Format the date
                const date = new Date(task.dueDate);
                const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

                // show/hide property for mark as done button
                if (task.status == 'Done') {
                    display = "none"
                } else {
                    display = "inline"
                }

                const taskHtml = createTaskHtml(task, display);

                // Push it to the tasksHtmlList array
                tasksHtmlList.push(taskHtml);
            }
        }
        //persistnet data to local storage
        localStorage.setItem('tasks-persistent-data', JSON.stringify(this.tasks));

        // Create the tasksHtml by joining each item in the tasksHtmlList
        // with a new line in between each item.
        const tasksHtml = tasksHtmlList.join('\n');

        // Set the inner html of the tasksList on the page
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;

    }
}  //end of class