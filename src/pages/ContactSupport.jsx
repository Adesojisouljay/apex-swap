import React from 'react';
import './support.scss';

const ContactSupport = () => {
  return (
    <div className="support">
      <div className="contact-support">
        <h2>Contact Support</h2>
        <p>If you have any questions or need assistance, please feel free to reach out to our support team.</p>
        <div className="contact-details">
          <p>Email: support@example.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="contact-form">
          <div className="form-wrapper">
            <h3>Send us a message:</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message" rows="4" required></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
