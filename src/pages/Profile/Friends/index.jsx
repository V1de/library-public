import React, { useEffect, useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import ApiService from '../../../helpers/api-helpers';
const friendsApi = new ApiService('users/friends/list');
const requestsApi = new ApiService('users/friends/requests');

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    friendsApi.getAllItems().then((res) => {
      setFriends(res);
    });
    requestsApi.getAllItems().then((res) => {
      setRequests(res);
    });
  }, []);

  return (
    <div className="px-5">
      <div className="flex items-center">
        <h2 className="flex font-bold text-gray-500 text-xl pb-2">Friends</h2>
        <div className="px-2 pb-1">
          <BsPlusSquare size={20} color="gray" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col max-h-[350px] overflow-y-scroll scroll py-2 px-2 mb-2 border border-2 border-gray-300 rounded rounded-lg">
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div className="block sm:flex px-4 py-3 mb-2 border-2 border-gray-400 rounded rounded-lg">
              <div className="w-[100%] sm:w-[20%] sm:block flex px-4 sm:py-3">
                <div className="font-semibold">Username:</div>
                <div className="px-4 sm:px-0">{friend.username}</div>
              </div>
              <div className="w-[10%]"></div>
              <div className="w-[100%] sm:w-[80%] lg:w-[50%] flex px-auto justify-between items-center">
                <div className="block px-4 py-3 border-2 border-gray-300 rounded rounded-lg">
                  <div className="text-center">Books read</div>
                  <div className="text-center text-orange-400">{friend.readBooks}</div>
                </div>
                <div className="block px-4 py-3 border-2 border-gray-300 rounded rounded-lg">
                  <div className="text-center">Books liked</div>
                  <div className="text-center text-orange-400">{friend.likedBooks}</div>
                </div>
                <div className="block px-4 py-3 border-2 border-gray-300 rounded rounded-lg">
                  <div className="text-center">Pages read</div>
                  <div className="text-center text-orange-400">{friend.readPages ? friend.readPages : 0}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-2xl text-center py-2">No friends yet!</div>
        )}
      </div>
      <div className="flex items-center">
        <h2 className="flex font-bold text-gray-500 text-xl pb-2">Requests</h2>
      </div>
      <div className="flex flex-wrap justify-between max-h-[385px] overflow-y-scroll scroll py-2 px-2 mb-2 border border-2 border-gray-300 rounded rounded-lg">
        {requests?.forMe && requests.forMe.length > 0 ? (
          requests.forMe.map((request) => (
            <div className="sm:flex items-center justify-between flex-[45%] py-2 px-4 my-2 mx-4 border-2 border-grey-300 rounded rounded-lg">
              <div className="block md:w-[20%]">
                <div className="text-center font-semibold">Username:</div>
                <div className="text-center mb-1 md:mb-0">{request.requester.username}</div>
              </div>
              <div className="block md:w-[20%]">
                <div className="text-center font-semibold">Date:</div>
                <div className="text-center mb-1 md:mb-0">{new Date(request.createdAt).toLocaleDateString('uk')}</div>
              </div>
              <div className="text-center">
                <button className="text-green-600 px-4 py-2 border-2 border-green-300 rounded rounded-lg">Apply</button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-2xl text-center py-2">No requests yet!</div>
        )}
        {requests?.my && requests.my.length > 0 ? (
          requests.my.map((request) => (
            <div className="sm:flex items-center justify-between flex-[45%] py-2 px-4 my-2 mx-4 border-2 border-grey-300 rounded rounded-lg">
              <div className="block md:w-[20%]">
                <div className="text-center font-semibold">Username:</div>
                <div className="text-center mb-1 md:mb-0">{request.addressee.username}</div>
              </div>
              <div className="block md:w-[20%]">
                <div className="text-center font-semibold">Date:</div>
                <div className="text-center mb-1 md:mb-0">{new Date(request.createdAt).toLocaleDateString('uk')}</div>
              </div>
              <div className="text-center">
                <button className="text-red-400 px-4 py-2 border-2 border-red-300 rounded rounded-lg">Unsend</button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-2xl text-center py-2">No requests yet!</div>
        )}
      </div>
    </div>
  );
};

export default Friends;
