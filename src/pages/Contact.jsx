import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {

  const formRef = useRef(null);

  // Using "useState" to track the state of whether it is clicked on input or not
  const [form, setForm] = useState({name: '', email: '', message: ''});
  
  // while sending the request, it needs loading state to let User know wheather it is processing or not
  const [isLoading, setIsLoading] = useState(false); 

  // track the fox model with clicking or not
  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  };
  // Once User clicked on
  const handleFocus = () => {};
  
  // Once User clicked out
  const handleBlur = () => {};  

  // Enable our email JS service to receive emails
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    //service_ttzkad3
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        form_name: form.name,
        to_name: "Khant Wai Yan",
        from_email: form.email,
        to_email: "khantwaiyan11@gmail.com",
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      setForm({name:'', email:'', message:''});
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form 
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <label className="text-black-500 font-semibold">Name
            <input 
              type="text"
              name="name"
              className="input"
              placeholder="Please Enter Your Name"
              required
              value={form.name}
              onChange={handleChange}
              onFoucs={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          {/* E-mail */}
          <label className="text-black-500 font-semibold">Email
            <input 
              type="email"
              name="email"
              className="input"
              placeholder="Please Enter Your E-mail"
              required
              value={form.email}
              onChange={handleChange}
              onFoucs={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          {/* Message */}
          <label className="text-black-500 font-semibold">Your Message
            <textarea 
              name="message"
              rows={4}
              className="input"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFoucs={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact