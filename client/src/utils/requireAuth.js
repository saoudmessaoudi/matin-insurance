import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import history from "../history";


export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        UNSAFE_componentWillMount() {
            if (!this.props.logged_in) {
                history.push('/auth/login');
            }
        }

        UNSAFE_componentWillUpdate = nextProps => {
            if (!nextProps.logged_in) {
                history.push('/auth/login');
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
            logged_in: state.auth.logged_in
        };
    }

    return connect(mapStateToProps)(Authenticate);
}
