import { useSearchParams } from 'react-router-dom';
import { MenuSection } from '../components/MenuSection';
import { FamilyPlatter, JuiceBar } from '../components/HomeSections';
import { menuScope } from '../config/menuTaxonomy';
export function MenuPage() {
  const [params] = useSearchParams();
  const { section } = menuScope(params);
  return (
    <>
      <MenuSection />
      {section === 'foods' && <FamilyPlatter />}
      {section === 'juices' && <JuiceBar />}
    </>
  );
}
