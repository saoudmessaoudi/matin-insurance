import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import history from "../history";

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        UNSAFE_componentWillMount() {
            if (this.props.logged_in) {
                if(this.props.user.admin.toLowerCase() === 'true')
                    history.push('/admin/index');
                else{
                    history.push('/index.html');
                    window.location.reload(false)
                }
            }
        }

        UNSAFE_componentWillUpdate = nextProps => {
            if (nextProps.logged_in) {
                if(nextProps.user.admin.toLowerCase() === 'true')
                    history.push('/admin/index');
                else {
                    history.push('/index.html');
                    window.location.reload(false)
                }
            }
        };

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        logged_in: PropTypes.bool.isRequired,
    }

    function mapStateToProps(state) {
        return {
            logged_in: state.auth.logged_in,
            user: state.auth.user
        };
    }

    return connect(mapStateToProps)(Authenticate);
}
