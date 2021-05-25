import React from 'react';
import {UncontrolledTooltip} from "reactstrap";
import server from "../../api/server";
//import {tasks_route} from "../../utils/serverRoutes";
import axios from "axios";
import filepath from "../../filepath";

class AvatarGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getTaskUsers(this.props.task_id);
    }

    getTaskUsers = async (task) => {
        try{
            const {data} = await server.get(/*tasks_route + */"/users/" + task, {
                headers: {
                    'x-auth-token': axios.defaults.headers.common['x-auth-token']
                }
            });
            this.setState({users: data});
        }catch(e){
            console.log(e);
            return null;
        }
    }

    getUsers(users, number = users.length){
        if(number > 5)
            number = 5;
        return users.map((user, key) => {
            if(number > 0) {
                number--;
                return (
                    <React.Fragment key={key}>
                        <a
                            className="avatar avatar-sm"
                            id={"user_" +user._id}
                            onClick={e => e.preventDefault()}
                        >
                            <img
                                alt="..."
                                className="rounded-circle"
                                src={filepath + `/profile-pics/${user.profile_img}`}
                            />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target={"user_" +user._id}
                        >
                            {user.name}
                        </UncontrolledTooltip>
                    </React.Fragment>
                );
            }else{
                return null;
            }
        })
    }

    render() {
        return (
            <div className="avatar-group">
                {this.getUsers(this.state.users)}
            </div>
        );
    }
}

export default AvatarGroup;