import { useRef, useState } from "react"
import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === ''
const isFiveChars = (value) => value.trim().length === 5


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })


    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()


    const confirmHandler = (event) => {
        event.preventDefault()




        const enteredName = nameInputRef.current.value
        const enteredStret = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value


        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStret)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalIsValid = isFiveChars(enteredPostal)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;


        if (!formIsValid) {
            return

        }

        props.onConfirm({
            name: enteredName,
            street: enteredStret,
            city: enteredCity,
            postalCode: enteredPostal
        })

    }



    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name && classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.street && classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street' />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}

            </div>
            <div className={`${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal' />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}

            </div>
            <div className={`${classes.control} ${!formInputsValidity.city && classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}

            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )

}

export default Checkout