import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createFastInspaction } from "../../../../FeatureRedux/analyse_FastInspaction";


function FastInspactionform({ issueTypeOptions, componentOptions, fastInspactionDatatoSiblingchild }) {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector((state) => state.FastInspactionCreation);

  const [updateimg, setUpdateimg] = useState({});
  const [fastInspactionData, setFastInspactionData] = useState([]);
  const [fastInspactionDataall, setFastInspactionDataall] = useState({
    fastInspaction: [],
    component: [],
  });

  useEffect(() => {
    setFastInspactionData(fastInspactionDatatoSiblingchild);
  }, [fastInspactionDatatoSiblingchild]);

  const handleimageupdate = (event) => {
    event.preventDefault();
    const updatedData = {
      fastInspaction: fastInspactionData,
      component: updateimg,
    };

    setFastInspactionDataall(updatedData);

    // Dispatch async thunk to save data
    dispatch(createFastInspaction(updatedData));
  };

  const handleimagestore = (e) => {
    setUpdateimg({ ...updateimg, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="space-y-1 flex-1 overflow-hidden">
        <div className="flex flex-col">
          <div className='text-white text-[20px] text-center border-b-2 mb-1 p-1'>Fast Inspection Form</div>


          <label htmlFor="component" className="mb-1 font-semibold text-gray-100">
            Component <span className="text-red-600 text-[20px]">*</span>
          </label>
          <select
            id="component"
            name="component"
            value={updateimg.component || ""}
            onChange={(e) => handleimagestore(e)}
            className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
          >
            <option value="" disabled>
              Select Component
            </option>
            {componentOptions.map((component) => (
              <option key={component} value={component}>
                {component}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="Issuetype" className="mb-1 font-semibold text-gray-100">
            Issue Type <span className="text-red-600 text-[20px]">*</span>
          </label>
          <select
            id="Issuetype"
            name="Issuetype"
            value={updateimg.Issuetype || ""}
            onChange={(e) => handleimagestore(e)}
            className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
          >
            <option value="" disabled>
              Select Issue Type
            </option>
            {issueTypeOptions.map((issueType) => (
              <option key={issueType} value={issueType}>
                {issueType}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleimageupdate}
        className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {isError && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default FastInspactionform;
