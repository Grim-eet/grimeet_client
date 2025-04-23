import {MainContain} from './components/main/MainContain';
import {SideMenu} from './components/common/SideMenu';

export default function Home() {
  return (
    <main>
      <div className="p-8">
        <MainContain />
        <SideMenu />
      </div>
    </main>
  );
}
