import React, { useState } from 'react';
import { useLoaderData } from 'react-router';

const Users = () => {
    const initialUser = useLoaderData();
    const [users, setUser]= useState(initialUser);
    return (
        <div>
            <h2 className='text-3xl'>Users: {initialUser.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                {index + 1}
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        
                        {
                            users.map((user, index) => <tr key={user._id}>
                            <th>
                              No: 
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photo}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm opacity-50">{user.address}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">View</button>
                                <button className="btn btn-ghost btn-xs">Edit</button>
                                <button className="btn btn-ghost btn-xs">Delete</button>
                            </th>
                        </tr>)
                        }
                        
                    </tbody>
                 
                </table>
            </div>
        </div>
    );
};

export default Users;