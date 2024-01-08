import {useEffect,useState} from "react";
import Layout from "./Layout";
import jsPDF from "jspdf";
import 'jspdf-autotable'
export default function Summary(){
    const [jsondata, setjson] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/summary'); // Replace with your API endpoint
      const jsonData = await response.json();
      setjson(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    const arr_topic = ['Customer ID','Name','Contact','Total spending']
    console.log(jsondata);
    return (

        <div>
            <div>
                <h1 className={'text-2xl font-bold font-sans text-orange-950'}>Customer Summary</h1>
                <br/>
                <table className="min-w-full rounded-lg overflow-hidden border-collapse">
                    <thead>
                    <tr>
                        {arr_topic.map((key) => (
                            <th
                                key={key}
                                className="px-5 py-4 border-b-2 border-gray-200 bg-orange-500 text-white text-left text-base  uppercase font-semibold"
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {jsondata.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-100'}>
                            {Object.values(item).map((value, idx) => (
                                <td key={idx} className="px-5 py-4">{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

const GeneratePDF = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('Booking Details', 14, 15);

    // Table headers
    const headers = Object.keys(data[0]);
    const tableData = data.map((row) => Object.values(row));

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 20, // Position of the table on the PDF
    });

    // Save the PDF with a unique name using current timestamp
    const date = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`booking_details_${date}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};