export default (appointments, filters, buttons, withMatin) => {
    const table_data = [];
    let had_button_case = false;


    if(!appointments || appointments.length === 0 )
        return [{
            title: "No pending appointments",
            italic : true,
            donTrim : false,
            contents: []
        }];

    appointments.map(appointment => {
        const object = {
            title: appointment.client_name,
            id: appointment.id,
            object: appointment,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){
                case "users":
                    content = {
                        type:"avatar-group",
                        task_id:appointment._id
                    };
                    break;
                case "status":
                    content = {
                        type:"badge",
                        value: getStatus(appointment.status).status,
                        class: getStatus(appointment.status).class
                    };
                    break;
                case "progress":
                    content = {
                        type:"progress",
                        value: appointment.completion,
                        class: getBarClass(appointment.completion)
                    };
                    break;
                case "date":
                    content = {
                        value: getDate(appointment.date)
                    }
                    break;
                case "time":
                    content = {
                        value: getTime(appointment.date)
                    }
                    break;
                case "buttons":
                    had_button_case = true;
                    content = {
                        type: "button-group",
                        value: []
                    }
                    const buttonData = getActionButton(appointment, withMatin);
                    let i=0;
                    buttonData.map(button => {
                        content.value.push({title: button.title, callback: buttons[i].callback, class: button.class});
                        i++;
                    })
            }
            object.contents.push(content);
        });
        if(buttons && !had_button_case) {
            const buttonContent = {type:"buttons",actions: []};
            buttons.map(button => {
                buttonContent.actions.push({title: button.title, callback: button.callback, class: button.class});
            })
            object.contents.push(buttonContent);
        }
        table_data.push(object);
    })

    return table_data;
}

const getStatus = (status) => {
    const result = {
        status: '',
        class: ''
    }
    switch (status){
        case 0:
            result.status = 'Waiting';
            result.class = 'bg-info';
            break;
        case 1:
            result.status = 'Accepted';
            result.class = 'bg-success';
            break;
        case 2:
            result.status = 'Cancelled';
            result.class = 'bg-danger';
            break;
        case 3:
            result.status = 'Done';
            result.class = 'bg-success';
            break;
        default:
            result.status = 'Unknown';
            result.class = 'bg-blue';
            break;
    }
    return result;
}

const getBarClass = (value) => {
    if(value<50)
        return "bg-gradient-danger"
    if(value<70)
        return "bg-gradient-warning"
    if(value<90)
        return "bg-gradient-info"
    return "bg-gradient-success"
}

const getDate = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${mo} ${da}, ${ye}`;
}

const getActionButton = (appointment, withMatin) => {
    const result = [
        {
            title: '',
            class: '',
        },
        {
            title: '',
            class: '',
        }
    ]
    if(withMatin){
        if(appointment.status === 2 )
        return [
            {
                title: 'Hidden',
                class: 'd-none',
            },
            {
                title: 'Hidden',
                class: 'd-none',
            }
        ];
        else 
       
        return [
            {
                title: 'Cancel',
                class: 'bg-gradient-danger border-0',
            },
            {
                title: 'Hidden',
                class: 'd-none',
            }
        ];
    }

    switch (appointment.status){
        case 0:
            result[0].title = 'Accept';
            result[1].title = 'Deny';
            result[0].class = 'bg-gradient-success border-0';
            result[1].class = 'bg-gradient-danger border-0';
            break;
        case 1:
            result[0].title = 'Email';
            result[1].title = 'Cancel';
            result[0].class = 'bg-gradient-info border-0';
            result[1].class = 'bg-gradient-danger border-0';
            break;
        case 2:
        case 3:
        default:
            result[0].title = 'Email';
            result[0].class = 'bg-gradient-info border-0';
            result[1].class = 'd-none';
            break;
    }
    return result;
}

const getTime = (date) => new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(new Date(date));
