import { HomeStackScreen } from './src/screens/ProtectedRoutes';
import { UserProvider } from './src/context/UserContext';
import { useUser } from './src/context/UserContext';
import { PublicRoutes } from './src/screens/PublicRoutes';

const DashBoard = () => {
  const { isLoggedIn } = useUser();

  console.log(isLoggedIn);

  return <>{isLoggedIn ? <HomeStackScreen /> : <PublicRoutes />}</>;
};

export default function App() {
  return (
    <>
      <UserProvider>
        <DashBoard />
      </UserProvider>
    </>
  );
}
