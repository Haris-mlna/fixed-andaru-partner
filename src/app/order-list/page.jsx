"use client";

import Sidebar from "../../components/layout/sidebar/sidebar";
import { CancelOrder, getListorder, orderListDetail } from "./page.service";
import React from "react";
import { useUser } from "../../context/user/user-context";
import TableOrderList from "../../components/ui/table/table.order-list";
import { useRouter } from "next/navigation";
import { useOrderDetail } from "../../context/order-detail/order-detail";
import { CircularProgress } from "@mui/material";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";

const OrderList = () => {
  const { user } = useUser();
  const { setDetail, setDetailList } = useOrderDetail();
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const router = useRouter();

  const fetchList = async (id) => {
    setLoading(true);
    try {
      const res = await getListorder(id);
      if (res) {
        const dataWithId = res.data.map((item) => ({
          ...item,
          id: item.Id,
        }));
        setList(dataWithId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchList(user.OrganizationId);
    }
  }, [user]);

  const handleDetail = async (item, event) => {
    event.stopPropagation(); // Prevent event propagation
    setDetail(item);
    try {
      const res = await orderListDetail(item.Id);
      setLoading(true);
      if (res) {
        setDetailList(res.data);
        setTimeout(() => {
          router.push("/order-list/detail-order");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      title: "Warning!",
      text: "Anda yakin ingin membatalkan pesanan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      setCancelLoading(true);
      try {
        const res = await CancelOrder(selected);
        if (res) {
          Swal.fire(
            "Cancelled!",
            "Your orders have been cancelled.",
            "success"
          );
          // Optionally, refresh the order list here
          if (user) {
            fetchList(user.OrganizationId);
          }
          setSelected([]); // Clear selected items
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to cancel orders. Please try again.",
          "error"
        );
      } finally {
        setCancelLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      {cancelLoading && (
        <div
          style={{
            zIndex: 1000,
          }}
          className="w-full h-screen absolute bg-black/40 flex justify-center items-center"
        >
          <CircularProgress
            size={20}
            sx={{
              color: "#FFF",
            }}
          />
        </div>
      )}
      <div className="flex relative flex-1 bg-white">
        <div className="w-full overflow-y-auto">
          <div className="w-full h-12 flex items-center px-4 bg-white shadow-sm">
            Daftar Pesanan
          </div>
          {selected && selected?.length > 0 && (
            <div className="p-4 flex">
              <button
                className="p-1 px-8 text-red-500 bg-red-100 border border-red-300 rounded flex gap-1 items-center"
                onClick={handleCancelOrder}
                disabled={cancelLoading}
              >
                <GoTrash />
                Batalkan Pesanan
              </button>
            </div>
          )}
          <div className="w-full">
            <TableOrderList
              rows={list}
              handleDetail={handleDetail}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
