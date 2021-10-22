import classes from './Modal.module.css'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'


const Backdrop = ( {onClose} ) => {
    return <div className={classes.backdrop} onClick={onClose}/>
};

const ModalOverlay = ( {children} ) => {
    return <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
    </div>
 // These two div are simply for styling purposes.
};


const portalElement = document.getElementById('overlays');

const Modal = ( {onClose, children} ) => {
    return <Fragment>
     {ReactDOM.createPortal(<Backdrop onClose={onClose}/>, portalElement)}
     {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
};

export default Modal
