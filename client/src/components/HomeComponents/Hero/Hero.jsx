import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { buttons } from "../../../data/data";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [backgroundColor, setBackgroundColor] = useState("#008080");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 10); // Generate a random index between 0 and 9
      const darkerValue = Math.floor(parseInt(letters[randomIndex], 16) * 0.5); // Darken the color by multiplying by 0.5
      color += darkerValue.toString(16);
    }
    return color;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setBackgroundColor(getRandomColor());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Reset the transition state after the transition is complete
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [backgroundColor]);

  const navigate = useNavigate();
  const initialValues = {
    input: "",
  };

  const validationSchema = yup.object({
    input: yup.string().required("Required"),
  });

  const onSubmit = async (payload, actions) => {
    navigate(`/gigs?search=${payload.input}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <section
      className="w-full h-screen lg:h-[100vh] text-white pt-20 relative hero-section"
      style={{
        transition: isTransitioning ? "background .5s ease-in-out" : "none", // Only apply transition when transitioning
        background: backgroundColor, // Use a solid background color here
      }}
    >
      <div className="contain flex flex-col items-start justify-center h-full relative z-10">
        <div className="flex flex-col items-start justify-start gap-5 w-full">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold leading-[150%]">
            Discover the ideal <i className="font-light">technician services</i> <br />{" "}
            tailored to your requirements.
          </h2>
          <div
            className={`flex flex-col lg:flex-row items-center w-full gap-5 lg:w-[650px] bg-white h-[50px] rounded-full focus:border focus:border-primary relative mb-20 lg:mb-0`}
          >
            <div className="flex items-center justify-start gap-2 w-full h-full">
              <span
                className={`text-active pl-3 ${
                  errors.input && touched.input
                    ? " placeholder:text-red-500"
                    : ""
                }`}
              >
                <FiSearch size={18} />
              </span>
              <input
                type="text"
                value={values.input}
                onChange={handleChange}
                onBlur={handleBlur}
                name="input"
                placeholder='Try "mobile phone repairs"'
                className={`w-full h-full bg-transparent outline-none text-active ${
                  errors.input && touched.input
                    ? " placeholder:text-red-500"
                    : ""
                }`}
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary h-full lg:w-[150px] outline-none absolute top-16 lg:relative lg:top-0 rounded-full lg:rounded-[0] lg:rounded-tr-full lg:rounded-br-full w-full"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-3 flex-wrap sm:flex-row">
            <span>Popular :</span>
            {buttons.map((item, i) => (
              <button
                key={i}
                className="border outline-none py-1 px-2 rounded-2xl text-sm"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
