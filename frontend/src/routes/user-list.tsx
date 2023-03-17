import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../fetch';
import { useAuthStore } from '../store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Badge } from '@mantine/core';
import { IconAdjustments, IconCheck, IconCircleX, IconCross } from '@tabler/icons-react';

function UserList() {
  const auth = useAuthStore((state) => state.auth);

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery(['users'], () =>
    fetchWithAuth('http://localhost:3333/api/user/list', {
      method: 'GET',
    })
      .then((res) => res.json() as Promise<User[]>)
      .catch((err) => console.log(err)),
  );

  if (!auth?.access_token) {
    return <div className="Container">Not authorized</div>;
  }

  if (isLoading || !data) {
    return <div className="Container">No data</div>;
  }

  const approve = (id: string) => {
    fetchWithAuth(`http://localhost:3333/api/user/approve/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'APPROVED' }),
    })
      .then((res) => {
        refetch();

        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const reject = (id: string) => {
    fetchWithAuth(`http://localhost:3333/api/user/approve/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'REJECTED' }),
    })
      .then((res) => {
        refetch();
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Container">
      <div className="flex flex-col items-center bg-white px-8 w-4/5 py-8 rounded-xl shadow-lg space-y-4">
        <ul className="flex flex-col justify-evenly w-full space-y-2">
          {data &&
            data?.map((user) => (
              <li key={user.id} className="w-full bg-blue-100/40 rounded-lg px-4 py-4">
                <span>{user.email}</span>
                <Badge color={user.status === 'APPROVED' ? 'green' : user.status === 'REJECTED' ? 'red' : 'gray'}>
                  {user.status}
                </Badge>
                {user.status === 'PENDING' && (
                  <div className="flex flex-row">
                    <ActionIcon
                      color="green"
                      onClick={() => {
                        approve(user.id);
                      }}
                    >
                      <IconCheck size="1.125rem" />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        reject(user.id);
                      }}
                    >
                      <IconCircleX size="1.125rem" />
                    </ActionIcon>
                  </div>
                )}
              </li>
            ))}
        </ul>
        <button
          className="Button"
          onClick={() => {
            setAuth(null);
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserList;
