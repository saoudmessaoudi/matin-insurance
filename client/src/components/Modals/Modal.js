import React from 'react';
import Modal from 'react-modal';


class DetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : '20%',
                bottom                : 'auto',
                marginRight           : '-30%',
                border                : 'none',
                background            : 'none',
                padding               : 'none',
                transform             : 'translate(-50%, -50%)',
                zIndex                : '10'
            }
        };
    }


    render() {
        if(this.props.isOpen){
            document.querySelector("body").style.overflow = 'hidden';
        }else{
            document.querySelector("body").style.overflow = 'visible';
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                style={this.customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                appElement={document.querySelector("#modal")}
            >

                {this.props.children}
            </Modal>
        )
    }
}


export default DetailModal;