import { Fragment } from "react"
import classes from "./Modal.module.css"
import ReactDOM from "react-dom"

const BackDrop = (props) => {

    return <div className={classes.backdrop} onClick={props.onCloseCart}/>
}

const ModalOverlay = (props) => {

    return (
        <div className={classes.modal} >
            <div className={classes.content} >{props.children}</div>
        </div>
    )


}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onCloseCart={props.onCloseCart}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )


}

export default Modal