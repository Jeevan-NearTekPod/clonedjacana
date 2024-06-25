'use client';
import React, {useState, useRef, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import Image from 'next/image';

export default function Home() {
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [mytext, setText] = useState<any>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const webcamRef = useRef<null | Webcam>(null);

  const parseTextToData = (text: string) => {
    const entries = text.split('\n\n');
    return entries.map(entry => {
      const lines = entry.split('\n');
      return lines;
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      uploadFile(file);
    }
  };
  function createTableFromText(text: string) {
    // Split the text into lines
    const lines = text.split('\n');
    const table = document.createElement('table');

    // Loop through the lines and create table rows
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const row = document.createElement('tr');
        const cells = line.split(':');
        // Check if the line has a key-value pair
        if (cells.length > 1) {
          for (let cell of cells) {
            const td = document.createElement('td');
            td.textContent = cell.trim();
            row.appendChild(td);
          }
        } else {
          // If the line is a standalone value, span it across two columns
          const td = document.createElement('td');
          td.setAttribute('colspan', '2');
          td.textContent = line;
          row.appendChild(td);
        }
        table.appendChild(row);
      }
    }
    return table;
  }
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    console.log(file);
    formData.append('receipt', file);

    try {
      const response = await axios.post(
        'http://localhost:3001/extract-receipt',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response?.data.extractedData.data, '78');
      setText(response?.data?.extractedData?.data);

      axios
        .post('/api/products', {
          responseData: response.data,
        })
        .then(res => {
          console.log(res.data, '91');
          // setText(res?.data);
        })
        .catch(e => console.log(e));
      // const tableContainer = document.getElementById("table-container");
      // const table = createTableFromText(response.data.text);
      // tableContainer!.appendChild(table);
      // Get the table container and append the created table

      console.log('File uploaded successfully:', response.data.filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {}, []);
  const captureImage = async () => {
    if (!webcamRef.current) {
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot()!;
    console.log(imageSrc, '51');
    const formData = new FormData();
    console.log(window.atob(''), '51');

    const base64ToFile = (base64String: string, fileName = 'dummy.png') => {
      const arr = base64String.split(',');

      const mime = arr[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, {type: mime});
    };

    const BUFPIC = base64ToFile(imageSrc);
    console.log(BUFPIC);
    uploadFile(BUFPIC);
    // formData.append("receipt", BUFPIC);
    // // setImageSrc(imageSrc);
    // try {
    //   const response = await axios.post(
    //     "http://192.168.29.72:3001/extract-receipt",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   console.log("File uploaded successfully:", response.data);
    //   const data = parseTextToData(response.data.text);
    //   const tableContainer = document.getElementById("table-container");
    //   if (!tableContainer) {
    //     console.error("table container invaild element");
    //     return;
    //   }
    //   const table = createTableFromText(response.data.text);
    //   setText(response.data.text);
    //   tableContainer.appendChild(table);
    //   axios
    //     .put("/api/products", {
    //       responseText: response.data.text,
    //     })
    //     .then((res) => {})
    //     .catch((e) => console.log(e));
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
    // setShowWebcam(false);
  };

  return (
    <div className="min-h-screen py-10 flex flex-col  gap-5 container mx-auto justify-center items-center ">
      <div className="w-96 bg-gray-400 p-4 rounded-lg">
        <ul className="flex flex-col justify-center items-center">
          <li className="flex flex-col mb-4">
            <h1>Upload Your Image here</h1>
            <input
              type="file"
              id="upload"
              className="mt-2 text-white"
              onChange={handleFileChange}
            />
          </li>
          <li className="flex flex-wrap">
            <h1>Capture Your Image here</h1>
            <button
              className="bg-slate-500 text-white mt-2 py-2 px-4 rounded"
              id="capture"
              onClick={() => setShowWebcam(!showWebcam)}>
              Click to take your pictures
            </button>
          </li>
          {showWebcam && (
            <div className="flex flex-col items-center mt-4">
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                ref={webcamRef}
              />
              <button
                className="bg-green-500 text-white mt-2 py-2 px-4 rounded"
                onClick={captureImage}>
                Capture
              </button>
            </div>
          )}
          {imageSrc && (
            <div className="mt-4 border">
              <Image
                src={imageSrc}
                alt="Captured"
                width={400}
                height={400}></Image>
              <p>Caputer Image</p>
            </div>
          )}
          {uploadedImage && (
            <div className="mt-4 border">
              <Image
                src={uploadedImage}
                alt="Uploaded"
                width={400}
                height={400}></Image>
              <p>Uploaded Image</p>
            </div>
          )}
        </ul>
      </div>
      <div>
        {mytext ? (
          <div dangerouslySetInnerHTML={{__html: mytext?.extractedText}}></div>
        ) : null}
        {mytext?.length ? (
          <div>
            <p>
              <b>Product :</b>
              {mytext?.responseData?.formattedData?.productName}
            </p>
            <p>
              <b>Store Name :</b>
              {mytext?.responseData?.formattedData?.storeName}
            </p>
            <p>
              <b>Other Details :</b>
              {mytext?.responseData?.formattedData?.otherDetails?.join(' ')}
            </p>
          </div>
        ) : // <div dangerouslySetInnerHTML={{ __html: mytext }}></div>
        null}
      </div>
      <div id="table-container" className="hidden"></div>
    </div>
  );
}
