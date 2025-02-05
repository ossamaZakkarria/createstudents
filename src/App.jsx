import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    fetch("https://studentapi-tpoi.onrender.com/students")
      .then((res) => res.json())
      .then((students) => setData(students));
  }, []);

  const handleAddStudent = async () => {
    const newStudent = { name, gender };

    const response = await fetch("https://studentapi-tpoi.onrender.com/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    const addedStudent = await response.json();
    setData([...data, addedStudent]);
    setName("");
    setGender("Male");
  };

  const handleDeleteStudent = async (id) => {
    await fetch(`https://studentapi-tpoi.onrender.com/students/${id}`, {
      method: "DELETE",
    });

    setData(data.filter((student) => student.id !== id));
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button onClick={handleAddStudent}>Add Student</button>

      <Students AllData={data} handleDeleteStudent={handleDeleteStudent} />
    </>
  );
};

const Students = ({ AllData, handleDeleteStudent }) => {
  return (
    <>
      {AllData.length === 0 ? (
        <NoData />
      ) : (
        AllData.map((student) => (
          <Student key={student.id} student={student} handleDeleteStudent={handleDeleteStudent} />
        ))
      )}
    </>
  );
};

const NoData = () => <span>No Students!!!!</span>;

const Student = ({ student, handleDeleteStudent }) => {
  return (
    <div>
      <span>{student.id}</span>
      <button style={{ marginLeft: "5px", width: "100px" }}>{student.name}</button>
      <span style={{ paddingLeft: "10px", marginLeft: "5px" }}>
        Gender: <span>{student.gender}</span>
      </span>
      <button
        style={{ marginLeft: "10px", color: "white", backgroundColor: "red", border: "none", padding: "5px 10px" }}
        onClick={() => handleDeleteStudent(student.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default App;
