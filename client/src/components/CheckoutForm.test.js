import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>)
});

test("form shows success message on submit with form details", () => {
    //Arrange:
    render(<CheckoutForm/>)

    //Act:
    const firstnameInput = screen.getByLabelText(/first name/i);
    const lastnameInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    //Adding text to inputs
    fireEvent.change(firstnameInput, {target:{value:'Johnny'}})
    fireEvent.change(lastnameInput, {target:{value:'Xiong'}})
    fireEvent.change(addressInput, {target:{value:'1321 House St.'}})
    fireEvent.change(cityInput, {target:{value:'Minneapolis'}})
    fireEvent.change(stateInput, {target:{value:'Minnesota'}})
    fireEvent.change(zipInput, {target:{value:'31513'}})

    // Clicking Checkout Button
    const message = screen.queryByText(/johnny xiong/i)
    expect(message).not.toBeInTheDocument()


    const checkout = screen.getByRole('button')
    fireEvent.click(checkout)

    //Assert:
    expect(firstnameInput).toHaveValue('Johnny')
    expect(lastnameInput).toHaveValue('Xiong')
    expect(addressInput).toHaveValue('1321 House St.')
    expect(cityInput).toHaveValue('Minneapolis')
    expect(stateInput).toHaveValue('Minnesota')
    expect(zipInput).toHaveValue('31513')

    const successMessage = screen.queryByText(/johnny xiong/i)
    const successAddress = screen.getByText(/house/i)
    expect(successMessage).toBeInTheDocument()
    expect(successAddress).toHaveTextContent(/st/i)

});
