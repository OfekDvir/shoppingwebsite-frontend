import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../api/serverApi"

function Users() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await getUserById(id)
                setCustomer(data)
            } catch (error) {
                console.error("Error fetching customer", error)
            }
        }

        fetchCustomer()
    }, [id])

    if (!customer) {
        return <div>Loading customer...</div>
    }

    return (
        <div>
            <h2>{customer.firstName} {customer.lastName}</h2>
            <p>Phone: {customer.customerPhone}</p>
        </div>
    )
}

export default Users
