import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FireBaseAuthContext } from "../../Provider/FireBaseAuthContext";

const MyProfile = ({ onClose }) => {
  const { user, logOutUser } = useContext(FireBaseAuthContext);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366F1", // indigo
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()
          .then(() => {
            Swal.fire("Signed out!", "You have been signed out.", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Sign out failed.", "error");
          });
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="card w-full max-w-md bg-base-100 dark:bg-gray-900 shadow-lg border-t-4 border-indigo-600 p-6 rounded-xl transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-blue-500 ring-offset-base-100 dark:ring-offset-gray-900 ring-offset-2">
              <img
                src={user?.photoURL || "/src/assets/user-logo.png"}
                alt="User"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text flex items-center space-x-2 select-none">
            <span>{user?.displayName || "User Name"}</span>
            {/* Emoji wave with simple bounce animation */}
            <span className="inline-block animate-bounce" role="img" aria-label="wave">👋</span>
          </h2>
          <span className="badge badge-outline border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 select-text">
            {user?.email}
          </span>
        </div>

        <div className="divider text-indigo-500 font-semibold dark:text-indigo-300">Profile Details</div>
        <div className="space-y-3 text-sm px-2 select-text">
          <DetailRow label="Account Created" value={user?.metadata?.creationTime} type="date" />
          <DetailRow label="Last Sign In" value={user?.metadata?.lastSignInTime} type="datetime" />
          <DetailRow label="User ID" value={user?.uid} />
          <DetailRow
            label="Email Verified"
            value={user?.emailVerified ? "Yes" : "No"}
            color={user?.emailVerified ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}
          />
        </div>

        <div className="divider"></div>
        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={handleLogOut}
            className="btn btn-sm w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition duration-200 ease-in-out shadow-md dark:shadow-lg"
            title="Logout from your account"
          >
            Logout
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-sm w-full bg-green-400 text-white hover:bg-green-500 transition duration-200 ease-in-out shadow-md dark:shadow-lg"
              title="Back to dashboard"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Row component
const DetailRow = ({ label, value, type, color }) => {
  let displayValue = "N/A";
  if (value) {
    if (type === "date") {
      displayValue = new Date(value).toLocaleDateString();
    } else if (type === "datetime") {
      displayValue = new Date(value).toLocaleString();
    } else {
      displayValue = value;
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-semibold  select-none">{label}:</span>
      <span className={`text-right break-all select-text ${color || ""}`}>
        {displayValue}
      </span>
    </div>
  );
};

export default MyProfile;
