'use client';

import Link from 'next/link';
import React, {useState} from 'react';

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export const SideMenu = () => {
  const [isClicked, setIsClicked] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const menuItems: MenuItem[] = [
    {id: '1', label: '스케치북', href: '/sketchbook'},
    {id: '2', label: '검색', href: '/search'},
    {id: '3', label: '피드', href: '/feed'},
    {id: '4', label: '설정', href: '/settings'},
  ];

  const handleClick = (id: string) => {
    setIsClicked(id);
  };

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen ? (
        <aside className="w-[300px] h-screen border text-white flex flex-col">
          <header>
            <div className="flex justify-between p-8">
              <h2>스케치북 생성</h2>
              <button className="" onClick={handleClose}>
                x
              </button>
            </div>
          </header>
          <nav>
            <ul className="flex flex-col gap-4 p-4 cursor-pointer">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`block p-2 ${
                      isClicked === item.id ? 'text-gray-500 bg-white' : ''
                    } hover:bg-gray-500`}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      ) : (
        <button className="text-white" onClick={handleClose}>
          햄버거
        </button>
      )}
    </>
  );
};
