import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "gray" }} spin />
  );
  return (
    <div className="loading">
      <Spin size={"large"} indicator={antIcon} />
    </div>
  );
};

export default Loading;
