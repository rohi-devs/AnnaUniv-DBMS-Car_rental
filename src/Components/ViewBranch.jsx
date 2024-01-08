import {useEffect,useState} from "react";
import Layout from "./Layout";
export default function ViewBranch(){
    const [jsondata, setjson] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/'); // Replace with your API endpoint
      const jsonData = await response.json();
      setjson(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    const arr_topic = ['Branch ID','Location','Branch','Contact']
    console.log(jsondata);
    return (

        <div>
            <div>
                <h1 className={'text-2xl font-bold font-sans text-orange-950'}>List Of branches</h1>
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