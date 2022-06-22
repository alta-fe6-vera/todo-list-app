import React, { useEffect, useState } from "react";
import axios from "axios";

import { withRouter } from "../utils/navigations";
import { apiRequest } from "../utils/apiRequest";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Td } from "../components/Td";

import { useNavigate } from "react-router-dom";
import teaList from "../assets/tea_list.png";

const Home = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchAllList();
  }, []);

  const fetchAllList = async () => {
    apiRequest("tasks", "get", {})
      .then((res) => {
        setData(res);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  };
  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest(`tasks/`, "post", objSubmit, "multipart/form-data")
      .then((res) => {
        alert("List Added");
        setObjSubmit({});
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => fetchAllList());
  };
  const handleDelete = (id) => {
    axios
      .delete(`/tasks/${id}`)
      .then((res) => {
        alert(`List Deleted!`);
        window.location.reload(true);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  };
  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };
  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      axios
        .put(`/tasks/${event.target.value}`)
        .then((res) => {
          setData(res);
          console.log(res);
        })
        .catch((err) => alert(err.toString()));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center content-center">
        <div className="flex flex-col h-screen justify-center ">
          <img src={teaList} alt="" className="w-full animate-pulse" />
          <div className="font-bold text-2xl text-center mt-2 text-[#29660C]">Tea List</div>
        </div>
      </div>
    );
  } else {
    return (
      <Layout onKeyDown={(event) => handleSearch(event)}>
        <div className="w-full flex justify-center mt-8">
          <div className="flex flex-col w-5/6 md:w-2/3">
            <div className="mt-4 mb-8 font-bold text-2xl self-center">Add New Todo List</div>
            <form className="flex flex-col justify-center gap-4 w-full" onSubmit={(e) => handleAdd(e)}>
              <Input type="text" placeholder="What do you want to do?" value={content} onChange={(e) => handleChange(e.target.value, "content")} />
              <button id="btn-submit" label="Submit" className="self-start bg-[#29660C] text-white text-center px-4 py-2.5">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-8">
          <div className="mt-4 mb-8 font-bold text-2xl self-center">My Todo List</div>
          <div className="self-center w-5/6 md:w-2/3">
            <table className="table-fixed md:table-auto w-full self-center">
              <thead className="text-[#29660C] bg-white border-b-2 border-[#97b689]">
                <tr>
                  <th className="px-4 py-4  text-start">My Todo List</th>
                  <th className="px-4 py-4 text-start">Status</th>
                  <th colSpan={3} className="px-4 py-4 text-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-start border-b-2 border-[#97b689]">
                {data.map((item) => (
                  <Td key={item.id} content={item.content} completed={item.completed === false ? "Not Completed" : "Completed"} onClickDel={() => handleDelete(item.id)} onClickEdit={() => navigate(`/tasks/${item.id}`)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
};

export default withRouter(Home);
