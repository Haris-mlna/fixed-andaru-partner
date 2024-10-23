"use client";
import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { IoSettingsOutline } from "react-icons/io5";
import { useUser } from "../../context/user/user-context";
import { Settingsaddress } from "./address.component";
import { Settingscompany } from "./company.component";
import { Settingsaccount } from "./account.component";
import { CircularProgress } from "@mui/material";

const Settings = () => {
  const { userData, companyData } = useUser();
  const [userType, setUserType] = React.useState(false);
  const [settings, setSettings] = React.useState(
    userType ? "Account" : "Company"
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!userData) {
      setUserType(false);
    } else {
      setUserType(true);
    }
  }, [userData]);

  return (
    <div className="flex w-full h-screen relative">
      {loading && (
        <div
          style={{
            zIndex: 10000,
          }}
          className="w-full h-full fixed top-0 left-0 bg-black/40 flex justify-center items-center text-white">
          <CircularProgress size={54} />
        </div>
      )}
      <Sidebar />
      <div className=" w-64 h-full bg-white border-r-2 p-4">
        {userType ? (
          <button
            className={`w-full py-2 px-4 flex
                    ${
                      settings === "Account" &&
                      "bg-blue-200 rounded text-blue-500"
                    }
                    `}
            onClick={() => {
              setSettings("Account");
            }}>
            Account
          </button>
        ) : null}
        <button
          className={` w-full py-2 px-4 flex
                        ${
                          settings === "Company" &&
                          "bg-blue-200 rounded text-blue-500"
                        }
												`}
          onClick={() => {
            setSettings("Company");
          }}>
          Company
        </button>
        <button
          className={` w-full py-2 px-4 flex
                        ${
                          settings === "Address" &&
                          "bg-blue-200 rounded text-blue-500"
                        }
												`}
          onClick={() => {
            setSettings("Address");
          }}>
          Address
        </button>
      </div>
      <div className="flex flex-1 flex-col bg-white">
        <div className="w-full overflow-y-auto">
          <div className="w-full h-16 bg-white shadow flex px-4 items-center gap-1 z-20">
            <IoSettingsOutline size={18} />
            <h4>SETTINGS</h4>
          </div>
          <div className="flex mt-1">
            {settings === "Company" && (
              <Settingscompany setLoading={setLoading} />
            )}
            {settings === "Account" && (
              <Settingsaccount setLoading={setLoading} />
            )}
            {settings === "Address" && (
              <Settingsaddress setLoading={setLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
