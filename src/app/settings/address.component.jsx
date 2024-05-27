import * as React from "react";
import { loadAddress } from "../cart/page.service";
import { addAddress } from "./page.service";
import { useUser } from "../../context/user/user-context";
import moment from "moment";

export const Settingsaddress = () => {
  const { user } = useUser();

  const [listaddress, setListaddress] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [updateData, setUpdateData] = React.useState(false)
  const [form, setForm] = React.useState({
    addressLabel: "",
    address: "",
    phoneNumber: "",
  });

  const fetchData = async (id) => {
    try {
      const res = await loadAddress(id);

      if (res) {
        console.log(res);
        setListaddress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchData(user.OrganizationId);
    }
  }, [updateData]);

  const handleAddAddress = () => {
    // Logika untuk menampilkan modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Logika untuk menyembunyikan modal
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    // Logika untuk mengubah nilai input dalam form state
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
	
    try {
		const param = {
			OrganizationId: user.OrganizationId, // Pastikan untuk menyertakan ID organisasi
			AddressLabel: form.addressLabel,
			Address: form.address,
			ContactNumber: form.phoneNumber,
		};
		const res = await addAddress(param);
		if (res) {
		  setUpdateData(!updateData)
        // Lakukan sesuatu dengan respons jika perlu
        console.log("Alamat berhasil ditambahkan:", res);
        // Ambil data ulang setelah menambahkan alamat baru
        fetchData(user.OrganizationId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Tutup modal setelah proses selesai
      setShowModal(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="mb-4">
        <button
          onClick={handleAddAddress}
          className=" bg-gradient-to-br from-indigo-500 to-blue-400 text-white p-1 px-4 rounded"
        >
          Add address +{" "}
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        {listaddress.length > 0 &&
          listaddress.map((item, index) => (
            <div
              className="w-full min-h-36 bg-neutral-100 rounded p-2"
              key={index}
            >
              <div className="flex justify-between w-full items-center">
                <p className="font-bold text-2xl uppercase">
                  {item.AddressLabel}
                </p>
                <p className="text-sm text-neutral-400">
                  {moment(item.InsertStamp).format("ll")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Contact</p>
                <p className="text-sm">phone : {item.ContactNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm">address : {item.Address}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Modal untuk menambahkan alamat */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Address</h2>
            <form onSubmit={handleAddAddressSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="addressLabel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Label Alamat
                </label>
                <input
                  type="text"
                  name="addressLabel"
                  id="addressLabel"
                  onChange={handleFormChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Warehouse/Office/Toko/etc."
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleFormChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="JL.XXX XXX XX/XX"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  No Telepon
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={handleFormChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="+62***********"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
