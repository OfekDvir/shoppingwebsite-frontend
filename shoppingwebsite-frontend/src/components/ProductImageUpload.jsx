import { useState } from "react"

const ProductImageUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null)

    // כשמשתמש בוחר קובץ
    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        console.log("📸 Selected file:", selectedFile)
        setFile(selectedFile)
    }

    // שליחת הקובץ לשרת
    const handleUpload = async () => {
        console.log("📁 File before upload:", file)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/products/upload", {
                method: "POST",
                body: formData
                // חשוב: לא להוסיף headers ידניים!
            })

            const imagePath = await response.text()
            console.log("✅ Uploaded image path:", imagePath)

            onUpload(imagePath) // מחזיר ל־AddProduct את הנתיב
        } catch (error) {
            console.error("❌ Error uploading image:", error)
        }
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChange} />
            <button type="button" onClick={handleUpload}>Upload Image</button>
        </div>
    )
}

export default ProductImageUpload
