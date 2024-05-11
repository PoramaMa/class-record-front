import { Card } from "antd";
import React, { useState } from "react";
import EditClassroom from "./EditClassroom";
import StudentInClass from "./StudentInClass";
const tabListNoTitle = [
  {
    key: "detail",
    label: "Detail",
  },
  {
    key: "student",
    label: "Student in Classroom",
  },
];
const contentListNoTitle = {
  detail: <EditClassroom />,
  student: <StudentInClass />,
};
const ViewClassroom = () => {
  const [activeTabKey2, setActiveTabKey2] = useState("detail");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">Add Student</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default ViewClassroom;
