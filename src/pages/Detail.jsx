import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { withRouter } from "../utils/navigations";
import { apiRequest } from "../utils/apiRequest";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";

import teaList from "../assets/tea_list.png";

const Detail = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchDetailList();
  }, []);

  const fetchDetailList = () => {
    const { tasks_id } = props.params;
    axios
      .get(`tasks/${tasks_id}`)
      .then((res) => {
        setContent(res.data.content);
        setCompleted(res.data.completed);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    const { tasks_id } = props.params;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    apiRequest(`tasks/${tasks_id}`, "post", objSubmit, "multipart/form-data")
      .then((res) => {
        alert("List Edited");
        setObjSubmit({});
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => fetchDetailList());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
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
      <Layout>
        <div className="flex justify-center mt-8">
          <div className="w-5/6 md:w-2/3 flex flex-col justify-center">
            <div className="mt-4 mb-8 font-bold text-2xl self-center">Detail List</div>
            <form className="flex flex-col gap-4 w-full" onSubmit={(e) => handleSubmit(e)}>
              <Input type="text" placeholder="What do you want to do?" value={content} onChange={(e) => handleChange(e.target.value, "content")} />
              <Input type="text" placeholder="Are you completed? Yes / No" value={completed === false ? "Not Completed" : "Completed"} onChange={(e) => handleChange(e.target.value, "completed")} />
              <button id="btn-submit" label="Submit" className="self-start bg-[#29660C] text-white text-center px-4 py-2.5">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
};

export default withRouter(Detail);
