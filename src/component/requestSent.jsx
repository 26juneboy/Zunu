import React, { useEffect, useState } from "react";

import { Button, Table } from "antd";

const RequestSent = ({ data, fetchPaginatedData }) => {
  const [reqSentData, setRequestSentData] = useState([]);
  useEffect(() => {
    if (data?.listings?.content) {
      // Transform data into table format
      const dataSource = data?.listings?.content?.map((item, index) => ({
        key: index,
        name: item.name || "N/A",
        address: `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
        budget: `${item.asset.budgetMin} - ${item.asset.budgetMax}`,
      }));
      setRequestSentData(dataSource);
    }
  }, [data]);

  const [pagination, setPagination] = useState({
    current: data?.listings?.pageable?.pageNumber + 1 || 1,
    pageSize: data?.listings?.pageable?.pageSize || 10,
    total: data?.listings?.totalElements || 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
  ];
  // 🔹 Handle page change
  const handleTableChange = (paginationConfig) => {
    setPagination(paginationConfig);

    fetchPaginatedData(paginationConfig.current - 1, paginationConfig.pageSize);
  };

  return (
    <div>
      <Table
        dataSource={reqSentData}
        columns={columns}
        rowKey="id"
        bordered
        pagination={pagination}
        onChange={handleTableChange}
        className="quotes-table"
      />
    </div>
  );
};

export default RequestSent;
