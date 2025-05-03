import { useState } from 'react'
import Input from './Input'
import ProductImageUpload from './ProductImageUpload'
import { addProduct } from '../api/serverApi'

const AddProduct = () => {
    const fieldData = {
        category: { labelText: 'Category' },
        description: { labelText: 'Description', type: 'text', placeholder: 'Product\'s category' },
        manufacturer: { labelText: 'Manufacturer', type: 'text', placeholder: 'factory name' },
        productName: { labelText: 'Name', type: 'text', placeholder: 'enter the name of the prouct' },
        productPrice: { labelText: 'Money', type: 'text', placeholder: 'How mush you give me' },
        unitStock: { labelText: 'Stock', type: 'text', placeholder: 'Inventory' },
        productImage: { labelText: 'Picture', type: 'text', placeholder: 'portrait of the products' }
    }

    const [formData, setFormData] = useState({
        category: '',
        description: '',
        manufacturer: '',
        productName: '',
        productPrice: 0,
        unitStock: 1,
        productImage: ''
    })

    const handleChange = (event) => {
        const { id, value } = event.target
        setFormData({ ...formData, [id]: value })
    }

    const handleImageUploaded = (imagePath) => {
        setFormData((prev) => ({ ...prev, productImage: imagePath }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Product Data:', formData)
        const data = await addProduct(formData)
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            {
                Object.keys(fieldData).map(fieldName =>
                    <Input
                        key={fieldName}
                        labelText={fieldData[fieldName].labelText}
                        id={fieldName}
                        type={fieldData[fieldName].type}
                        placeholder={fieldData[fieldName].placeholder}
                        value={formData[fieldName]}
                        handleChange={handleChange}
                    />
                )
            }

            <ProductImageUpload onUpload={handleImageUploaded} />

            {formData.productImage && (
                <div>
                    <p>Image preview:</p>
                    <img src={formData.productImage} alt="product" width="150" />
                </div>
            )}

            <button type="submit" disabled={!formData.productImage}>
                ADD PRODUCT
            </button>        </form>
    )
}

export default AddProduct


// return (

//     <form onSubmit={handleSubmit}>
//         {
//             Object.keys(data).map(fieldName => <Input labelText={data[fieldName].labelText} id={fieldName} type={data[fieldName].type} placeholder={data[fieldName].placeholder} value={formData[fieldName]} handleChange={handleChange} />)
//         }

//         <button type="submit">ADD PRODUCT</button>
//     </form>

