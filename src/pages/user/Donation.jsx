// import React, { useState } from "react";
// import axios from "axios";
// import "./Donation.css";

// const Donation = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         phone: "",
//         email: "",
//         address: "",
//         note: "",
//         amount: ""
//     });

//     const [message, setMessage] = useState("");

//     // Handle input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle amount selection
//     const handleAmountClick = (amount) => {
//         setFormData({ ...formData, amount });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:5000/donate", formData);
//             setMessage("Donation successful!");
//             setFormData({ name: "", phone: "", email: "", address: "", note: "", amount: "" });
//         } catch (error) {
//             setMessage("Error processing donation. Please try again.");
//         }
//     };

//     return (
//         <div className="donation-page">
//             <div className="donation-header">
//                 <h1>Make a Difference Today</h1>
//                 <p>Join us in empowering communities and creating lasting change.</p>
//             </div>

//             <div className="donation-impact">
//                 <h2>Impact of Your Donation</h2>
//                 <div className="donation-grid">
//                     <div className="donation-card">
//                         <img src="5.jpg" alt="Wedding Project" />
//                         <h3>Wedding Project</h3>
//                         <p>Total Requirement</p>
//                         <p>5,00,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(500000)}>Donate</button>
//                     </div>
//                     <div className="donation-card">
//                         <img src="4.jpg" alt="Food Project" />
//                         <h3>Food Project</h3>
//                         <p>Total Requirement</p>
//                         <p>50,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(50000)}>Donate</button>
//                     </div>
//                     <div className="donation-card">
//                         <img src="3.jpg" alt="Education Project" />
//                         <h3>Education Project</h3>
//                         <p>Total Requirement</p>
//                         <p>1,00,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(100000)}>Donate</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="donation-form-section">
//                 <div className="donation-form-container">
//                     <div className="donation-form-info">
//                         <img src="Donation.png" alt="Blind’s Welfare Association" />
//                         <p>
//                             <strong>At Vision for All: Blind’s Welfare Association,</strong> your support transforms lives. For over 48 years, we have been dedicated to empowering visually impaired individuals through education, vocational training, and financial assistance. Your contributions help us provide essential resources and opportunities for a brighter, independent future.
//                         </p>
//                         <h3>Help us build a future where blindness is not a barrier to success. Donate today and be a part of the change!</h3>
//                     </div>

//                     <div className="donation-form">
//                         <h2 style={{color : "#4f4949"}}>Donate Now</h2>
//                         {message && <p className="message">{message}</p>}
//                         <form onSubmit={handleSubmit}>
//                             <label>Name</label>
//                             <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//                             <label>Email Address</label>
//                             <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//                             <label>Phone Number*</label>
//                             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

//                             <label>Address</label>
//                             <input type="text" name="address" value={formData.address} onChange={handleChange} required />

//                             <label>Note</label>
//                             <textarea name="note" value={formData.note} onChange={handleChange}></textarea>

//                             <h3>Choose Amount</h3>
//                             <div className="donation-amount-buttons">
//                                 <button type="button" onClick={() => handleAmountClick(50)}>₹50</button>
//                                 <button type="button" onClick={() => handleAmountClick(100)}>₹100</button>
//                                 <button type="button" onClick={() => handleAmountClick(200)}>₹200</button>
//                                 <button type="button" onClick={() => handleAmountClick(500)}>₹500</button>
//                             </div>

//                             <input type="number" className="custom-amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="₹ Other Amount" required />

//                             <button type="submit" className="donate-button">Donate</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Donation;

// real code
// import React, { useState } from "react";
// import axios from "axios";
// import "./Donation.css";

// const Donation = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         phone: "",
//         email: "",
//         address: "",
//         note: "",
//         amount: "", // Store the donation amount here
//     });

//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     // Handle input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle amount selection (predefined amounts)
//     const handleAmountClick = (amount) => {
//         setFormData({ ...formData, amount }); // Set the selected amount
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.amount) {
//             setMessage("Please select or enter a valid donation amount.");
//             return;
//         }

//         setLoading(true);
//         try {
//             // Send form data to backend to create PayPal order
//             const response = await axios.post("http://localhost:5000/donate", formData);
//             const { orderId, donationId } = response.data;

//             // Redirect user to PayPal for payment
//             window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;

//             setMessage("Donation successful!");
//             setFormData({ name: "", phone: "", email: "", address: "", note: "", amount: "" });
//         } catch (error) {
//             setMessage("Error processing donation. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="donation-page">
//             <div className="donation-header">
//                 <h1>Make a Difference Today</h1>
//                 <p>Join us in empowering communities and creating lasting change.</p>
//             </div>

//             <div className="donation-impact">
//                 <h2>Impact of Your Donation</h2>
//                 <div className="donation-grid">
//                     <div className="donation-card">
//                         <img src="5.jpg" alt="Wedding Project" />
//                         <h3>Wedding Project</h3>
//                         <p>Total Requirement</p>
//                         <p>5,00,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(500000)}>Donate</button>
//                     </div>
//                     <div className="donation-card">
//                         <img src="4.jpg" alt="Food Project" />
//                         <h3>Food Project</h3>
//                         <p>Total Requirement</p>
//                         <p>50,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(50000)}>Donate</button>
//                     </div>
//                     <div className="donation-card">
//                         <img src="3.jpg" alt="Education Project" />
//                         <h3>Education Project</h3>
//                         <p>Total Requirement</p>
//                         <p>1,00,000 Rs Only</p>
//                         <button onClick={() => handleAmountClick(100000)}>Donate</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="donation-form-section">
//                 <div className="donation-form-container">
//                     <div className="donation-form-info">
//                         <img src="Donation.png" alt="Blind’s Welfare Association" />
//                         <p>
//                             <strong>At Vision for All: Blind’s Welfare Association,</strong> your support transforms lives. For over 48 years, we have been dedicated to empowering visually impaired individuals through education, vocational training, and financial assistance. Your contributions help us provide essential resources and opportunities for a brighter, independent future.
//                         </p>
//                         <h3>Help us build a future where blindness is not a barrier to success. Donate today and be a part of the change!</h3>
//                     </div>

//                     <div className="donation-form">
//                         <h2 style={{ color: "#4f4949" }}>Donate Now</h2>
//                         {message && <p className="message">{message}</p>}
//                         <form onSubmit={handleSubmit}>
//                             <label>Name</label>
//                             <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//                             <label>Email Address</label>
//                             <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//                             <label>Phone Number*</label>
//                             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

//                             <label>Address</label>
//                             <input type="text" name="address" value={formData.address} onChange={handleChange} required />

//                             <label>Note</label>
//                             <textarea name="note" value={formData.note} onChange={handleChange}></textarea>

//                             <h3>Choose Amount</h3>
//                             <div className="donation-amount-buttons">
//                                 <button type="button" onClick={() => handleAmountClick(50)}>₹50</button>
//                                 <button type="button" onClick={() => handleAmountClick(100)}>₹100</button>
//                                 <button type="button" onClick={() => handleAmountClick(200)}>₹200</button>
//                                 <button type="button" onClick={() => handleAmountClick(500)}>₹500</button>
//                             </div>

//                             <input 
//                                 type="number" 
//                                 className="custom-amount" 
//                                 name="amount" 
//                                 value={formData.amount} 
//                                 onChange={handleChange} 
//                                 placeholder="₹ Other Amount" 
//                                 required 
//                             />

//                             <button type="submit" className="donate-button" disabled={loading}>
//                                 {loading ? "Processing..." : "Donate"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Donation;

// demo


import React, { useState } from "react";
import axios from "axios";
import "./Donation.css";

const Donation = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: "",
        amount: "",
        panCard: "",  // New field for PAN card number
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle amount selection (predefined amounts)
    const handleAmountClick = (amount) => {
        setFormData({ ...formData, amount });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.amount) {
            setMessage("Please select or enter a valid donation amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/donate", formData);
            const { orderId } = response.data;

            // Redirect user to PayPal for payment
            window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;

            setMessage("Donation successful!");
            setFormData({ name: "", phone: "", email: "", address: "", note: "", amount: "", panCard: "" });
        } catch (error) {
            setMessage("Error processing donation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="donation-page">
            <div className="donation-header">
                <h1>Make a Difference Today</h1>
                <p>Join us in empowering communities and creating lasting change.</p>
            </div>

            <div className="donation-impact">
                <h2>Impact of Your Donation</h2>
                <div className="donation-grid">
                    <div className="donation-card">
                        <img src="5.jpg" alt="Wedding Project" />
                        <h3>Wedding Project</h3>
                        <p>Total Requirement: ₹5,00,000</p>
                        <button onClick={() => handleAmountClick(500000)}>Donate</button>
                    </div>
                    <div className="donation-card">
                        <img src="4.jpg" alt="Food Project" />
                        <h3>Food Project</h3>
                        <p>Total Requirement: ₹50,000</p>
                        <button onClick={() => handleAmountClick(50000)}>Donate</button>
                    </div>
                    <div className="donation-card">
                        <img src="3.jpg" alt="Education Project" />
                        <h3>Education Project</h3>
                        <p>Total Requirement: ₹1,00,000</p>
                        <button onClick={() => handleAmountClick(100000)}>Donate</button>
                    </div>
                </div>
            </div>

            <div className="donation-form-section">
                <div className="donation-form-container">
                    <div className="donation-form-info">
                        <img src="Donation.png" alt="Blind’s Welfare Association" />
                        <p>
                            <strong>At Vision for All: Blind’s Welfare Association,</strong> your support transforms lives.
                            For over 48 years, we have been dedicated to empowering visually impaired individuals through education,
                            vocational training, and financial assistance.
                        </p>
                        <h3>Donate today and be a part of the change!</h3>
                    </div>

                    <div className="donation-form">
                        <h2 style={{ color: "#4f4949" }}>Donate Now</h2>
                        {message && <p className="message">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                            <label>Phone Number*</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                            <label>Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                            <label>Note</label>
                            <textarea name="note" value={formData.note} onChange={handleChange}></textarea>

                            <label>PAN Card Number</label>
                            <input
                                type="text"
                                name="pan"
                                value={formData.pan}
                                onChange={handleChange}
                                placeholder="Enter PAN Card Number"
                                required
                            />

                            <h3>Choose Amount</h3>
                            <div className="donation-amount-buttons">
                                <button type="button" onClick={() => handleAmountClick(50)}>₹50</button>
                                <button type="button" onClick={() => handleAmountClick(100)}>₹100</button>
                                <button type="button" onClick={() => handleAmountClick(200)}>₹200</button>
                                <button type="button" onClick={() => handleAmountClick(500)}>₹500</button>
                            </div>

                            <input
                                type="number"
                                className="custom-amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="₹ Other Amount"
                                required
                            />

                            <button type="submit" className="donate-button" disabled={loading}>
                                {loading ? "Processing..." : "Donate"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
