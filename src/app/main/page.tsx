import {Navbar} from '@/app/components/common/Navbar';
import {SideMenu} from '@/app/components/common/SideMenu';
import {MainContain} from '../components/main/MainContain';

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <MainContain />
        <SideMenu />
      </div>
    </>
  );
}
