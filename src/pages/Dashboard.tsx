import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSearchParams } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import axios from "axios"

const { Column } = Table;

interface IAuthor {
  id: number;
  full_name: string;
  institution: string;
  country: string;
}

interface INo {
  randomMessage: string
}

const Dashboard = () => {
  const [searchParams, _] = useSearchParams();
  const [content, setContent] = useState<INo[]>([]);

  const token = localStorage.getItem("panda-token");
  const initPage = async (t: string) => {
    const res = await axios.get(`${SERVER_BASE_URL}/secret`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    const text = res.data.randomMessage;
    const parsedRes = [{randomMessage: text}];
    setContent(parsedRes);
  };
  useEffect(() => {
    if (token) {
      initPage(token);
    }
  }, [token]);

  return (
    <div className="custom-content-body">
      <Table dataSource={content} rowKey="id">
        <Column title="Random Message" dataIndex="randomMessage" key="message" />
        
      </Table>
    </div>
  );
};

export default Dashboard;
