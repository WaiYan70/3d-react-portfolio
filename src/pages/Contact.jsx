import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

import Loader from '../components/Loader';
import Alert from "../components/Alert";

import Fox from '../models/Fox';

import useAlert from "../hooks/useAlert";

const Contact = () => {

  const formRef = useRef(null);
  // Using "useState" to track the state of whether it is clicked on input or not
  const [form, setForm] = useState({name: '', email: '', message: ''});
  // while sending the request, it needs loading state to let User know wheather it is processing or not
  const [isLoading, setIsLoading] = useState(false); 
  // Animate Fox while user click or type 
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  // Sending message if success or not
  const {alert, showAlert, hideAlert} = useAlert();


  // track the fox model with clicking or not
  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  };
  // Once User click on, the fox will run
  const handleFocus = () => setCurrentAnimation('walk');
  // Once User click out, the fox will idle
  const handleBlur = () => setCurrentAnimation('idle');  
  // Once User submit the form , the fox will run

  // Enable our email JS service to receive emails
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');
    
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
      showAlert({
        show: true, 
        text: "Message sent successfully", 
        type: "success"
      });

      setTimeout(() => {
        hideAlert(false);
        setCurrentAnimation('idle');
        setForm({
          name: "", 
          email: "", 
          message: ""
        });
      }, [3000]);
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      console.log(error);
      showAlert({
        show: true, 
        text: "I didnt receive your message",
        type: "danger"
      });
    });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert}/>}
      
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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
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
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
         camera={{
          position: [0,0,5],
          fov: 75,
          near: 0.1,
          far: 1000
         }}
        >
          <directionalLight 
            intensity={2.5}
            position={[0, 0, 1]}
          />
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader />}>
            <Fox 
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.625, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact;