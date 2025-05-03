import { useState } from 'react'
import Input from './Input'
import { createUser } from '../api/serverApi'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        customerPhone: '',
        address: {
            address: '',
            city: '',
            country: '',
            state: '',
            zipcode: ''
        }
    });



    const handleChange = (event) => {
        const { id, value } = event.target;

        if (['address', 'city', 'country', 'state', 'zipcode'].includes(id)) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [id]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await createUser(formData);
            console.log('✅ Registration successful:', data);
            alert('✔️ ההרשמה בוצעה בהצלחה!');
            // אפשר להוסיף כאן ניתוב לעמוד login או ניקוי הטופס
        } catch (error) {
            console.error('❌ Registration error:', error);
            if (error.response && error.response.status === 409) {
                alert('⚠️ המשתמש כבר קיים במערכת. נסה להתחבר במקום זאת.');
            } else {
                alert('❌ שגיאה במהלך ההרשמה. נסה שוב מאוחר יותר.');
            }
        }
    };
    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     console.log('Register Data:', formData)
    //     const data = await createUser(formData)
    //     console.log(data)


    // }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                labelText="First Name"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Last Name"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Phone"
                id="customerPhone"
                type="text"
                placeholder="Enter your phone"
                value={formData.customerPhone}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Password"
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Street Address"
                id="address"
                type="text"
                placeholder="Enter your street"
                value={formData.address.address}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="City"
                id="city"
                type="text"
                placeholder="Enter your city"
                value={formData.address.city}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="Country"
                id="country"
                type="text"
                placeholder="Enter your country"
                value={formData.address.country}
                handleChange={handleChange}
                required
            />
            <Input
                labelText="State"
                id="state"
                type="text"
                placeholder="Enter your state"
                value={formData.address.state}
                handleChange={handleChange}
            />
            <Input
                labelText="Zip Code "
                id="zipcode"
                type="text"
                placeholder="Enter your zip code"
                value={formData.address.zipcode}
                handleChange={handleChange}
            />

            <button type="submit">REGISTER</button>
        </form>
    )

}
export default Register
