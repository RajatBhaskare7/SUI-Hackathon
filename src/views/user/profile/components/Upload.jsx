import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React from "react";

const Upload = () => {
  const [file, setFile] = React.useState(null);
  const handleFileUpload = (files) => {
    setFile(files);
  }
  const handleSubmit = () => {
    //convert file to base64
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      const base64 = reader.result;
      console.log(base64);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  return (
    <Card className="grid h-full w-full grid-cols-1  rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className=" text-center h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
      <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
  <input
    type="file"
    style={{ display: "none" }}
    accept=".png, .jpg, .jpeg"
    onChange={(e) => handleFileUpload(e.target.files)}
  />
  <MdFileUpload className="text-[40px] text-brand-500 dark:text-white cursor-pointer" />
  <h4 className="text-lg font-bold center text-brand-500 dark:text-white cursor-pointer">
   {
      file ? file[0].name : "Upload your AadharCard"
   }
  </h4>
  <p className="mt-2 text-sm font-medium text-gray-600">
    PNG, JPG are allowed
  </p>
</label>
      

      </div>

      {/* <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
       
      
        <button
          href=" "
          className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleSubmit}
       >
          Publish now
        </button>
      </div> */}
    </Card>
  );
};

export default Upload;
