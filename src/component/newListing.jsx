import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme/theme";
import { Button, Table } from "antd";

const NewListing = (data, fetchPaginatedData) => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState([]);
  console.log(data);
  useEffect(() => {
    if (data?.data?.listings?.content) {
      // Transform data into table format
      const dataSource = data?.data?.listings?.content?.map((item, index) => ({
        key: index,
        name: item.name || "N/A",
        address: `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
        budget: `${item.asset.budgetMin} - ${item.asset.budgetMax}`,
        actions: (
          <>
            <Button
              type="primary"
              style={{
                background: theme.secondaryColor,
                borderRadius: theme.buttonRadius,
              }}
              onClick={() =>
                handlePreviewQuote(
                  item.name,
                  `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
                  item.userId
                )
              }
            >
              {item.actionFlags.quoteEditability === 1
                ? "Prepare Quote"
                : "View Quote"}
            </Button>
          </>
        ),
      }));
      setListingData(dataSource);
    }
  }, [data]);

  const [pagination, setPagination] = useState({
    current: data?.data?.listings?.pageable?.pageNumber + 1 || 1,
    pageSize: data?.data?.listings?.pageable?.pageSize || 10,
    total: data?.data?.listings?.totalElements || 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  const handlePreviewQuote = (name, address, userId) => {
    navigate(
      `/quote?homeOwnerName=${name}&address=${address}&userId=${userId}`
    );
  };
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
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
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
        dataSource={listingData}
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

export default NewListing;
