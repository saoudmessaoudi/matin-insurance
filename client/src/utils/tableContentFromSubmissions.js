export default (submissions, filters, buttons) => {
    const table_data = [];
    let had_button_case = false;

    if(!submissions || submissions.length === 0 )
        return [{
            title: "No submitted giveaway",
            italic : true,
            donTrim : false,
            contents: []
        }];

    submissions.map(submission => {
        const object = {
            title: submission.name,
            id: submission.id,
            object: submission,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){
                case "email":
                    content = {
                        value: submission.email
                    }
                    break;
                case "date":
                    content = {
                        value: submission.email /*getDate(submission.date)*/
                    }
                    break;
                case "buttons":
                    had_button_case = true;
                    content = {
                        type: "button-group",
                        value: []
                    }
                    const buttonData = getActionButton();
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

const getDate = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${mo} ${da}, ${ye}`;
}

const getActionButton = () => {
    return [
        {
            title: 'Delete',
            class: 'bg-gradient-danger border-0',
        }
    ];
}

