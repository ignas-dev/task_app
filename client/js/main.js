/*
    2020/28/3
    NOTE TASK FULL STACK PROJECT
    Ignas Rocys
*/ 


// UI CTRL
const ui_ctrl = (() => {
    const DOM_STRINGS = {
        btn_add_task: document.querySelector('#btn-add-task'),
        btn_load_more: document.querySelector('#loadMore-btn'),
        btn_cancel: document.querySelector('#cancel'),
        btn_save: document.querySelector('#save'),
        input_task_name: document.querySelector('#task-name'),
        option_project_name: document.querySelector('#option-project-name'),
        input_project_name: document.querySelector('#input-project-name'),
        input_search: document.querySelector('#searchInput'),
        task_date: document.querySelector('#task-date'),
        projects_container: document.querySelector('#projectsContainer'),
        task_container: document.querySelector('#tasksContainer'),
        add_task_modal: document.querySelector('#add-task-modal')
    }
    return {
        send_dom: () => DOM_STRINGS,
        toggle_class: (element,class_name) => {
            element.classList.toggle(class_name);
        },
        clear_inputs: (elements) => {
            elements.forEach(item => {
                item.value = '';
            })
        },
        get_inputs_value: (elements) => {
            let inputs_value = {}
            elements.forEach(item => {
                inputs_value[item.id] = item.value
            })
            return inputs_value;
        }
    }
})()
// DATA CTRL
const data_ctrl = (() => {
    const db = {
        tasks: []
    }
    const update_data = (data) => db.tasks.push(data)
    return {
        get_data: (data) => {
            // get data
            let dt = data;
            // update data
            update_data(dt);
        },
        test: () => db
    }
})()
// SERVER CTRL
const server_ctrl = (() => {
    return {

    }
})()
// APP CTRL
const app_ctrl = ((ui,data,server) => {
    // get dom strings
    const dom = ui.send_dom();

        // get inputs values and sent to the data ctrl whithin server
        const get_data_send_data = () => {
            // get inputs value
                let values = ui.get_inputs_value([
                    dom.input_project_name,
                    dom.input_task_name,
                    dom.task_date,
                    dom.option_project_name
                ])
            // send data
                data.get_data(values);
        }

    const event_handler = () => {
        // add event listener to add task button to toggle 'hide' class
        dom.btn_add_task.addEventListener('click', () => {
            ui.toggle_class(dom.add_task_modal, 'hide')
        })
        // add event listener to cancel button to toggle 'hide' class 
        // and clear all inputs after closing add task modal
        dom.btn_cancel.addEventListener('click', () => {
            // clear modal inputs values
            ui.clear_inputs([
                dom.input_task_name,
                dom.input_project_name,
                dom.option_project_name,
                dom.task_date]);
                // close modal
            ui.toggle_class(dom.add_task_modal, 'hide')
        })
        // add event listener to save button
        dom.btn_save.addEventListener('click', () => {
            // send inputs values
            get_data_send_data();
            // clear modal inputs values
            ui.clear_inputs([
                dom.input_task_name,
                dom.input_project_name,
                dom.option_project_name,
                dom.task_date]);
            // close modal
            ui.toggle_class(dom.add_task_modal, 'hide')
        })  
    }

    return {
        init: () => {
            console.log('Application starting')
            event_handler();
        }
    }
})(ui_ctrl,data_ctrl,server_ctrl)


// start app
app_ctrl.init();