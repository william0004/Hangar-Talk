
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">  
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out!</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button> 
      </form>
      <p>We will get back to you as soon as possible!</p>
    </div>
  );
}

export default Contact;