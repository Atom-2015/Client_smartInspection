import React from 'react'

function Showuploadeddata({uploadedFiles}) {
  return (
     <div className="bg-gray-800 text-white p-2 rounded-lg shadow-md mt-4">
        <h3 className="text-[30px] font-semibold mb-3">Uploaded Files</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 rounded-lg flex  justify-between items-center"
            >
              <p className="font-medium truncate m-0">
                {file.url.split('/').pop()}
              </p>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Showuploadeddata
